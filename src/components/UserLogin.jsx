import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import AuthFooter from "./AuthFooter.jsx";

const UserLogin = () => {
  const { setShowUserLogin, registerUser } = useAppContext();
  const [state, setState] = useState("Login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = state === "Login";

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const displayName =
      `${firstName} ${lastName}`.trim() || email.split("@")[0] || "Richard";
    registerUser(displayName);
    setShowUserLogin(false);
    toast.success(isLogin ? "Signed in" : "Account created");
  };

  const continueWithGoogle = () => {
    registerUser("Richard");
    setShowUserLogin(false);
    toast.success("Signed in with Google");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="auth-modal relative w-full max-w-[400px] overflow-hidden rounded-xl">
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute right-6 top-3 text-2xl leading-none text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>

        <form onSubmit={onSubmitHandler} className="px-7 pb-4 pt-6">
          <h1 className="text-center text-[16px] font-bold text-gray-900">
            {isLogin ? "Sign in to Job Portal" : "Create your account"}
          </h1>
          <p className="mt-0.5 text-center text-[12px] text-gray-500">
            {isLogin
              ? "Welcome back! Please sign in to continue"
              : "Welcome! Please fill in the details to get started."}
          </p>

          <button
            type="button"
            onClick={continueWithGoogle}
            className="auth-google mt-4 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[13px] font-medium"
          >
            <img className="h-4 w-4" src={assets.google_logo} alt="" />
            Continue with Google
          </button>

          <div className="my-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-[12px] text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {!isLogin && (
            <div className="mb-3 flex gap-3">
              <div className="flex-1">
                <div className="mb-1 flex items-baseline justify-between">
                  <label className="text-[12px] font-medium text-gray-800">First name</label>
                  <span className="text-[10px] text-gray-400">Optional</span>
                </div>
                <input
                  className="auth-field w-full rounded-md px-3 py-1.5 text-[13px] outline-none placeholder:text-gray-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-baseline justify-between">
                  <label className="text-[12px] font-medium text-gray-800">Last name</label>
                  <span className="text-[10px] text-gray-400">Optional</span>
                </div>
                <input
                  className="auth-field w-full rounded-md px-3 py-1.5 text-[13px] outline-none placeholder:text-gray-400"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="mb-1 block text-[12px] font-medium text-gray-800">
              Email address
            </label>
            <input
              className="auth-field w-full rounded-md px-3 py-1.5 text-[13px] outline-none placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="mb-1 block text-[12px] font-medium text-gray-800">Password</label>
              <div className="relative">
                <input
                  className="auth-field w-full rounded-md px-3 py-1.5 pr-9 text-[13px] outline-none placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
          )}

          <button
            type="submit"
            className="auth-continue mt-1 flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[13px] font-medium"
          >
            Continue
            <span className="text-[10px]">&#9654;</span>
          </button>
        </form>

        <div className="auth-switch border-t border-gray-100 py-2 text-center text-[12px] text-gray-500">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Sign Up")}
                className="font-medium text-gray-900 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Login")}
                className="font-medium text-gray-900 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        <AuthFooter />
      </div>
    </div>
  );
};

export default UserLogin;
