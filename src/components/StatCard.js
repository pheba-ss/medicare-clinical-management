import React from "react";

function StatCard({ title, value, note, icon: Icon, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-clinic-dark">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconColor}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {note}
      </p>
    </div>
  );
}

export default StatCard;