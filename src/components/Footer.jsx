import { assets } from "../assets/assets.js";
import Logo from "./Logo.jsx";

const Footer = () => {
  return (
    <footer className="app-header mt-0 border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Logo width={140} />
          <div className="hidden h-8 w-px bg-gray-300 sm:block" />
          <p className="text-xs text-gray-500 sm:text-sm">
            All rights reserved. Copyright @job_portal
          </p>
        </div>
        <div className="flex gap-3">
          <img className="icon-adaptive" width={32} src={assets.facebook_icon} alt="Facebook" />
          <img className="icon-adaptive" width={32} src={assets.twitter_icon} alt="Twitter" />
          <img className="icon-adaptive" width={32} src={assets.instagram_icon} alt="Instagram" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
