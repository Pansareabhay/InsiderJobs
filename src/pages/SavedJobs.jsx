import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const SavedJobs = () => {
  const { jobs, savedJobIds } = useAppContext();
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job._id));

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Your shortlist</p>
            <h1 className="mt-1 text-3xl font-semibold">Saved jobs</h1>
            <p className="mt-2 text-sm text-gray-500">
              Keep interesting roles together and apply when you are ready.
            </p>
          </div>
          <span className="rounded bg-blue-50 px-3 py-1.5 text-sm text-blue-600">
            {savedJobs.length} saved
          </span>
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="surface-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="empty-state-icon">♡</div>
            <h2 className="mt-4 text-xl font-medium">No saved jobs yet</h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Select the bookmark on any job card to build your shortlist.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedJobs;
