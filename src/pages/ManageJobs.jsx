import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext.jsx";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { manageJobs, setManageJobs } = useAppContext();

  const toggleVisible = (id) => {
    setManageJobs((prev) =>
      prev.map((job) => (job._id === id ? { ...job, visible: !job.visible } : job))
    );
  };

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-center">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobs.map((job, index) => (
              <tr key={job._id} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {new Date(job.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                    onChange={() => toggleVisible(job._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            toast.info("Open the Add Job form to post a new role");
            navigate("/dashboard/add-job");
          }}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
