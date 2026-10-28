import React, { useState } from "react";
import { Plus, Search, Trash2, Eye, X, Users } from "lucide-react";

const initialPatients = [
    { id: 1, name: "Olivia Martin", age: 32, gender: "Female", email: "olivia@example.com", phone: "+91 98765 43210", condition: "Hypertension", status: "Active" },
    { id: 2, name: "James Anderson", age: 45, gender: "Male", email: "james@example.com", phone: "+91 98765 43211", condition: "Diabetes", status: "Active" },
    { id: 3, name: "Sophia Brown", age: 28, gender: "Female", email: "sophia@example.com", phone: "+91 98765 43212", condition: "Migraine", status: "Active" },
    { id: 4, name: "William Taylor", age: 51, gender: "Male", email: "william@example.com", phone: "+91 98765 43213", condition: "Cardiac review", status: "Follow-up" },
];

const inputClass = "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100";

function Patients() {
    const [patients, setPatients] = useState(initialPatients);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [form, setForm] = useState({ name: "", age: "", gender: "Female", email: "", phone: "", condition: "" });
    const [error, setError] = useState("");

    const filteredPatients = patients.filter((patient) =>
        [patient.name, patient.email, patient.condition, patient.phone]
            .some((value) => value.toLowerCase().includes(search.toLowerCase()))
    );

    const handleAddPatient = (event) => {
        event.preventDefault();

        if (!form.name.trim() || !form.age || !form.email.trim() || !form.condition.trim()) {
            setError("Please complete all required fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (Number(form.age) < 1 || Number(form.age) > 120) {
            setError("Please enter a valid age between 1 and 120.");
            return;
        }

        setPatients((prev) => [
            ...prev,
            {
                ...form,
                id: Date.now(),
                age: Number(form.age),
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim() || "Not provided",
                condition: form.condition.trim(),
                status: "Active",
            },
        ]);

        setForm({ name: "", age: "", gender: "Female", email: "", phone: "", condition: "" });
        setError("");
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this patient?")) {
            setPatients((prev) => prev.filter((patient) => patient.id !== id));
            if (selectedPatient?.id === id) setSelectedPatient(null);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-clinic-teal">
                        CLINICAL MANAGEMENT
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        View and manage patient profiles, medical information, and care details.
                    </p>
                </div>
                <button onClick={() => { setShowForm(!showForm); setError(""); }} className="flex items-center justify-center gap-2 rounded-xl bg-clinic-teal px-4 py-3 text-sm font-semibold text-white hover:bg-clinic-dark">
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? "Cancel" : "Add patient"}
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <Users className="text-clinic-teal" size={23} />
                    <p className="mt-4 text-sm text-slate-500">Total patients</p>
                    <p className="mt-1 text-2xl font-bold text-clinic-dark">{patients.length}</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Active patients</p>
                    <p className="mt-3 text-2xl font-bold text-clinic-dark">{patients.filter((p) => p.status === "Active").length}</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Follow-ups</p>
                    <p className="mt-3 text-2xl font-bold text-clinic-dark">{patients.filter((p) => p.status === "Follow-up").length}</p>
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleAddPatient} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-bold text-clinic-dark">Add new patient</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input className={inputClass} placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input className={inputClass} type="number" min="1" max="120" placeholder="Age *" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                        <select className={inputClass} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                            <option>Female</option><option>Male</option><option>Other</option>
                        </select>
                        <input className={inputClass} type="email" placeholder="Email address *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <input className={inputClass} placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        <input className={inputClass} placeholder="Condition *" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} />
                    </div>
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="rounded-xl bg-clinic-teal px-5 py-3 text-sm font-semibold text-white hover:bg-clinic-dark">Save patient</button>
                </form>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-4 sm:p-5">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input className={`${inputClass} pl-10`} placeholder="Search name, email, or condition..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4">Patient</th>
                                <th className="px-5 py-4">Age / Gender</th>
                                <th className="px-5 py-4">Condition</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-clinic-dark">{patient.name}</p>
                                        <p className="mt-1 text-xs text-slate-500">{patient.email}</p>
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">{patient.age} / {patient.gender}</td>
                                    <td className="px-5 py-4 text-slate-600">{patient.condition}</td>
                                    <td className="px-5 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.status === "Active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{patient.status}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            <button aria-label={`View ${patient.name}`} onClick={() => setSelectedPatient(patient)} className="rounded-lg p-2 text-clinic-teal hover:bg-teal-50"><Eye size={17} /></button>
                                            <button aria-label={`Delete ${patient.name}`} onClick={() => handleDelete(patient.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={17} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPatients.length === 0 && <tr><td colSpan="5" className="px-5 py-10 text-center text-slate-500">No patients found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="patient-detail-title">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 id="patient-detail-title" className="text-xl font-bold text-clinic-dark">{selectedPatient.name}</h2>
                                <p className="mt-1 text-sm text-slate-500">Patient details</p>
                            </div>
                            <button onClick={() => setSelectedPatient(null)} aria-label="Close patient details" className="rounded-lg p-2 hover:bg-slate-100"><X size={20} /></button>
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                            <p><span className="font-semibold">Age:</span> {selectedPatient.age}</p>
                            <p><span className="font-semibold">Gender:</span> {selectedPatient.gender}</p>
                            <p><span className="font-semibold">Email:</span> {selectedPatient.email}</p>
                            <p><span className="font-semibold">Phone:</span> {selectedPatient.phone}</p>
                            <p><span className="font-semibold">Condition:</span> {selectedPatient.condition}</p>
                            <p><span className="font-semibold">Status:</span> {selectedPatient.status}</p>
                        </div>
                        <button onClick={() => setSelectedPatient(null)} className="mt-6 w-full rounded-xl bg-clinic-teal px-4 py-3 font-semibold text-white">Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Patients;