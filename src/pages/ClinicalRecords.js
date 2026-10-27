import React, { useState } from "react";
import { FileText, Search, Eye, X, ClipboardList } from "lucide-react";

const records = [
  { id: 1, patient: "Olivia Martin", doctor: "Dr. Sarah Wilson", date: "2026-10-25", type: "Consultation", diagnosis: "Hypertension", notes: "Blood pressure reviewed. Continue monitoring and follow the prescribed care plan." },
  { id: 2, patient: "James Anderson", doctor: "Dr. Michael Chen", date: "2026-10-24", type: "Follow-up", diagnosis: "Diabetes review", notes: "Follow-up visit recorded. Review glucose readings with the treating clinician." },
  { id: 3, patient: "Sophia Brown", doctor: "Dr. Emily Davis", date: "2026-10-23", type: "Consultation", diagnosis: "Migraine", notes: "Symptoms and history reviewed during consultation." },
  { id: 4, patient: "William Taylor", doctor: "Dr. Robert Lee", date: "2026-10-22", type: "Lab report", diagnosis: "Routine assessment", notes: "Sample record for a routine clinical assessment. Verify actual results in the clinical system." },
];

const inputClass = "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100";

function ClinicalRecords() {
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = records.filter((record) =>
    [record.patient, record.doctor, record.type, record.diagnosis]
      .some((value) => value.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-clinic-teal">PATIENT DOCUMENTATION</p>
        <h1 className="mt-1 text-2xl font-bold text-clinic-dark">Clinical Records</h1>
        <p className="mt-2 text-sm text-slate-500">Review sample consultation notes and patient documentation.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <FileText size={23} className="text-clinic-teal" />
          <p className="mt-4 text-sm text-slate-500">Total records</p>
          <p className="mt-1 text-2xl font-bold text-clinic-dark">{records.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <ClipboardList size={23} className="text-clinic-teal" />
          <p className="mt-4 text-sm text-slate-500">Consultations</p>
          <p className="mt-1 text-2xl font-bold text-clinic-dark">{records.filter((r) => r.type === "Consultation").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Other records</p>
          <p className="mt-3 text-2xl font-bold text-clinic-dark">{records.filter((r) => r.type !== "Consultation").length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} pl-10`} placeholder="Search patient, doctor, or diagnosis..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr><th className="px-5 py-4">Patient</th><th className="px-5 py-4">Record type</th><th className="px-5 py-4">Diagnosis / reason</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Details</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-clinic-dark">{record.patient}</p>
                    <p className="mt-1 text-xs text-slate-500">{record.doctor}</p>
                  </td>
                  <td className="px-5 py-4"><span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-clinic-teal">{record.type}</span></td>
                  <td className="px-5 py-4 text-slate-600">{record.diagnosis}</td>
                  <td className="px-5 py-4 text-slate-600">{record.date}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => setSelectedRecord(record)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-clinic-teal hover:bg-teal-50"><Eye size={16} /> View</button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && <tr><td colSpan="5" className="px-5 py-10 text-center text-slate-500">No clinical records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="record-title">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 id="record-title" className="text-xl font-bold text-clinic-dark">Clinical record</h2>
                <p className="mt-1 text-sm text-slate-500">{selectedRecord.patient}</p>
              </div>
              <button aria-label="Close record" onClick={() => setSelectedRecord(null)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20} /></button>
            </div>
            <div className="mt-5 space-y-4 text-sm">
              <div><p className="text-slate-500">Record type</p><p className="mt-1 font-semibold text-clinic-dark">{selectedRecord.type}</p></div>
              <div><p className="text-slate-500">Doctor</p><p className="mt-1 font-semibold text-clinic-dark">{selectedRecord.doctor}</p></div>
              <div><p className="text-slate-500">Date</p><p className="mt-1 font-semibold text-clinic-dark">{selectedRecord.date}</p></div>
              <div><p className="text-slate-500">Diagnosis / reason</p><p className="mt-1 font-semibold text-clinic-dark">{selectedRecord.diagnosis}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="font-semibold text-clinic-dark">Clinical notes</p><p className="mt-2 leading-6 text-slate-600">{selectedRecord.notes}</p></div>
            </div>
            <button onClick={() => setSelectedRecord(null)} className="mt-6 w-full rounded-xl bg-clinic-teal px-4 py-3 font-semibold text-white">Close</button>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400">Demonstration data only. These records are not connected to a medical records system.</p>
    </section>
  );
}

export default ClinicalRecords;