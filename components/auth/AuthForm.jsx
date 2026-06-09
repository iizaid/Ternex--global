"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

function cleanAuthError(message) {
  if (!message) {
    return "Authentication failed. Please try again.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (normalized.includes("password")) {
    return message;
  }

  if (normalized.includes("already registered") || normalized.includes("already been registered")) {
    return "An account already exists for this email. Please log in instead.";
  }

  return message;
}

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const isAdmin = mode === "admin";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const title = isAdmin
    ? "Admin Portal"
    : isSignup
      ? "Create your TERNEX account"
      : "Log in to your TERNEX account";

  const subtitle = isAdmin
    ? "Authorized staff access only"
    : isSignup
      ? "Prepare your account for future product orders and requests."
      : "Access your account before placing future product requests.";

  async function ensureCustomerProfile(user, name) {
    if (!user?.id) {
      return;
    }

    await supabase.from("customer_profiles").upsert(
      {
        id: user.id,
        email: user.email,
        full_name: name?.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/account`,
            data: {
              full_name: fullName.trim() || null,
            },
          },
        });

        if (signupError) {
          setError(cleanAuthError(signupError.message));
          return;
        }

        if (data.session) {
          await ensureCustomerProfile(data.user, fullName);
          router.push("/account");
          router.refresh();
          return;
        }

        setNotice("Account created. Please confirm your email to finish signing in.");
        return;
      }

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        setError(cleanAuthError(loginError.message));
        return;
      }

      if (isAdmin) {
        const { data: adminProfile, error: adminError } = await supabase
          .from("admin_profiles")
          .select("role")
          .eq("id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (adminError || adminProfile?.role !== "admin") {
          await supabase.auth.signOut();
          setError("This account is not authorized for the admin portal.");
          return;
        }

        router.push("/admin");
        router.refresh();
        return;
      }

      await ensureCustomerProfile(data.user);
      router.push("/account");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <Link href="/" className="auth-brand" aria-label="Back to TERNEX homepage">
          <span className="auth-brand-mark">◆</span>
          TERNEX
        </Link>

        <div className="auth-card">
          <div className="auth-card__header">
            <p className="auth-kicker">{isAdmin ? "Private access" : "Customer access"}</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          {error ? <div className="auth-alert auth-alert--error">{error}</div> : null}
          {notice ? <div className="auth-alert auth-alert--notice">{notice}</div> : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup ? (
              <label className="auth-field">
                <span>Full name</span>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
            ) : null}

            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={isAdmin ? "admin@ternex.global" : "you@example.com"}
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={6}
                required
              />
            </label>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
            </button>
          </form>

          <div className="auth-switch">
            {isAdmin ? (
              <>
                <Link href="/">Back to website</Link>
                <Link href="/login">Customer login</Link>
              </>
            ) : isSignup ? (
              <>
                Already have an account? <Link href="/login">Log in</Link>
              </>
            ) : (
              <>
                New to TERNEX? <Link href="/signup">Create an account</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
