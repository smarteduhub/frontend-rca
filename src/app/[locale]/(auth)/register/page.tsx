import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[28px] shadow-sm p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Registration</h1>
        <p className="text-sm text-slate-500">
          Student self-registration is currently not available. Please contact
          your school administrator to create an account, then log in with the
          provided credentials.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-xl bg-main px-4 py-2 text-white font-semibold shadow-main/30 shadow-lg hover:bg-main/90 transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
