import React, { useState } from "react";
import { Settings as UserRound, Bell, Building2, Save, CheckCircle2 } from "lucide-react";

const inputClass = "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@medicare.com",
    role: "Administrator",
    phone: "+91 98765 43210",
  });

  const [clinic, setClinic] = useState({
    name: "MediCare Clinical Center",
    address: "Thiruvananthapuram, Kerala",
    phone: "+91 471 234 5678",
    email: "contact@medicare.com",
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    patientUpdates: true,
    weeklyReports: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-clinic-teal">PREFERENCES</p>
        <h1 className="mt-1 text-2xl font-bold text-clinic-dark">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Manage your profile, clinic information, and notifications.</p>
      </div>

      {saved && (
        <div role="status" className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-medium text-green-700">
          <CheckCircle2 size={19} />
          Settings saved for this demo session.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-teal-50 p-3 text-clinic-teal"><UserRound size={22} /></div>
            <div><h2 className="font-bold text-clinic-dark">Profile information</h2><p className="mt-1 text-sm text-slate-500">Update your account details.</p></div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Full name
              <input className={inputClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
            </label>
            <label className="text-sm font-semibold text-slate-700">Email address
              <input className={inputClass} type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
            </label>
            <label className="text-sm font-semibold text-slate-700">Role
              <input className={inputClass} value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} required />
            </label>
            <label className="text-sm font-semibold text-slate-700">Phone number
              <input className={inputClass} type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-teal-50 p-3 text-clinic-teal"><Building2 size={22} /></div>
            <div><h2 className="font-bold text-clinic-dark">Clinic information</h2><p className="mt-1 text-sm text-slate-500">Manage your clinic's contact details.</p></div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Clinic name
              <input className={inputClass} value={clinic.name} onChange={(e) => setClinic({ ...clinic, name: e.target.value })} required />
            </label>
            <label className="text-sm font-semibold text-slate-700">Contact email
              <input className={inputClass} type="email" value={clinic.email} onChange={(e) => setClinic({ ...clinic, email: e.target.value })} required />
            </label>
            <label className="text-sm font-semibold text-slate-700">Clinic phone
              <input className={inputClass} type="tel" value={clinic.phone} onChange={(e) => setClinic({ ...clinic, phone: e.target.value })} />
            </label>
            <label className="text-sm font-semibold text-slate-700">Address
              <input className={inputClass} value={clinic.address} onChange={(e) => setClinic({ ...clinic, address: e.target.value })} required />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-teal-50 p-3 text-clinic-teal"><Bell size={22} /></div>
            <div><h2 className="font-bold text-clinic-dark">Notifications</h2><p className="mt-1 text-sm text-slate-500">Choose which updates you want to receive.</p></div>
          </div>

          <div className="mt-2 divide-y divide-slate-100">
            {[
              { key: "appointments", title: "Appointment reminders", description: "Updates about upcoming appointments." },
              { key: "patientUpdates", title: "Patient updates", description: "Notifications when patient information changes." },
              { key: "weeklyReports", title: "Weekly reports", description: "A summary of clinic activity each week." },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 py-4">
                <div><p className="text-sm font-semibold text-slate-700">{item.title}</p><p className="mt-1 text-sm text-slate-500">{item.description}</p></div>
                <button type="button" role="switch" aria-checked={notifications[item.key]} aria-label={item.title} onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} className={`relative h-6 w-11 shrink-0 rounded-full transition ${notifications[item.key] ? "bg-clinic-teal" : "bg-slate-300"}`}>
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${notifications[item.key] ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-clinic-teal px-6 py-3 font-semibold text-white transition hover:bg-clinic-dark sm:w-auto">
            <Save size={18} />
            Save settings
          </button>
        </div>
      </form>

      <p className="text-xs text-slate-400">Demo settings are stored in component state and will reset when the page reloads.</p>
    </section>
  );
}

export default Settings;