import Link from "next/link";

export const metadata = {
  title: "Authentication Error | TERNEX",
  description: "TERNEX authentication link error.",
};

export default function AuthCodeErrorPage() {
  return (
    <main className="dashboard-page dashboard-page--cream">
      <section className="dashboard-shell">
        <div className="dashboard-panel">
          <p className="dashboard-kicker">Authentication error</p>
          <h1>This sign-in link could not be verified</h1>
          <p>
            Please request a fresh login or signup link and try again. Expired links cannot
            be reused.
          </p>
          <div className="dashboard-actions">
            <Link href="/login" className="dashboard-primary-link">
              Back to login
            </Link>
            <Link href="/" className="dashboard-secondary-link dashboard-secondary-link--light">
              Website home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
