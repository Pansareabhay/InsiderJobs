import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecruiterLogin from "./components/RecruiterLogin.jsx";
import UserLogin from "./components/UserLogin.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import AddJob from "./pages/AddJob.jsx";
import Applications from "./pages/Applications.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Companies from "./pages/Companies.jsx";
import CompanyProfile from "./pages/CompanyProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import ManageJobs from "./pages/ManageJobs.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import JobAlerts from "./pages/JobAlerts.jsx";
import Settings from "./pages/Settings.jsx";
import ViewApplications from "./pages/ViewApplications.jsx";

const App = () => {
  const { showRecruiterLogin, showUserLogin, theme } = useAppContext();

  return (
    <div className="page-shell min-h-screen">
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserLogin && <UserLogin />}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/job-alerts" element={<JobAlerts />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:name" element={<CompanyProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ManageJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
