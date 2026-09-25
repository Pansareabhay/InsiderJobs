import { JobCategories } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import JobCard from "./JobCard.jsx";

const steps = [
  {
    number: "01",
    title: "Discover the right role",
    text: "Search by skill and location, then refine results with practical filters.",
  },
  {
    number: "02",
    title: "Save and compare",
    text: "Build a shortlist of opportunities before choosing where to apply.",
  },
  {
    number: "03",
    title: "Apply with confidence",
    text: "Review the full job description and keep track of every application.",
  },
];

const HomeHighlights = () => {
  const navigate = useNavigate();
  const { jobs, setSearchFilter, setIsSearched } = useAppContext();
  const featuredJobs = [...jobs]
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 3);

  return (
    <>
      <section className="container mx-auto py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Handpicked opportunities</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Featured jobs</h2>
            <p className="mt-2 text-sm text-gray-500">
              High-value roles from companies actively hiring.
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-primary"
            onClick={() => document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" })}
          >
            Browse all jobs →
          </button>
        </div>
        <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {JobCategories.map((category) => (
            <button
              key={category}
              type="button"
              className="meta-tag rounded px-3 py-1.5 text-sm"
              onClick={() => {
                setSearchFilter({ title: category, location: "" });
                setIsSearched(true);
                document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <div className="container mx-auto py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Simple and focused</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
              Your next role in three steps
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="step-card surface-card p-5">
                <span className="step-number">{step.number}</span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/companies")}
              className="btn-blue rounded px-6 py-2.5 text-sm font-medium text-white"
            >
              Explore companies
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHighlights;
