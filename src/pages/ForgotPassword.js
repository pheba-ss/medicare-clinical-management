import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import Brand from "../components/Brand";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage(
        "If an account exists for this email, password reset instructions will be sent."
      );
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-clinic-background p-4">
      <div className="flex w-full max-w-5xl items-center justify-center rounded-3xl bg-white px-7 py-8 shadow-xl sm:px-12 sm:py-10 lg:px-16">

        <div className="w-full max-w-md">

          <div className="mb-8 flex justify-center">
            <Brand />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-clinic-dark">
              Reset your password
            </h1>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500 sm:whitespace-nowrap">
              Enter your email address and we’ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="reset-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@hospital.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setMessage("");
                  }}
                  disabled={loading}
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? "reset-email-error" : undefined
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-clinic-teal focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
                />
              </div>

              {error && (
                <p
                  id="reset-email-error"
                  role="alert"
                  className="flex items-center mt-2 gap-2 text-sm text-red-600"
                >
                  <AlertCircle size={17} />
                  {error}
                </p>
              )}
            </div>

            {message && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm leading-5 text-teal-800"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p>{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-clinic-teal px-4 py-3 font-semibold text-white transition hover:bg-clinic-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send reset link
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-clinic-teal transition hover:text-clinic-dark"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Back to sign in
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Secure access for authorized clinical staff.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;