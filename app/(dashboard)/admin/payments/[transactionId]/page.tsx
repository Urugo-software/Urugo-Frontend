import { AdminTransactionDetail } from "@/components/dashboard/admin/AdminTransactionDetail";

export default async function AdminPaymentDetailPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  const { transactionId } = await params;
  return (
    <AdminTransactionDetail transactionId={decodeURIComponent(transactionId)} />
  );
}
