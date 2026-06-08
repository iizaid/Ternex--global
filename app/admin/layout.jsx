export const metadata = {
  title: "Admin Dashboard | TERNEX",
  description: "Ternex Admin Management",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout" style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      {children}
    </div>
  );
}
