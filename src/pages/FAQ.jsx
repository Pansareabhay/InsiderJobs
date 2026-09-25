import { useState } from "react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const faqs = [
  {
    q: "Do I need an account to apply?",
    a: "Yes. Use Login in the header to create a demo job-seeker session, then apply from any job card.",
  },
  {
    q: "How do recruiters post jobs?",
    a: "Open Recruiter Login, then use Add Job in the dashboard. Visibility can be toggled from Manage Jobs.",
  },
  {
    q: "Are job alerts real emails?",
    a: "No. Alerts are stored in this browser so you can replay a search later. This project is a frontend demo.",
  },
  {
    q: "Can I save jobs for later?",
    a: "Use the bookmark on a job card. Saved jobs stay in this browser until you clear them.",
  },
  {
    q: "Is resume upload stored on a server?",
    a: "The file stays in the browser session only. Preview and delete are demo actions.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">Help center</p>
        <h1 className="mt-1 text-3xl font-semibold">Frequently asked questions</h1>
        <div className="mt-6 space-y-3">
          {faqs.map((item, index) => (
            <article key={item.q} className="surface-card">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <h2 className="font-medium">{item.q}</h2>
                <span className="text-primary">{open === index ? "−" : "+"}</span>
              </button>
              {open === index && (
                <p className="px-4 pb-4 text-sm leading-6 text-gray-500">{item.a}</p>
              )}
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
