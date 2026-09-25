import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jobsApplied, jobsData, manageJobsData, viewApplicationsPageData } from "../assets/assets.js";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(localStorage.getItem("companyToken") || "");
  const [companyData, setCompanyData] = useState(
    JSON.parse(localStorage.getItem("companyData") || "null")
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [appliedJobs, setAppliedJobs] = useState(jobsApplied);
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedJobIds") || "[]");
    } catch {
      return [];
    }
  });
  const [jobAlerts, setJobAlerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("jobAlerts") || "[]");
    } catch {
      return [];
    }
  });
  const [manageJobs, setManageJobs] = useState(
    manageJobsData.map((job) => ({ ...job, visible: true }))
  );
  const [applicants, setApplicants] = useState(
    viewApplicationsPageData.map((item) => ({ ...item, status: "Pending" }))
  );

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  useEffect(() => {
    localStorage.setItem("savedJobIds", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem("jobAlerts", JSON.stringify(jobAlerts));
  }, [jobAlerts]);

  const toggleSavedJob = (jobId) => {
    setSavedJobIds((current) =>
      current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId]
    );
  };

  const addJobAlert = (alert) => {
    const nextAlert = {
      id: Date.now().toString(),
      title: alert.title.trim(),
      location: alert.location.trim(),
      createdAt: new Date().toISOString(),
    };
    setJobAlerts((current) => [nextAlert, ...current]);
    return nextAlert;
  };

  const removeJobAlert = (alertId) => {
    setJobAlerts((current) => current.filter((item) => item.id !== alertId));
  };

  const loginRecruiter = (email) => {
    const data = { name: email.split("@")[0] || "Recruiter", email };
    setCompanyToken("demo-token");
    setCompanyData(data);
    localStorage.setItem("companyToken", "demo-token");
    localStorage.setItem("companyData", JSON.stringify(data));
  };

  const logoutRecruiter = () => {
    setCompanyToken("");
    setCompanyData(null);
    localStorage.removeItem("companyToken");
    localStorage.removeItem("companyData");
  };

  const registerUser = (name) => {
    const nextUser = { name };
    setUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({
      searchFilter,
      setSearchFilter,
      isSearched,
      setIsSearched,
      jobs,
      setJobs,
      showRecruiterLogin,
      setShowRecruiterLogin,
      showUserLogin,
      setShowUserLogin,
      companyToken,
      companyData,
      loginRecruiter,
      logoutRecruiter,
      user,
      registerUser,
      logoutUser,
      appliedJobs,
      setAppliedJobs,
      savedJobIds,
      toggleSavedJob,
      jobAlerts,
      addJobAlert,
      removeJobAlert,
      manageJobs,
      setManageJobs,
      applicants,
      setApplicants,
      theme,
      toggleTheme,
    }),
    [
      searchFilter,
      isSearched,
      jobs,
      showRecruiterLogin,
      showUserLogin,
      companyToken,
      companyData,
      user,
      appliedJobs,
      savedJobIds,
      jobAlerts,
      manageJobs,
      applicants,
      theme,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return context;
};
