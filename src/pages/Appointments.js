import React, { useState } from "react";
import { Plus, Search, CalendarDays, X } from "lucide-react";

const initialAppointments = [
    { id: 1, patient: "Olivia Martin", doctor: "Dr. Sarah Wilson", department: "Cardiology", date: "2026-10-27", time: "09:00", status: "Confirmed" },
    { id: 2, patient: "James Anderson", doctor: "Dr. Michael Chen", department: "General Medicine", date: "2026-10-27", time: "10:30", status: "Pending" },
    { id: 3, patient: "Sophia Brown", doctor: "Dr. Emily Davis", department: "Neurology", date: "2026-10-28", time: "11:00", status: "Confirmed" },
    { id: 4, patient: "William Taylor", doctor: "Dr. Robert Lee", department: "Cardiology", date: "2026-10-29", time: "14:00", status: "Completed" },
];

const inputClass = "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100";

function Appointments() {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ patient: "", doctor: "", department: "General Medicine", date: "", time: "" });

    const filteredAppointments = appointments.filter((appointment) =>
        [appointment.patient, appointment.doctor, appointment.department, appointment.status]
            .some((value) => value.toLowerCase().includes(search.toLowerCase()))
    );

    const handleSchedule = (event) => {
        event.preventDefault();

        if (!form.patient.trim() || !form.doctor.trim() || !form.date || !form.time) {
            setError("Please complete all required fields.");
            return;
        }

        setAppointments((prev) => [
            ...prev,
            {
                ...form,
                id: Date.now(),
                patient: form.patient.trim(),
                doctor: form.doctor.trim(),
                status: "Pending",
            },
        ]);
        setForm({ patient: "", doctor: "", department: "General Medicine", date: "", time: "" });
        setError("");
        setShowForm(false);
    };

    const updateStatus = (id, status) => {
        setAppointments((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-clinic-teal">
                        SCHEDULE MANAGEMENT
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage appointments, track upcoming visits, and coordinate patient schedules.
                    </p>
                </div>
                <button onClick={() => { setShowForm(!showForm); setError(""); }} className="flex items-center justify-center gap-2 rounded-xl bg-clinic-teal px-4 py-3 text-sm font-semibold text-white hover:bg-clinic-dark">
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? "Cancel" : "Schedule appointment"}
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: "Total appointments", value: appointments.length },
                    { label: "Confirmed", value: appointments.filter((a) => a.status === "Confirmed").length },
                    { label: "Pending", value: appointments.filter((a) => a.status === "Pending").length },
                ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <CalendarDays size={22} className="text-clinic-teal" />
                        <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                        <p className="mt-1 text-2xl font-bold text-clinic-dark">{item.value}</p>
                    </div>
                ))}
            </div>

            {showForm && (
                <form onSubmit={handleSchedule} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-bold text-clinic-dark">Schedule appointment</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input className={inputClass} placeholder="Patient name *" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
                        <input className={inputClass} placeholder="Doctor name *" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
                        <select className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                            <option>General Medicine</option><option>Cardiology</option><option>Neurology</option><option>Orthopedics</option><option>Pediatrics</option>
                        </select>
                        <input className={inputClass} type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        <input className={inputClass} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                    </div>
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="rounded-xl bg-clinic-teal px-5 py-3 text-sm font-semibold text-white hover:bg-clinic-dark">Save appointment</button>
                </form>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-4 sm:p-5">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input className={`${inputClass} pl-10`} placeholder="Search patient, doctor, department..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4">Patient</th><th className="px-5 py-4">Doctor</th><th className="px-5 py-4">Department</th><th className="px-5 py-4">Date &amp; time</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-4 font-semibold text-clinic-dark">{appointment.patient}</td>
                                    <td className="px-5 py-4 text-slate-600">{appointment.doctor}</td>
                                    <td className="px-5 py-4 text-slate-600">{appointment.department}</td>
                                    <td className="px-5 py-4 text-slate-600">{appointment.date} <span className="block mt-1 text-xs">{appointment.time}</span></td>
                                    <td className="px-5 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "Confirmed" ? "bg-green-50 text-green-700" : appointment.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{appointment.status}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <select aria-label={`Update status for ${appointment.patient}`} value={appointment.status} onChange={(e) => updateStatus(appointment.id, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-clinic-teal">
                                            <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {filteredAppointments.length === 0 && <tr><td colSpan="6" className="px-5 py-10 text-center text-slate-500">No appointments found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Appointments;