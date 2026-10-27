import React from "react";
import { HeartPulse } from "lucide-react";

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clinic-teal text-white">
        <HeartPulse size={25} />
      </div>

      <div>
        <h1 className="text-xl font-bold">
          MediCare
        </h1>
        <p className="text-xs text-slate-500">
          Clinical Management
        </p>
      </div>
    </div>
  );
}

export default Brand;