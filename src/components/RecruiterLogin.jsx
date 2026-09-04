import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import AuthFooter from "./AuthFooter.jsx";

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const { setShowRecruiterLogin, loginRecruiter } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const finishLogin = (loginEmail) => {
    loginRecruiter(loginEmail || "recruiter@demo.com");
    setShowRecruiterLogin(false);
    toast.success("Welcome to recruiter dashboard");
    navigate("/dashboard/manage-jobs");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    finishLogin(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="auth-modal relative w-full max-w-[400px] overflow-hidden rounded-xl">
        <button
          type="button"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute right-3 top-3 text-3xl leading-none text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>

        <form onSubmit={onSubmitHandler} className="px-8 pb-8 pt-9">
          <h1 className="text-center text-[17px] font-bold text-gray-900">Recruiter Login</h1>
          <p className="mt-1 mb-6 text-center text-[13px] text-gray-500">
            Welcome back! Please sign in to continue
          </p>

          <div className="mb-4">
            <label className="mb-1 block text-[13px] font-medium text-gray-800">
              Email address
            </label>
            <div className="relative">
              <img
                className="icon-adaptive pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                src={assets.email_icon}
                alt=""
              />
              <input
                className="auth-field w-full rounded-md py-2 pl-9 pr-3 text-[13px] outline-none placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email id"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-[13px] font-medium text-gray-800">Password</label>
            <div className="relative">
              <img
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                src={assets.lock_icon}
                alt=""
              />
              <input
                className="auth-field w-full rounded-md py-2 pl-9 pr-9 text-[13px] outline-none placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <p className="mb-2 text-[13px] text-blue-600 cursor-pointer">Forgot password?</p>

          <button
            type="submit"
            className="auth-continue mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-2.5 text-[13px] font-medium"
          >
            Login
          </button>
        </form>

        <AuthFooter />
      </div>
    </div>
  );
};

export default RecruiterLogin;
