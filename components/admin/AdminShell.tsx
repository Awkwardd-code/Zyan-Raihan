import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111f] text-[#F5F5F0]">
      <div className="mx-auto flex max-w-[1600px] flex-col xl:min-h-screen xl:flex-row">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1 p-5 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
