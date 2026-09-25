import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import JobAlertForm from "../components/JobAlertForm.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const JobAlerts = () => {
  const navigate = useNavigate();
  const { jobAlerts, removeJobAlert, jobs, setSearchFilter, setIsSearched } = useAppContext();

  const matchCount = (alert) =>
    jobs.filter((job) => {
      const titleOk =
        !alert.title || job.title.toLowerCase().includes(alert.title.toLowerCase());
      const locationOk =
        !alert.location || job.location.toLowerCase().includes(alert.location.toLowerCase());
      return titleOk && locationOk;
    }).length;

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">Stay notified</p>
        <h1 className="mt-1 text-3xl font-semibold">Job alerts</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Save a search and we will show matching demo jobs whenever you come back.
        </p>

        <div className="mt-6">
          <JobAlertForm />
        </div>

        <section className="mt-8">
          {jobAlerts.length > 0 ? (
            <div className="space-y-3">
              {jobAlerts.map((alert) => (
                <article key={alert.id} className="surface-card flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <h2 className="font-medium">
                      {alert.title || "Any role"}
                      <span className="text-gray-500"> · {alert.location || "Any location"}</span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {matchCount(alert)} matching jobs right now
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="job-card-btn rounded px-4 py-2 text-sm text-primary"
                      onClick={() => {
                        setSearchFilter({
                          title: alert.title,
                          location: alert.location,
                        });
                        setIsSearched(true);
                        navigate("/");
                      }}
                    >
                      View jobs
                    </button>
                    <button
                      type="button"
                      className="job-card-btn rounded px-4 py-2 text-sm text-red-500"
                      onClick={() => removeJobAlert(alert.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-card flex min-h-48 flex-col items-center justify-center p-8 text-center">
              <div className="empty-state-icon">!</div>
              <h2 className="mt-4 text-xl font-medium">No alerts yet</h2>
              <p className="mt-2 max-w-md text-sm text-gray-500">
                Create one above for a title, a city, or both.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default JobAlerts;
