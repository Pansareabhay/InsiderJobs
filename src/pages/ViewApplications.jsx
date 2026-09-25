import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const ViewApplications = () => {
  const { applicants, setApplicants } = useAppContext();
  const [openMenu, setOpenMenu] = useState(null);
  const [query, setQuery] = useState("");

  const visibleApplicants = applicants.filter((item) => {
    const haystack = `${item.name} ${item.jobTitle} ${item.location}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const updateStatus = (id, status) => {
    setApplicants((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status } : item))
    );
    setOpenMenu(null);
    toast.success(`Application ${status.toLowerCase()}`);
  };

  return (
    <div className="container mx-auto py-4">
      <input
        className="form-field mb-4 w-full max-w-sm rounded px-3 py-2 text-sm"
        placeholder="Search applicants"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div>
        <table className="w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleApplicants.map((applicant, index) => (
              <tr key={applicant._id} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicant.imgSrc}
                    alt=""
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">{applicant.jobTitle}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{applicant.location}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Resume download is a demo action");
                    }}
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b relative">
                  {applicant.status !== "Pending" ? (
                    <span
                      className={
                        applicant.status === "Accepted" ? "text-green-600" : "text-red-500"
                      }
                    >
                      {applicant.status}
                    </span>
                  ) : (
                    <div className="relative inline-block text-left">
                      <button
                        className="text-gray-500 text-xl px-2"
                        onClick={() =>
                          setOpenMenu(openMenu === applicant._id ? null : applicant._id)
                        }
                      >
                        ...
                      </button>
                      {openMenu === applicant._id && (
                        <div className="z-10 absolute right-0 md:left-0 top-8 w-32 bg-white border border-gray-200 rounded shadow">
                          <button
                            onClick={() => updateStatus(applicant._id, "Accepted")}
                            className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(applicant._id, "Rejected")}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
