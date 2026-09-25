import { useState } from "react";
import { toast } from "react-toastify";
import { JobLocations } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const JobAlertForm = ({ defaultTitle = "", defaultLocation = "" }) => {
  const { addJobAlert } = useAppContext();
  const [title, setTitle] = useState(defaultTitle);
  const [location, setLocation] = useState(defaultLocation);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() && !location.trim()) {
      toast.info("Add a job title or location first");
      return;
    }
    addJobAlert({ title, location });
    toast.success("Job alert created");
    setTitle("");
    setLocation("");
  };

  return (
    <form onSubmit={onSubmit} className="job-alert-form surface-card p-5">
      <p className="text-sm font-medium text-primary">Stay ahead</p>
      <h3 className="mt-1 text-lg font-semibold">Create a job alert</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get a demo notification when matching roles appear.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          className="form-field rounded px-3 py-2 text-sm"
          placeholder="Role, e.g. React Developer"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="form-field form-select-wrap rounded">
          <select
            className="w-full px-3 py-2 text-sm"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <option value="">Any location</option>
            {JobLocations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-blue rounded px-5 py-2 text-sm font-medium text-white">
          Create alert
        </button>
      </div>
    </form>
  );
};

export default JobAlertForm;
