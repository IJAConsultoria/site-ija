import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin | Instituto João Alves",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-900">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen p-4 pt-16 lg:p-8 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
