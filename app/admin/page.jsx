"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      // 1. Check active session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        router.push("/admin/login");
        return;
      }

      // 2. Check admin profile
      const { data: profile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }

      setAdminUser(session.user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p>Verifying Admin Access...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar / Header Navigation */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoDiamond}>◆</span> TERNEX ADMIN
        </div>
        <div style={styles.headerActions}>
          <Link href="/" style={styles.backLink}>← Back to Website</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <p style={styles.subtitle}>Welcome back. Here is what is happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Total Products</h3>
            <p style={styles.cardValue}>0</p>
            <div style={styles.cardFooter}>Active in catalog</div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Total Orders</h3>
            <p style={styles.cardValue}>0</p>
            <div style={styles.cardFooter}>All time</div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Pending Orders</h3>
            <p style={styles.cardValue}>0</p>
            <div style={styles.cardFooter}>Awaiting processing</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionsGrid}>
          <Link href="/admin/products" style={styles.actionBlock}>
            <h2>Manage Products</h2>
            <p>Add, edit, or remove items from your catalog.</p>
          </Link>
          <Link href="/admin/orders" style={styles.actionBlock}>
            <h2>Manage Orders</h2>
            <p>View customer requests and update order statuses.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0d1013",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#0d1013",
    color: "rgba(255,255,255,0.6)",
  },
  loader: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(217,154,50,0.2)",
    borderTopColor: "#d99a32",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    backgroundColor: "#111418",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "2px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoDiamond: {
    color: "#d99a32",
  },
  headerActions: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  backLink: {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s",
  },
  main: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  welcomeSection: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "rgba(255,255,255,0.6)",
    margin: 0,
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#111418",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "24px",
  },
  cardTitle: {
    margin: "0 0 16px 0",
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  cardValue: {
    margin: "0 0 16px 0",
    fontSize: "36px",
    fontWeight: "700",
    color: "#d99a32",
  },
  cardFooter: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "16px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
  },
  actionBlock: {
    backgroundColor: "rgba(217,154,50,0.05)",
    border: "1px solid rgba(217,154,50,0.2)",
    borderRadius: "12px",
    padding: "32px",
    textDecoration: "none",
    color: "#fff",
    transition: "transform 0.2s, backgroundColor 0.2s",
  },
};
