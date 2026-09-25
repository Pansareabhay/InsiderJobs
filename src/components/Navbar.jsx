import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    setShowRecruiterLogin,
    setShowUserLogin,
    user,
    logoutUser,
    companyData,
    logoutRecruiter,
  } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const navLinks = (
    <>
      <Link to="/" onClick={() => setShowNav(false)}>Jobs</Link>
      <Link to="/companies" onClick={() => setShowNav(false)}>Companies</Link>
      <Link to="/saved-jobs" onClick={() => setShowNav(false)}>Saved Jobs</Link>
      <Link to="/job-alerts" onClick={() => setShowNav(false)}>Job Alerts</Link>
      <Link to="/about" onClick={() => setShowNav(false)}>About</Link>
    </>
  );

  return (
    <header className="app-header">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Logo onClick={() => navigate("/")} className="h-8 cursor-pointer sm:h-9" />
        <nav className="hidden items-center gap-5 text-sm text-gray-600 md:flex">
          {navLinks}
        </nav>
        <div className="flex items-center gap-3">
        <button
          type="button"
          className="md:hidden rounded px-2 py-1 text-lg"
          onClick={() => setShowNav((open) => !open)}
          aria-label="Open menu"
        >
          {showNav ? "✕" : "☰"}
        </button>
        {companyData ? (
          <div className="relative flex items-center gap-4">
            <ThemeToggle />
            <Link to="/dashboard/manage-jobs" className="hidden text-sm text-gray-600 sm:block">
              Dashboard
            </Link>
            <p className="hidden max-sm:hidden text-gray-700">Hi, {companyData.name}</p>
            <button onClick={() => setShowMenu((open) => !open)} className="rounded-full">
              <img
                className="h-9 w-9 rounded-full border object-cover"
                src={companyData.avatar || assets.profile_img}
                alt="profile"
              />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 z-20 w-40 rounded-md border bg-white py-2 shadow-lg">
                <button
                  onClick={() => {
                    navigate("/dashboard/manage-jobs");
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    logoutRecruiter();
                    setShowMenu(false);
                    navigate("/");
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : user ? (
          <div className="relative flex items-center gap-4">
            <ThemeToggle />
            <Link to="/applications" className="hidden text-sm text-gray-600 sm:block">
              Applied Jobs
            </Link>
            <p className="hidden max-sm:hidden text-gray-700">Hi, {user.name}</p>
            <button onClick={() => setShowMenu((open) => !open)} className="rounded-full">
              <img
                className="h-9 w-9 rounded-full border object-cover"
                src={user.avatar || assets.profile_img}
                alt="profile"
              />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 z-20 w-40 rounded-md border bg-white py-2 shadow-lg">
                <button
                  onClick={() => {
                    navigate("/applications");
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    navigate("/job-alerts");
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Job Alerts
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    setShowMenu(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm max-sm:text-xs">
            <ThemeToggle />
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-700"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => setShowUserLogin(true)}
              className="hero-search-btn rounded-3xl px-6 py-2 text-white sm:px-9"
            >
              Login
            </button>
          </div>
        )}
        </div>
      </div>
      {showNav && (
        <div className="container mx-auto flex flex-col gap-3 pb-4 text-sm text-gray-600 md:hidden">
          {navLinks}
        </div>
      )}
    </header>
  );
};

export default Navbar;
