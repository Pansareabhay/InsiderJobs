import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jobsApplied, jobsData, manageJobsData, viewApplicationsPageData } from "../assets/assets.js";

const AppContext = createContext(null);

const readSessionJson = (key, fallback) => {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(sessionStorage.getItem("companyToken") || "");
  const [companyData, setCompanyData] = useState(() => readSessionJson("companyData", null));
  const [user, setUser] = useState(() => readSessionJson("user", null));
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

  // Drop leftover login from previous visits so closing the site logs out.
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("companyToken");
    localStorage.removeItem("companyData");
  }, []);

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
    sessionStorage.setItem("companyToken", "demo-token");
    sessionStorage.setItem("companyData", JSON.stringify(data));
  };

  const logoutRecruiter = () => {
    setCompanyToken("");
    setCompanyData(null);
    sessionStorage.removeItem("companyToken");
    sessionStorage.removeItem("companyData");
  };

  const registerUser = (name, email = "") => {
    const nextUser = { name, email };
    setUser(nextUser);
    sessionStorage.setItem("user", JSON.stringify(nextUser));
  };

  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const updateUser = (patch) => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      sessionStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const updateCompanyData = (patch) => {
    setCompanyData((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      sessionStorage.setItem("companyData", JSON.stringify(next));
      return next;
    });
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
      updateUser,
      updateCompanyData,
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
