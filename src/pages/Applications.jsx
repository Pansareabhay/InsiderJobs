import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { assets, getCompanyLogo } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Applications = () => {
  const { appliedJobs, setAppliedJobs, user, theme } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const fileRef = useRef(null);

  const statusClass = {
    Pending: "text-blue-600",
    Rejected: "text-red-500",
    Accepted: "text-green-600",
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[70vh] my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3 flex-wrap">
          {isEdit || !resume ? (
            <>
              <label className="flex items-center gap-2" htmlFor="resumeUpload">
                <p className="resume-select flex h-8 items-center px-3 text-sm rounded-none">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  ref={fileRef}
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <span
                  className="resume-upload inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-none leading-none"
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 17.5A4.5 4.5 0 0 1 8.4 8.6 6 6 0 0 1 19.2 10 3.8 3.8 0 0 1 18 17.5H8z" />
                    <path d="M12 15.2V10.2" />
                    <path d="m9.7 12.3 2.3-2.3 2.3 2.3" />
                  </svg>
                </span>
              </label>
              <button
                onClick={() => {
                  if (!resume) {
                    toast.info("Choose a PDF resume first");
                    return;
                  }
                  setIsEdit(false);
                  toast.success("Resume saved");
                }}
                className="resume-save flex h-8 items-center rounded-none px-3 text-sm"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button className="resume-select flex h-8 items-center px-3 text-sm rounded-none">
                Preview
              </button>
              <button
                onClick={() => setIsEdit(true)}
                className="resume-edit flex h-8 items-center text-gray-500 rounded-none px-3 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setResume(null);
                  toast.success("Resume deleted");
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-none bg-primary text-white"
              >
                <img className="invert h-5 w-5" src={assets.delete_icon} alt="Delete"/>
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        {!user && (
          <p className="mb-4 text-sm text-gray-500">
            Login from the header to start applying. Sample applications are shown below.
          </p>
        )}
        <table className="surface-card min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job, index) => (
              <tr key={index}>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                  <span className="company-logo-slot">
                    <img
                      className={`company-logo${
                        job.company === "Amazon"
                          ? " company-logo-sm"
                          : job.company === "Walmart"
                            ? " company-logo-walmart"
                            : job.company === "Microsoft"
                              ? " company-logo-wide"
                              : ""
                      }`}
                      src={getCompanyLogo(job.company, job.logo, theme)}
                      alt={job.company}
                    />
                  </span>
                  <span className="text-sm">{job.company}</span>
                  </div>
                </td>
                <td className="py-2 px-4">{job.title}</td>
                <td className="py-2 px-4 max-sm:hidden">{job.location}</td>
                <td className="py-2 px-4 max-sm:hidden">{job.date}</td>
                <td className="py-2 px-4">
                  <span className={`${statusClass[job.status]} font-medium`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appliedJobs.length > 0 && (
          <button
            onClick={() => setAppliedJobs([])}
            className="mt-4 text-sm text-gray-700"
          >
            Clear applications
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;
