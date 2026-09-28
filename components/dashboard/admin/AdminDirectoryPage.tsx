import { AdminDirectoryView } from "./AdminDirectoryView";
import { AdminCreateAction } from "./AdminCreateAction";
import { adminDirectories } from "@/data/admin-dashboard-data";

export function AdminDirectoryPage({ directory }: { directory: keyof typeof adminDirectories }) {
  const action = directory === "users" ? <AdminCreateAction type="landlord" /> : directory === "properties" ? <AdminCreateAction type="property" /> : directory === "admin-management" ? <AdminCreateAction type="administrator" /> : undefined;
  return <AdminDirectoryView page={adminDirectories[directory]} action={action} />;
}