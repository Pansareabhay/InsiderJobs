import { useEffect, useState } from "react";
import { JobCategories, JobLocations, assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import JobCard from "./JobCard.jsx";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useAppContext();
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [workMode, setWorkMode] = useState("");
  const [jobType, setJobType] = useState("");
  const [minimumSalary, setMinimumSalary] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const jobsPerPage = 6;

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase()) ||
      job.category.toLowerCase() === searchFilter.title.toLowerCase();
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
    const matchesWorkMode = (job) => workMode === "" || job.workMode === workMode;
    const matchesJobType = (job) => jobType === "" || job.jobType === jobType;
    const matchesSalary = (job) => job.salary >= minimumSalary;

    const nextJobs = jobs
      .slice()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job) &&
          matchesWorkMode(job) &&
          matchesJobType(job) &&
          matchesSalary(job)
      )
      .sort((a, b) => {
        if (sortBy === "salary") return b.salary - a.salary;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return b.date - a.date;
      });
    setFilteredJobs(nextJobs);
    setCurrentPage(1);
  }, [
    jobs,
    selectedCategories,
    selectedLocations,
    searchFilter,
    workMode,
    jobType,
    minimumSalary,
    sortBy,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((item) => item !== location) : [...prev, location]
    );
  };

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  return (
    <div className="container mx-auto grid grid-cols-1 items-stretch gap-3 py-8 pb-0 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="flex h-full w-full flex-col">
        <button
          onClick={() => setShowFilter((open) => !open)}
          className="mb-4 px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        <div className={`flex h-full min-h-0 flex-col gap-3 ${showFilter ? "" : "max-lg:hidden"}`}>
          {isSearched && (searchFilter.title || searchFilter.location) && (
            <div className="surface-card shrink-0 rounded-none p-3">
              <h3 className="text-lg font-medium leading-6">Current Search</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 rounded bg-blue-50 px-3 py-1.5">
                    {searchFilter.title}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                      className="icon-adaptive cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 rounded bg-red-50 px-3 py-1.5">
                    {searchFilter.location}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                      className="icon-adaptive cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="grid min-h-0 flex-1 gap-3">
            <div className="surface-card rounded-none p-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-medium leading-6">More filters</h4>
                {(workMode || jobType || minimumSalary > 0) && (
                  <button
                    type="button"
                    className="text-xs font-medium text-primary"
                    onClick={() => {
                      setWorkMode("");
                      setJobType("");
                      setMinimumSalary(0);
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-3">
                <label className="block text-xs font-medium text-gray-500">
                  Work mode
                  <select
                    className="filter-select mt-1 w-full rounded px-3 py-2 text-sm"
                    value={workMode}
                    onChange={(event) => setWorkMode(event.target.value)}
                  >
                    <option value="">Any work mode</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-gray-500">
                  Job type
                  <select
                    className="filter-select mt-1 w-full rounded px-3 py-2 text-sm"
                    value={jobType}
                    onChange={(event) => setJobType(event.target.value)}
                  >
                    <option value="">Any job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-gray-500">
                  Minimum salary
                  <select
                    className="filter-select mt-1 w-full rounded px-3 py-2 text-sm"
                    value={minimumSalary}
                    onChange={(event) => setMinimumSalary(Number(event.target.value))}
                  >
                    <option value={0}>Any salary</option>
                    <option value={60000}>$60k+</option>
                    <option value={80000}>$80k+</option>
                    <option value={100000}>$100k+</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="surface-card flex h-full flex-col overflow-hidden rounded-none p-3">
              <h4 className="text-lg font-medium leading-6">Search by Categories</h4>
              <ul className="mt-3 space-y-3 text-gray-600">
                {JobCategories.map((category, index) => (
                  <li className="flex h-6 items-center gap-2 text-sm leading-none" key={index}>
                    <input
                      className="h-4 w-4 shrink-0"
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card flex h-full flex-col overflow-hidden rounded-none p-3">
              <h4 className="text-lg font-medium leading-6">Search by Location</h4>
              <ul className="mt-3 space-y-3 text-gray-600">
                {JobLocations.map((location, index) => (
                  <li className="flex h-6 items-center gap-2 text-sm leading-none" key={index}>
                    <input
                      className="h-4 w-4 shrink-0"
                      type="checkbox"
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                    />
                    <span>{location}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <section className="surface-card min-w-0 w-full rounded-none p-3 text-gray-800">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-medium leading-6" id="job-list">
            Latest jobs
          </h3>
          <div className="flex items-center gap-3">
            <select
              className="filter-select rounded px-2 py-1 text-xs"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="salary">Salary</option>
              <option value="title">Title</option>
            </select>
            <span className="text-xs text-gray-500">{filteredJobs.length} results</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">Get your desired job from top companies</p>
        <div className="mt-3 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredJobs
            .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
            <div className="empty-state-icon">⌕</div>
            <h4 className="mt-4 text-lg font-medium">No matching jobs</h4>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Try a different salary, work mode, category, or location.
            </p>
          </div>
        )}

        {filteredJobs.length > 0 && (
          <nav className="pagination mt-6" aria-label="Job list pages">
            <button
              type="button"
              className="pagination-btn pagination-arrow"
              disabled={currentPage === 1}
              aria-label="Previous page"
              onClick={() => {
                setCurrentPage((page) => Math.max(page - 1, 1));
                document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg className="pagination-arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10.2 3.2 5.4 8l4.8 4.8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pagination-pages">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`pagination-btn${currentPage === index + 1 ? " is-active" : ""}`}
                aria-current={currentPage === index + 1 ? "page" : undefined}
                onClick={() => {
                  setCurrentPage(index + 1);
                  document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {index + 1}
              </button>
            ))}
            </div>
            <button
              type="button"
              className="pagination-btn pagination-arrow"
              disabled={currentPage === totalPages}
              aria-label="Next page"
              onClick={() => {
                setCurrentPage((page) => Math.min(page + 1, totalPages));
                document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <svg className="pagination-arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5.8 3.2 10.6 8l-4.8 4.8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        )}
      </section>
    </div>
  );
};

export default JobListing;
