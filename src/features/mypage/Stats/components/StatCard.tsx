import React from "react";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export const StatCard = ({ icon, label, value }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start gap-2 border border-gray-100">
    <div className="text-gray-500">{icon}</div>
    <div className="text-sm text-gray-600">{label}</div>
    <div className="text-xl font-semibold text-gray-800">{value}</div>
  </div>
);
