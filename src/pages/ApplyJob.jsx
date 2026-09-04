import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, user, appliedJobs, setAppliedJobs } = useAppContext();

  const job = useMemo(() => jobs.find((item) => item._id === id), [jobs, id]);
  const moreJobs = useMemo(
    () => jobs.filter((item) => item._id !== id).slice(0, 3),
    [jobs, id]
  );

  if (!job) {
    return (
      <div>
        <Navbar />
        <p className="py-20 text-center">Job not found.</p>
      </div>
    );
  }

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

  const kFormatter = (num) => `${Math.round(num / 1000)}k`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container mx-auto">
        <div className="bg-sky-50 border border-sky-400 rounded-xl w-full p-6 sm:p-8">
          <div className="flex justify-between flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <img
                className="logo-tile h-20 bg-white rounded-lg p-4 border"
                src={job.companyId.image}
                alt=""
              />
              <div>
                <h1 className="text-2xl font-medium sm:text-3xl">{job.title}</h1>
                <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <img className="icon-adaptive" src={assets.suitcase_icon} alt="" />
                    {job.companyId.name}
                  </span>
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
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyNow}
                className="bg-primary p-2.5 px-10 text-white rounded"
              >
                Apply now
              </button>
              <p className="mt-1 text-gray-600">Posted 25 mins ago</p>
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
              className="bg-primary p-2.5 px-10 text-white rounded mt-10"
            >
              Apply now
            </button>
          </div>
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="font-bold text-xl">More jobs from {job.companyId.name}</h2>
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
