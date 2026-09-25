import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getCompanyLogo } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const CompanyProfile = () => {
  const { name = "" } = useParams();
  const companyName = decodeURIComponent(name);
  const { jobs, theme } = useAppContext();
  const companyJobs = useMemo(
    () => jobs.filter((job) => job.companyId.name === companyName),
    [companyName, jobs]
  );
  const company = companyJobs[0]?.companyId;

  if (!company) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto min-h-[70vh] py-20 text-center">
          <h1 className="text-2xl font-semibold">Company not found</h1>
          <Link className="mt-4 inline-flex text-primary" to="/companies">
            Browse companies
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const locations = [...new Set(companyJobs.map((job) => job.location))];

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <section className="company-hero surface-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="company-profile-logo">
              <img
                className={company.name === "Amazon" ? "company-logo-amazon" : ""}
                src={getCompanyLogo(company.name, company.image, theme)}
                alt={company.name}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">Company profile</p>
              <h1 className="mt-1 text-3xl font-semibold">{company.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                {company.name} is hiring people who enjoy solving meaningful problems,
                learning quickly, and building products used by customers around the world.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="meta-tag rounded px-3 py-1.5">
                  {companyJobs.length} open roles
                </span>
                <span className="meta-tag rounded px-3 py-1.5">
                  {locations.length} locations
                </span>
                <span className="meta-tag rounded px-3 py-1.5">Technology</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Open roles</h2>
              <p className="mt-1 text-sm text-gray-500">
                Opportunities currently available at {company.name}
              </p>
            </div>
            <Link className="text-sm font-medium text-primary" to="/companies">
              All companies
            </Link>
          </div>
          <div className="mt-5 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CompanyProfile;
