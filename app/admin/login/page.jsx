"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Verify if user is an admin by checking admin_profiles
    const { data: profileData, error: profileError } = await supabase
      .from("admin_profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profileData || profileData.role !== "admin") {
      await supabase.auth.signOut();
      setError("Unauthorized access. Admin privileges required.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.brand}>
          <span style={styles.diamond}>◆</span> TERNEX
        </div>
        
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Admin Portal</h1>
            <p style={styles.subtitle}>Manage products, orders, and requests</p>
          </div>
          
          {error && (
            <div style={styles.error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="admin@ternex.global"
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? (
                <span style={styles.loadingState}>
                  <span style={styles.spinner}></span> Authenticating...
                </span>
              ) : (
                "Secure Log In"
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <Link href="/" style={styles.backLink}>
              ← Back to Website
            </Link>
          </div>
        </div>
        
        <div style={styles.copyright}>
          © {new Date().getFullYear()} Ternex Global. All rights reserved.
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div style={styles.gradientOverlay}></div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#0d1013",
    position: "relative",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 50% 0%, rgba(217, 154, 50, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "420px",
    padding: "20px",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  brand: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "4px",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  diamond: {
    color: "#d99a32",
    fontSize: "20px",
  },
  card: {
    background: "#111418",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(217, 154, 50, 0.1) inset",
  },
  header: {
    marginBottom: "32px",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
    margin: 0,
  },
  error: {
    background: "rgba(255, 59, 48, 0.1)",
    color: "#ff3b30",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid rgba(255, 59, 48, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "13px",
    fontWeight: "500",
  },
  input: {
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  button: {
    background: "#d99a32",
    color: "#0d1013",
    border: "none",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    transition: "background 0.2s ease, transform 0.1s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingState: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(13, 16, 19, 0.3)",
    borderTopColor: "#0d1013",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  },
  backLink: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "13px",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  copyright: {
    marginTop: "40px",
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: "12px",
  },
};

// Add global keyframes for spinner if not exists
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
