import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">About InsiderJobs</p>
        <h1 className="mt-1 text-3xl font-semibold">Built to make hiring simpler</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
          InsiderJobs is a demo job portal for candidates and recruiters. Search roles,
          save a shortlist, apply in a few clicks, and manage openings from one dashboard.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "For job seekers", text: "Discover roles, compare companies, and track every application." },
            { title: "For recruiters", text: "Post jobs, review applicants, and keep hiring organized." },
            { title: "Designed for speed", text: "Clean filters, saved jobs, and alerts keep the process focused." },
          ].map((item) => (
            <article key={item.title} className="surface-card p-5">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="btn-blue mt-8 rounded px-6 py-2.5 text-sm font-medium text-white"
          onClick={() => toast.info("This is a frontend demo. No backend is connected yet.")}
        >
          Learn how the demo works
        </button>
      </main>
      <Footer />
    </>
  );
};

export default About;
