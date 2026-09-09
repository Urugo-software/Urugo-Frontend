import { RenterPayment } from "@/types/renter";

export function PaymentHistoryTable({
  payments,
}: {
  payments: RenterPayment[];
}) {
  return (
    <div className="rounded-sm border border-line bg-white shadow-xs overflow-hidden">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-sm font-bold text-ink">Payment History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface text-faint uppercase tracking-wider font-semibold border-b border-line">
            <tr>
              <th className="px-5 py-3">Period</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Payment Method</th>
              <th className="px-5 py-3">Paid Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink">
            {payments.map((item) => (
              <tr key={item.id} className="hover:bg-surface/50">
                <td className="px-5 py-3.5 font-semibold">{item.period}</td>
                <td className="px-5 py-3.5 font-bold">
                  RWF {item.amountRwf.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-body">
                  {item.paymentType || "—"}
                </td>
                <td className="px-5 py-3.5 text-body">
                  {item.paidAt || item.dueDate}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold ${
                      item.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
