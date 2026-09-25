import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { assets, getCompanyLogo } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import JobAlertForm from "../components/JobAlertForm.jsx";
import JobCard from "../components/JobCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    jobs,
    user,
    appliedJobs,
    setAppliedJobs,
    theme,
    savedJobIds,
    toggleSavedJob,
  } = useAppContext();

  const job = useMemo(() => jobs.find((item) => item._id === id), [jobs, id]);
  const moreJobs = useMemo(() => {
    if (!job) return [];
    const sameCompany = jobs.filter(
      (item) => item._id !== job._id && item.companyId.name === job.companyId.name
    );
    if (sameCompany.length >= 3) return sameCompany.slice(0, 3);
    const extras = jobs.filter(
      (item) => item._id !== job._id && item.companyId.name !== job.companyId.name
    );
    return [...sameCompany, ...extras].slice(0, 3);
  }, [job, jobs]);

  if (!job) {
    return (
      <div>
        <Navbar />
        <p className="py-20 text-center">Job not found.</p>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job._id);
  const isHot = job.salary >= 100000;
  const alreadyApplied = appliedJobs.some(
    (item) => item.title === job.title && item.company === job.companyId.name
  );

  const applyNow = () => {
    if (!user) {
      toast.info("Login first to apply for jobs");
      return;
    }
    if (alreadyApplied) {
      toast.info("You already applied for this job");
      return;
    }
    setAppliedJobs((prev) => [
      {
        company: job.companyId.name,
        title: job.title,
        location: job.location,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Pending",
        logo: job.companyId.image,
      },
      ...prev,
    ]);
    toast.success("Application submitted");
    navigate("/applications");
  };

  const shareJob = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Job link copied");
    } catch {
      toast.info(url);
    }
  };

  const kFormatter = (num) => `${Math.round(num / 1000)}k`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container mx-auto">
        <div className="job-detail-hero surface-card w-full p-6 sm:p-8">
          <div className="flex justify-between flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <Link
                to={`/companies/${encodeURIComponent(job.companyId.name)}`}
                className="logo-tile flex h-20 w-20 items-center justify-center rounded-lg p-4"
              >
                <img
                  className={`${
                    job.companyId.name === "Amazon" ? "max-h-7" : "max-h-12"
                  } max-w-full object-contain`}
                  src={getCompanyLogo(job.companyId.name, job.companyId.image, theme)}
                  alt={job.companyId.name}
                />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-medium sm:text-3xl">{job.title}</h1>
                  {isHot && <span className="hot-badge">Hot</span>}
                </div>
                <Link
                  to={`/companies/${encodeURIComponent(job.companyId.name)}`}
                  className="mt-1 inline-flex text-sm font-medium text-primary"
                >
                  {job.companyId.name}
                </Link>
                <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <img className="icon-adaptive" src={assets.location_icon} alt="" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="icon-adaptive" src={assets.person_icon} alt="" />
                    {job.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="icon-adaptive" src={assets.money_icon} alt="" />
                    CTC: {kFormatter(job.salary)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {job.workMode && <span className="meta-tag rounded px-3 py-1">{job.workMode}</span>}
                  {job.jobType && <span className="meta-tag rounded px-3 py-1">{job.jobType}</span>}
                  <span className="meta-tag rounded px-3 py-1">{job.category}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`save-job-btn${isSaved ? " is-saved" : ""}`}
                  onClick={() => toggleSavedJob(job._id)}
                  aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21V4.8Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="job-card-btn rounded px-4 py-2 text-primary"
                  onClick={shareJob}
                >
                  Share
                </button>
                <button
                  onClick={applyNow}
                  className="btn-blue rounded p-2.5 px-10 text-white"
                >
                  {alreadyApplied ? "Applied" : "Apply now"}
                </button>
              </div>
              <p className="mt-2 text-gray-600">Posted recently · {job.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start mt-10 gap-10">
          <div className="w-full lg:w-2/3">
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
            <button
              onClick={applyNow}
              className="btn-blue rounded p-2.5 px-10 text-white mt-10"
            >
              {alreadyApplied ? "Applied" : "Apply now"}
            </button>
            <div className="mt-10">
              <JobAlertForm defaultTitle={job.title} defaultLocation={job.location} />
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="surface-card p-4">
              <h2 className="font-bold text-lg">Job snapshot</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li>Company: {job.companyId.name}</li>
                <li>Location: {job.location}</li>
                <li>Level: {job.level}</li>
                <li>Type: {job.jobType || "Full-time"}</li>
                <li>Work mode: {job.workMode || "On-site"}</li>
                <li>Salary: ${kFormatter(job.salary)}</li>
              </ul>
            </div>
            <h2 className="font-bold text-xl">
              More jobs from {job.companyId.name}
            </h2>
            {moreJobs.map((item) => (
              <JobCard key={item._id} job={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;
