import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  LogOut,
  Stethoscope,
  Users,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import AppointmentTable from "../components/AppointmentTable";

import Patients from "./Patients";
import Appointments from "./Appointments";
import ClinicalRecords from "./ClinicalRecords";
import Settings from "./Settings";

function Dashboard() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      note: "Registered patient records",
      icon: Users,
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Appointments",
      value: "42",
      note: "Scheduled for today",
      icon: CalendarDays,
      iconColor: "bg-teal-50 text-clinic-teal",
    },
    {
      title: "Available Doctors",
      value: "18",
      note: "Doctors on today's roster",
      icon: Stethoscope,
      iconColor: "bg-violet-50 text-violet-600",
    },
    {
      title: "Pending Reviews",
      value: "07",
      note: "Records awaiting review",
      icon: Activity,
      iconColor: "bg-amber-50 text-amber-600",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    } else if (hour < 16) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  const handleNavigation = (page) => {
    setActiveNav(page);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  const renderPage = () => {
    switch (activeNav) {
      case "Patients":
        return <Patients />;

      case "Appointments":
        return <Appointments />;

      case "Clinical Records":
        return <ClinicalRecords />;

      case "Settings":
        return <Settings />;

      case "Dashboard":
      default:
        return (
          <>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-clinic-teal">
                  CLINICAL OVERVIEW
                </p>

                <h1 className="mt-2 text-2xl font-bold text-clinic-dark sm:text-3xl">
                  {getGreeting()}, Admin!
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Here is what is happening at your clinic today.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleNavigation("Appointments")}
                className="flex items-center justify-center gap-2 rounded-xl bg-clinic-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-clinic-dark"
              >
                <CalendarDays size={18} />
                View appointments
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            <div className="mt-6">
              <AppointmentTable />
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-clinic-dark">
                  Clinical workspace
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  This dashboard currently displays sample data.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <LogOut size={17} />
                Sign out
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              © 2026 MediCare Clinical Management System
            </p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-clinic-background">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={handleNavigation}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="min-w-0 lg:pl-64">
        <Header
          title={activeNav}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="p-4 sm:p-7 lg:p-9">
          {renderPage()}
        </main>
      </div>

      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <h2
              id="logout-title"
              className="mt-4 text-xl font-bold text-slate-900"
            >
              Sign out?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to sign out of MediCare? You will return
              to the login page.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;