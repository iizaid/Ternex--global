import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getUserAndAdminState() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, isAdmin: false };
  }

  const { data: adminProfile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  return {
    supabase,
    user,
    isAdmin: adminProfile?.role === "admin",
  };
}

export async function redirectIfAuthenticated() {
  const { user, isAdmin } = await getUserAndAdminState();

  if (!user) {
    return;
  }

  redirect(isAdmin ? "/admin" : "/account");
}

export async function requireAuthenticatedUser() {
  const authState = await getUserAndAdminState();

  if (!authState.user) {
    redirect("/login");
  }

  return authState;
}

export async function requireAdminUser() {
  const authState = await getUserAndAdminState();

  if (!authState.user) {
    redirect("/admin/login");
  }

  return authState;
}
