import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { requireAuthenticatedUser } from "@/lib/auth";

export const metadata = {
  title: "Account | TERNEX",
  description: "Your TERNEX customer account.",
};

export default async function AccountPage() {
  const { supabase, user, isAdmin } = await requireAuthenticatedUser();

  await supabase.from("customer_profiles").upsert(
    {
      id: user.id,
      email: user.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  return (
    <main className="dashboard-page dashboard-page--cream">
      <section className="dashboard-shell">
        <div className="dashboard-topbar dashboard-topbar--light">
          <Link href="/" className="dashboard-brand dashboard-brand--light">
            <span>◆</span>
            TERNEX
          </Link>
          <LogoutButton className="dashboard-ghost-button dashboard-ghost-button--light" />
        </div>

        <div className="dashboard-panel">
          <p className="dashboard-kicker">Customer account</p>
          <h1>Welcome to your TERNEX account</h1>
          <p>
            Logged in as <strong>{user.email}</strong>
          </p>
          <div className="dashboard-actions">
            <Link href="/#products" className="dashboard-primary-link">
              Back to products
            </Link>
            <Link href="/" className="dashboard-secondary-link dashboard-secondary-link--light">
              Website home
            </Link>
            {isAdmin ? (
              <Link href="/admin" className="dashboard-secondary-link dashboard-secondary-link--light">
                Admin dashboard
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
