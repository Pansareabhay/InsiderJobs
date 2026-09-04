import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JobCategories, JobLocations, assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const AddJob = () => {
  const navigate = useNavigate();
  const { setJobs, setManageJobs } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newJob = {
      _id: Date.now().toString(),
      title,
      location,
      level,
      category,
      salary: Number(salary),
      date: Date.now(),
      description: `<p>${description}</p>`,
      companyId: {
        _id: "company-1",
        name: "InsiderJobs",
        email: "recruiter@demo.com",
        image: assets.company_icon,
      },
    };

    setJobs((prev) => [newJob, ...prev]);
    setManageJobs((prev) => [
      {
        _id: Date.now(),
        title,
        date: Date.now(),
        location,
        applicants: 0,
        visible: true,
      },
      ...prev,
    ]);
    toast.success("Job posted");
    navigate("/dashboard/manage-jobs");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-3"
    >
      <div className="w-full max-w-xl">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="form-field w-full px-3 py-2 rounded"
        />
      </div>
      <div className="w-full max-w-xl">
        <p className="my-2">Job Description</p>
        <textarea
          className="form-field w-full px-3 py-2 rounded min-h-40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="min-w-[10.5rem] flex-1">
          <p className="mb-2">Job Category</p>
          <div className="form-field form-select-wrap w-full rounded">
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="min-w-[10.5rem] flex-1">
          <p className="mb-2">Job Location</p>
          <div className="form-field form-select-wrap w-full rounded">
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="min-w-[10.5rem] flex-1">
          <p className="mb-2">Job Level</p>
          <div className="form-field form-select-wrap w-full rounded">
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl">
        <p className="mb-2">Job Salary</p>
        <input
          min={0}
          className="form-field w-full max-w-[140px] px-3 py-2 rounded"
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          placeholder="2500"
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white rounded">ADD</button>
    </form>
  );
};

export default AddJob;
