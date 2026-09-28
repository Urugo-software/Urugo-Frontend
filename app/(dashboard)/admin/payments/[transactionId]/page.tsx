import { notFound } from "next/navigation";
import { AdminTransactionDetail } from "@/components/dashboard/admin/AdminTransactionDetail";
import { recentPayments } from "@/data/admin-dashboard-data";

export default async function AdminPaymentDetailPage({ params }: { params: Promise<{ transactionId: string }> }) {
  const { transactionId } = await params;
  const payment = recentPayments.find((item) => item.transactionId === transactionId);
  if (!payment) notFound();
  return <AdminTransactionDetail payment={payment} />;
}
