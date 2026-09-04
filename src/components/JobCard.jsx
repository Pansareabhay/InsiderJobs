import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompanyLogo } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { user, setAppliedJobs, appliedJobs, theme } = useAppContext();

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
    <div className="job-card flex h-full flex-col p-3">
      <img
        className={`company-logo${
          job.companyId.name === "Amazon"
            ? " company-logo-sm"
            : job.companyId.name === "Walmart"
              ? " company-logo-walmart"
              : job.companyId.name === "Microsoft"
                ? " company-logo-wide"
                : ""
        }`}
        src={getCompanyLogo(job.companyId.name, job.companyId.image, theme)}
        alt={job.companyId.name}
      />
      <h4 className="mt-3 line-clamp-1 text-lg font-medium">{job.title}</h4>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="location-tag rounded bg-blue-50 px-3 py-1 text-blue-600">
          {job.location}
        </span>
        <span className="level-tag rounded px-3 py-1 text-orange-500">
          {job.level}
        </span>
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
