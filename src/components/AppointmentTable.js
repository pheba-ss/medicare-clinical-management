import React, { useState } from "react";
import { Search } from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "Olivia Martin",
    initials: "OM",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "James Anderson",
    initials: "JA",
    doctor: "Dr. Michael Chen",
    department: "Neurology",
    time: "09:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Sophia Brown",
    initials: "SB",
    doctor: "Dr. Emily Davis",
    department: "Pediatrics",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "William Taylor",
    initials: "WT",
    doctor: "Dr. Robert Lee",
    department: "Orthopedics",
    time: "10:30 AM",
    status: "Cancelled",
  },
];

function AppointmentTable() {
  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.patient} ${appointment.doctor} ${appointment.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusStyles = {
    Confirmed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-clinic-dark">
            Today's Appointments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Overview of scheduled patient visits
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            aria-label="Search appointments"
            placeholder="Search patients or doctors..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-4 font-semibold">Patient</th>
              <th className="px-6 py-4 font-semibold">Doctor</th>
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold">Time</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-clinic-teal">
                      {appointment.initials}
                    </div>

                    <span className="whitespace-nowrap text-sm font-semibold text-slate-700">
                      {appointment.patient}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {appointment.doctor}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {appointment.department}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {appointment.time}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                      statusStyles[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredAppointments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No appointments match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
        Showing {filteredAppointments.length} of {appointments.length} sample appointments
      </div>
    </section>
  );
}

export default AppointmentTable;