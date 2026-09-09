import React from "react";
import { ElectricityBill } from "@/types/renter";

export function ElectricityBillsTable({ bills }: { bills: ElectricityBill[] }) {
  return (
    <div className=" border border-line bg-white shadow-xs overflow-hidden">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-sm font-bold text-ink">
          Electricity Statement History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface text-faint uppercase font-semibold border-b border-line">
            <tr>
              <th className="px-5 py-3">Billing Period</th>
              <th className="px-5 py-3">Previous Reading</th>
              <th className="px-5 py-3">Current Reading</th>
              <th className="px-5 py-3">Consumption</th>
              <th className="px-5 py-3">Amount (RWF)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-surface/50">
                <td className="px-5 py-3 font-semibold">{bill.period}</td>
                <td className="px-5 py-3 text-body">
                  {bill.previousReading} kWh
                </td>
                <td className="px-5 py-3 text-body">
                  {bill.currentReading} kWh
                </td>
                <td className="px-5 py-3 font-bold text-brand">
                  {bill.kwh} kWh
                </td>
                <td className="px-5 py-3 font-bold">
                  RWF {bill.amountRwf.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
