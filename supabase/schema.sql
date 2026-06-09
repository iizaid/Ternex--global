-- ==========================================
-- TERNEX SUPABASE SCHEMA
-- ==========================================
-- Run this in the Supabase SQL editor after creating the project.
-- Existing tables are preserved; policies and triggers are created if missing.

-- ==========================================
-- ENUMS
-- ==========================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
  END IF;
END $$;

-- ==========================================
-- TABLES
-- ==========================================

-- 1. Admin Profiles
-- Add a row here only for Auth users who should access /admin.
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'admin' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_profiles ALTER COLUMN role SET DEFAULT 'admin';
ALTER TABLE admin_profiles ALTER COLUMN role SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'admin_profiles_role_check'
      AND conrelid = 'admin_profiles'::regclass
  ) THEN
    ALTER TABLE admin_profiles
      ADD CONSTRAINT admin_profiles_role_check CHECK (role = 'admin');
  END IF;
END $$;

-- 2. Customer Profiles
-- Normal customer accounts are Supabase Auth users with a matching profile row.
CREATE TABLE IF NOT EXISTS customer_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 5. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- PROFILE TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.customer_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NULLIF(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.customer_profiles.full_name),
        updated_at = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_customer_profile ON auth.users;

CREATE TRIGGER on_auth_user_created_customer_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

-- ==========================================
-- INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_customer_profiles_email ON customer_profiles(email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Admin Profiles Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'admin_profiles'
      AND policyname = 'Admins can view their own admin profile'
  ) THEN
    CREATE POLICY "Admins can view their own admin profile"
      ON admin_profiles
      FOR SELECT
      USING (id = auth.uid() AND role = 'admin');
  END IF;
END $$;

-- Customer Profiles Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'customer_profiles'
      AND policyname = 'Users can view their own customer profile'
  ) THEN
    CREATE POLICY "Users can view their own customer profile"
      ON customer_profiles
      FOR SELECT
      USING (id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'customer_profiles'
      AND policyname = 'Users can insert their own customer profile'
  ) THEN
    CREATE POLICY "Users can insert their own customer profile"
      ON customer_profiles
      FOR INSERT
      WITH CHECK (id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'customer_profiles'
      AND policyname = 'Users can update their own customer profile'
  ) THEN
    CREATE POLICY "Users can update their own customer profile"
      ON customer_profiles
      FOR UPDATE
      USING (id = auth.uid())
      WITH CHECK (id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'customer_profiles'
      AND policyname = 'Admins can view customer profiles'
  ) THEN
    CREATE POLICY "Admins can view customer profiles"
      ON customer_profiles
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1
          FROM admin_profiles
          WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
      );
  END IF;
END $$;

-- Products Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'products'
      AND policyname = 'Public can view active products'
  ) THEN
    CREATE POLICY "Public can view active products"
      ON products
      FOR SELECT
      USING (is_active = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'products'
      AND policyname = 'Admins can manage products'
  ) THEN
    CREATE POLICY "Admins can manage products"
      ON products
      FOR ALL
      USING (
        EXISTS (
          SELECT 1
          FROM admin_profiles
          WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
      );
  END IF;
END $$;

-- Orders Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'Public can insert orders'
  ) THEN
    CREATE POLICY "Public can insert orders"
      ON orders
      FOR INSERT
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'Users can view their own orders'
  ) THEN
    CREATE POLICY "Users can view their own orders"
      ON orders
      FOR SELECT
      USING (customer_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'Admins can manage orders'
  ) THEN
    CREATE POLICY "Admins can manage orders"
      ON orders
      FOR ALL
      USING (
        EXISTS (
          SELECT 1
          FROM admin_profiles
          WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
      );
  END IF;
END $$;

-- Order Items Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'order_items'
      AND policyname = 'Public can insert order items'
  ) THEN
    CREATE POLICY "Public can insert order items"
      ON order_items
      FOR INSERT
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'order_items'
      AND policyname = 'Users can view their own order items'
  ) THEN
    CREATE POLICY "Users can view their own order items"
      ON order_items
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1
          FROM orders
          WHERE orders.id = order_items.order_id
            AND orders.customer_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'order_items'
      AND policyname = 'Admins can manage order items'
  ) THEN
    CREATE POLICY "Admins can manage order items"
      ON order_items
      FOR ALL
      USING (
        EXISTS (
          SELECT 1
          FROM admin_profiles
          WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'admin'
        )
      );
  END IF;
END $$;

-- ==========================================
-- FIRST ADMIN SETUP
-- ==========================================
-- 1. Create the admin user in Supabase Auth.
-- 2. Copy that user's Auth UUID.
-- 3. Run:
-- INSERT INTO admin_profiles (id, role)
-- VALUES ('<USER_UUID>', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
