import { useNavigate } from "react-router-dom";
import { getCompanyLogo } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Companies = () => {
  const navigate = useNavigate();
  const { jobs, theme } = useAppContext();
  const companies = Array.from(
    jobs.reduce((map, job) => {
      const name = job.companyId.name;
      const current = map.get(name);
      map.set(name, {
        name,
        image: job.companyId.image,
        openings: (current?.openings || 0) + 1,
        locations: new Set([...(current?.locations || []), job.location]),
      });
      return map;
    }, new Map()).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">Explore employers</p>
        <h1 className="mt-1 text-3xl font-semibold">Top companies hiring now</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Learn about leading employers and browse every open role in one place.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company) => (
            <button
              key={company.name}
              type="button"
              onClick={() => navigate(`/companies/${encodeURIComponent(company.name)}`)}
              className="company-card surface-card p-5 text-left"
            >
              <div className="company-logo-panel">
                <img
                  className={company.name === "Amazon" ? "company-logo-amazon" : ""}
                  src={getCompanyLogo(company.name, company.image, theme)}
                  alt={company.name}
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{company.name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {company.openings} open {company.openings === 1 ? "role" : "roles"}
              </p>
              <p className="mt-3 line-clamp-1 text-xs text-gray-500">
                {Array.from(company.locations).join(" · ")}
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-primary">
                View company →
              </span>
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Companies;
