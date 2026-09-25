import { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    toast.success("Message sent. We will get back to you in this demo.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">Contact</p>
        <h1 className="mt-1 text-3xl font-semibold">Talk to the InsiderJobs team</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Questions about hiring, applying, or this demo? Send a message.
        </p>
        <form onSubmit={onSubmit} className="surface-card mt-6 max-w-xl space-y-4 p-5">
          <label className="block text-sm">
            Name
            <input
              className="form-field mt-1 w-full rounded px-3 py-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            Email
            <input
              type="email"
              className="form-field mt-1 w-full rounded px-3 py-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            Message
            <textarea
              className="form-field mt-1 min-h-32 w-full rounded px-3 py-2"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn-blue rounded px-6 py-2.5 text-sm font-medium text-white">
            Send message
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
