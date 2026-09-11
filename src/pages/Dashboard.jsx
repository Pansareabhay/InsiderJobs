import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import Logo from "../components/Logo.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, logoutRecruiter } = useAppContext();

  return (
    <div className="min-h-screen">
      <div className="app-header py-4">
        <div className="px-5 flex justify-between items-center">
          <Logo onClick={() => navigate("/")} className="max-sm:w-32 cursor-pointer" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {companyData && (
              <>
                <p className="max-sm:hidden">Hi, {companyData.name}</p>
                <div className="relative group">
                  <img
                    className="h-9 w-9 rounded-full border object-cover"
                    src={assets.profile_img}
                    alt="profile"
                  />
                  <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm shadow">
                      <li
                        onClick={() => {
                          logoutRecruiter();
                          navigate("/");
                        }}
                        className="py-1 px-2 cursor-pointer pr-10"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <div className="app-sidebar inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4.2l1.6 1.6H18.5A2.5 2.5 0 0 1 21 9.1v8.4a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z" fill="#F5B400" />
                <path d="M3 10h18v7.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5V10Z" fill="#E09A00" />
              </svg>
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/add-job"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#8A8A8E">
                <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
              </svg>
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/view-applications"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#3B82F6">
                <circle cx="12" cy="8" r="3.4" />
                <path d="M5.2 19.2c.7-3.2 3.5-5.2 6.8-5.2s6.1 2 6.8 5.2A10 10 0 0 1 12 21a10 10 0 0 1-6.8-1.8Z" />
              </svg>
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
