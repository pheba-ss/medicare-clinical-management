import React from "react";
import {
  Activity,
  CalendarDays,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import Brand from "./Brand";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Patients", icon: Users },
  { label: "Appointments", icon: CalendarDays },
  { label: "Clinical Records", icon: Activity },
  { label: "Settings", icon: Settings },
];

function Sidebar({
  activeNav,
  setActiveNav,
  isOpen,
  onClose,
}) {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-100 bg-white px-5 py-6 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Brand />

          <button
            aria-label="Close menu"
            onClick={onClose}
            className="text-slate-500 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        <p className="mb-3 mt-10 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActiveNav(label);
                onClose();
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activeNav === label
                  ? "bg-teal-50 text-clinic-teal"
                  : "text-slate-500 hover:bg-slate-50 hover:text-clinic-dark"
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-clinic-dark p-4 text-white">
          <Stethoscope size={24} />

          <p className="mt-4 text-sm font-semibold">
            Need assistance?
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-300">
            Contact your system administrator for help.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;