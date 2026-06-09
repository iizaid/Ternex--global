import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { requireAdminUser } from "@/lib/auth";

export const metadata = {
  title: "TERNEX Admin Dashboard",
  description: "TERNEX admin dashboard.",
};

function UnauthorizedAdmin({ email }) {
  return (
    <main className="dashboard-page dashboard-page--dark">
      <section className="dashboard-shell">
        <div className="dashboard-topbar">
          <Link href="/" className="dashboard-brand">
            <span>◆</span>
            TERNEX
          </Link>
          <LogoutButton className="dashboard-ghost-button" redirectTo="/admin/login" />
        </div>

        <div className="dashboard-panel dashboard-panel--narrow">
          <p className="dashboard-kicker">Unauthorized</p>
          <h1>Admin access required</h1>
          <p>
            The signed-in account <strong>{email}</strong> is not listed as an admin in
            <code> admin_profiles</code>.
          </p>
          <div className="dashboard-actions">
            <Link href="/account" className="dashboard-primary-link">
              Go to account
            </Link>
            <Link href="/" className="dashboard-secondary-link">
              Back to website
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function AdminDashboardPage() {
  const { user, isAdmin } = await requireAdminUser();

  if (!isAdmin) {
    return <UnauthorizedAdmin email={user.email} />;
  }

  return (
    <main className="dashboard-page dashboard-page--dark">
      <section className="dashboard-shell">
        <div className="dashboard-topbar">
          <Link href="/" className="dashboard-brand">
            <span>◆</span>
            TERNEX ADMIN
          </Link>
          <div className="dashboard-topbar__actions">
            <Link href="/" className="dashboard-text-link">
              Website
            </Link>
            <LogoutButton className="dashboard-ghost-button" redirectTo="/admin/login" />
          </div>
        </div>

        <div className="dashboard-hero">
          <p className="dashboard-kicker">Verified admin</p>
          <h1>TERNEX Admin Dashboard</h1>
          <p>
            Logged in as <strong>{user.email}</strong>
          </p>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <span className="dashboard-card__label">Catalog</span>
            <h2>Products</h2>
            <p>Product management is ready to connect when the catalog tools are built.</p>
            <button className="dashboard-card__button" type="button" disabled>
              Coming soon
            </button>
          </article>

          <article className="dashboard-card">
            <span className="dashboard-card__label">Orders</span>
            <h2>Requests</h2>
            <p>Customer request handling can be added on top of this protected area.</p>
            <button className="dashboard-card__button" type="button" disabled>
              Coming soon
            </button>
          </article>

          <article className="dashboard-card">
            <span className="dashboard-card__label">Access</span>
            <h2>Admin role</h2>
            <p>Access is verified against the <code>admin_profiles</code> table.</p>
            <Link href="/account" className="dashboard-card__link">
              View account
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
