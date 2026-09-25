import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const MAX_PHOTO_BYTES = 800 * 1024;

const Settings = () => {
  const {
    user,
    companyData,
    updateUser,
    updateCompanyData,
    theme,
    toggleTheme,
    setShowUserLogin,
    setShowRecruiterLogin,
  } = useAppContext();
  const account = companyData || user;
  const isRecruiter = Boolean(companyData);
  const fileInputRef = useRef(null);

  const [name, setName] = useState(account?.name || "");
  const [email, setEmail] = useState(account?.email || "");
  const [phone, setPhone] = useState(account?.phone || "");
  const [location, setLocation] = useState(account?.location || "");
  const [headline, setHeadline] = useState(account?.headline || "");
  const [website, setWebsite] = useState(account?.website || "");
  const [avatar, setAvatar] = useState(account?.avatar || "");
  const [notifyEmail, setNotifyEmail] = useState(
    () => localStorage.getItem("notifyEmail") !== "false"
  );
  const [notifyAlerts, setNotifyAlerts] = useState(
    () => localStorage.getItem("notifyAlerts") !== "false"
  );
  const [showEmailPublic, setShowEmailPublic] = useState(
    () => localStorage.getItem("showEmailPublic") === "true"
  );

  useEffect(() => {
    setName(account?.name || "");
    setEmail(account?.email || "");
    setPhone(account?.phone || "");
    setLocation(account?.location || "");
    setHeadline(account?.headline || "");
    setWebsite(account?.website || "");
    setAvatar(account?.avatar || "");
  }, [account]);

  const onPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error("Photo must be under 800 KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(String(reader.result || ""));
      toast.success("Photo ready — click Save settings");
    };
    reader.onerror = () => toast.error("Could not read that image");
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePhoto = () => {
    setAvatar("");
    toast.info("Photo removed — click Save settings");
  };

  const saveSettings = (event) => {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName) {
      toast.error("Please enter a name");
      return;
    }
    const patch = {
      name: nextName,
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      headline: headline.trim(),
      website: website.trim(),
      avatar: avatar || "",
    };
    if (isRecruiter) updateCompanyData(patch);
    else updateUser(patch);
    localStorage.setItem("notifyEmail", notifyEmail ? "true" : "false");
    localStorage.setItem("notifyAlerts", notifyAlerts ? "true" : "false");
    localStorage.setItem("showEmailPublic", showEmailPublic ? "true" : "false");
    toast.success("Settings saved");
  };

  const photoSrc = avatar || assets.profile_img;

  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-[70vh] py-10">
        <p className="text-sm font-medium text-primary">Account</p>
        <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Update your photo, profile details, and preferences. Changes stay in this browser.
        </p>

        {!account ? (
          <section className="surface-card mt-8 max-w-xl p-6">
            <h2 className="text-lg font-semibold">Sign in to manage settings</h2>
            <p className="mt-2 text-sm text-gray-500">
              Log in as a candidate or recruiter, then open Settings from the profile icon.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-blue rounded px-5 py-2 text-sm font-medium text-white"
                onClick={() => setShowUserLogin(true)}
              >
                Candidate login
              </button>
              <button
                type="button"
                className="job-card-btn rounded px-5 py-2 text-sm font-medium"
                onClick={() => setShowRecruiterLogin(true)}
              >
                Recruiter login
              </button>
            </div>
          </section>
        ) : (
          <form onSubmit={saveSettings} className="mt-8 grid max-w-2xl gap-4">
            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold">Profile photo</h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <img
                  src={photoSrc}
                  alt="Profile"
                  className="h-20 w-20 rounded-full border object-cover"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-blue rounded px-4 py-2 text-sm font-medium text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change photo
                  </button>
                  {avatar && (
                    <button
                      type="button"
                      className="job-card-btn rounded px-4 py-2 text-sm font-medium"
                      onClick={removePhoto}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPhotoChange}
                />
              </div>
              <p className="mt-3 text-xs text-gray-500">
                JPG or PNG under 800 KB. Your photo also updates the navbar avatar.
              </p>
            </section>

            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold">Profile details</h2>
              <label className="mt-4 block text-xs font-medium text-gray-500">
                Display name
                <input
                  className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label className="mt-4 block text-xs font-medium text-gray-500">
                Email
                <input
                  type="email"
                  className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="mt-4 block text-xs font-medium text-gray-500">
                Phone
                <input
                  type="tel"
                  className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>
              <label className="mt-4 block text-xs font-medium text-gray-500">
                Location
                <input
                  className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                  placeholder="Bangalore, India"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>
              <label className="mt-4 block text-xs font-medium text-gray-500">
                {isRecruiter ? "Company headline" : "Headline"}
                <input
                  className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                  placeholder={
                    isRecruiter
                      ? "Hiring product and engineering talent"
                      : "Full Stack Developer · Open to work"
                  }
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                />
              </label>
              {isRecruiter && (
                <label className="mt-4 block text-xs font-medium text-gray-500">
                  Website
                  <input
                    type="url"
                    className="form-field mt-1 w-full rounded px-3 py-2 text-sm"
                    placeholder="https://company.com"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>
              )}
            </section>

            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold">Preferences</h2>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-gray-500">Currently {theme} mode</p>
                </div>
                <button
                  type="button"
                  className="filter-select rounded px-4 py-2 text-sm"
                  onClick={toggleTheme}
                >
                  Switch to {theme === "dark" ? "light" : "dark"}
                </button>
              </div>
              <label className="mt-5 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={notifyEmail}
                  onChange={(event) => setNotifyEmail(event.target.checked)}
                />
                Email me about application updates
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={notifyAlerts}
                  onChange={(event) => setNotifyAlerts(event.target.checked)}
                />
                Notify me when job alerts match
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={showEmailPublic}
                  onChange={(event) => setShowEmailPublic(event.target.checked)}
                />
                Show my email on my profile
              </label>
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-primary">
                <Link to="/job-alerts">Manage job alerts</Link>
                <Link to="/saved-jobs">Saved jobs</Link>
                {isRecruiter && <Link to="/dashboard/manage-jobs">Dashboard</Link>}
              </div>
            </section>

            <button type="submit" className="btn-blue w-fit rounded px-6 py-2.5 text-sm font-medium text-white">
              Save settings
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Settings;
