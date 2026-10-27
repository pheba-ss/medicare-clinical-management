import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Brand from "../components/Brand";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-clinic-background p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-clinic-dark p-12 text-white md:flex">
          <Brand />

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Better care,
              <br />
              better outcomes.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Manage patient records, appointments, and clinical
              activities from one simple workspace.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 MediCare Clinical
          </p>
        </div>

        <div className="p-7 sm:p-12">
          <div className="mb-8 md:hidden">
            <Brand />
          </div>

          <p className="text-sm font-semibold text-clinic-teal">
            WELCOME BACK
          </p>

          <h2 className="mt-2 text-3xl font-bold text-clinic-dark">
            Sign in to your account
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Enter your details to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@hospital.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-semibold text-clinic-teal hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-clinic-teal focus:ring-2 focus:ring-teal-100"
                />

                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle size={17} />
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-clinic-teal px-4 py-3 font-semibold text-white transition hover:bg-clinic-dark"
            >
              Sign in <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Secure access for authorized clinical staff.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;