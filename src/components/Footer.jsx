import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import Logo from "./Logo.jsx";

const Footer = () => {
  const { theme } = useAppContext();
  const isDark = theme === "dark";

  return (
    <footer className="app-header mt-0 py-6">
      <div className="container mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo width={140} />
          <div className="hidden h-8 w-px bg-gray-300 sm:block" />
          <p className="text-xs text-gray-500 sm:text-sm">
            All rights reserved. Copyright @job_portal
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/companies">Companies</Link>
        </nav>
        <div className="flex items-center gap-4">
          <img
            className="social-icon"
            src={isDark ? assets.facebook_icon_dark : assets.facebook_icon}
            alt="Facebook"
          />
          <img
            className="social-icon"
            src={isDark ? assets.twitter_icon_dark : assets.twitter_icon}
            alt="X"
          />
          <img
            className="social-icon"
            src={isDark ? assets.instagram_icon_dark : assets.instagram_icon}
            alt="Instagram"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
