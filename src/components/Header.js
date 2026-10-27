import React, { useState } from "react";
import { Bell, Menu, CheckCheck, CalendarDays, Users, FileText} from "lucide-react";

function Header({ title, onMenuClick }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New appointment scheduled",
      message: "A patient appointment has been scheduled for today.",
      time: "10 minutes ago",
      icon: CalendarDays,
      unread: true,
    },
    {
      id: 2,
      title: "New patient registered",
      message: "A new patient profile has been added.",
      time: "30 minutes ago",
      icon: Users,
      unread: true,
    },
    {
      id: 3,
      title: "Clinical review pending",
      message: "There are clinical records waiting for review.",
      time: "1 hour ago",
      icon: FileText,
      unread: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const getSubtitle = () => {
    switch (title) {
      case "Dashboard":
        return "Welcome back! Here is your clinical overview.";
      case "Patients":
        return "Manage patient profiles and information.";
      case "Appointments":
        return "Schedule and manage clinic appointments.";
      case "Clinical Records":
        return "Review and manage clinical records.";
      case "Settings":
        return "Manage your account and clinic preferences.";
      default:
        return "Welcome to MediCare Clinical Management System.";
    }
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-clinic-dark sm:text-xl">
            {title}
          </h2>
          <p className="hidden text-xs text-slate-500 sm:block">
            {getSubtitle()}
          </p>
        </div>
      </div>

      <div className="ml-3 flex items-center gap-3 sm:gap-5">
        <div className="relative">
          <button
            type="button"
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
            className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <>
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                <span className="sr-only">
                  {unreadCount} unread notifications
                </span>
              </>
            )}
          </button>

          {notificationsOpen && (
            <>
              <button
                type="button"
                aria-label="Close notifications"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setNotificationsOpen(false)}
              />

              <div className="absolute right-0 z-50 mt-3 w-[min(350px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl sm:w-96">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div>
                    <h3 className="font-bold text-clinic-dark">
                      Notifications
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {unreadCount} unread notification
                      {unreadCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="flex items-center gap-1 text-xs font-semibold text-clinic-teal hover:text-clinic-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <CheckCheck size={15} />
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const NotificationIcon = notification.icon;

                      return (
                        <button
                          type="button"
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`flex w-full items-start gap-3 border-b border-slate-50 p-4 text-left transition hover:bg-slate-50 ${
                            notification.unread ? "bg-teal-50/40" : "bg-white"
                          }`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-clinic-teal">
                            <NotificationIcon size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-slate-800">
                                {notification.title}
                              </p>

                              {notification.unread && (
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-clinic-teal" />
                              )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                            <p className="mt-2 text-[11px] text-slate-400">
                              {notification.time}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <Bell
                        size={28}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No notifications
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        You're all caught up.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 p-3 text-center">
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-sm font-semibold text-clinic-teal hover:text-clinic-dark"
                  >
                    Close notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-clinic-teal">
            AD
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-clinic-dark">
              Admin User
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;