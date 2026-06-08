"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
      setError(error.message);
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
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Access</h1>
        <p style={styles.subtitle}>Log in to manage Ternex</p>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
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
              required
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Authenticating..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  card: {
    background: "#111418",
    border: "1px solid rgba(217,154,50,0.2)",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
    marginBottom: "30px",
    textAlign: "center",
  },
  error: {
    background: "rgba(255,50,50,0.1)",
    color: "#ff5e5e",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid rgba(255,50,50,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px",
    fontWeight: "500",
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  button: {
    background: "#d99a32",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s ease",
  },
};
