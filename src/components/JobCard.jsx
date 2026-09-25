import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompanyLogo } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const {
    user,
    setAppliedJobs,
    appliedJobs,
    theme,
    savedJobIds,
    toggleSavedJob,
  } = useAppContext();
  const isSaved = savedJobIds.includes(job._id);

  const applyNow = () => {
    if (!user) {
      toast.info("Login first to apply for jobs");
      return;
    }
    const alreadyApplied = appliedJobs.some(
      (item) => item.title === job.title && item.company === job.companyId.name
    );
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

  return (
    <div className="job-card relative flex h-full flex-col p-3">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(`/companies/${encodeURIComponent(job.companyId.name)}`)}
          aria-label={`View ${job.companyId.name}`}
        >
          <img
            className={`company-logo${
              job.companyId.name === "Amazon"
                ? " company-logo-amazon"
                : job.companyId.name === "Walmart"
                  ? " company-logo-walmart"
                  : job.companyId.name === "Microsoft"
                    ? " company-logo-wide"
                    : ""
            }`}
            src={getCompanyLogo(job.companyId.name, job.companyId.image, theme)}
            alt={job.companyId.name}
          />
        </button>
        <button
          type="button"
          className={`save-job-btn${isSaved ? " is-saved" : ""}`}
          onClick={() => toggleSavedJob(job._id)}
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          title={isSaved ? "Saved" : "Save job"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21V4.8Z" />
          </svg>
        </button>
      </div>
      <h4 className="mt-3 line-clamp-1 text-lg font-medium">{job.title}</h4>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="location-tag rounded bg-blue-50 px-3 py-1 text-blue-600">
          {job.location}
        </span>
        <span className="level-tag rounded px-3 py-1 text-orange-500">
          {job.level}
        </span>
        {job.workMode && <span className="meta-tag rounded px-3 py-1">{job.workMode}</span>}
        {job.salary >= 100000 && <span className="hot-badge">Hot</span>}
      </div>
      <p
        className="mt-3 line-clamp-2 min-h-[40px] flex-1 text-sm leading-5 text-gray-500"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 120),
        }}
      />
      <div className="mt-auto flex gap-3 pt-4 text-sm">
        <button
          onClick={applyNow}
          className="job-card-btn btn-blue rounded px-4 py-2 text-white"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="job-card-btn rounded px-4 py-2 text-primary"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
