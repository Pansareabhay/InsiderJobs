import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const Logo = ({ className, onClick, width }) => {
  const { theme } = useAppContext();

  return (
    <img
      onClick={onClick}
      className={className}
      width={width}
      src={theme === "dark" ? assets.logo_dark : assets.logo}
      alt="InsiderJobs"
    />
  );
};

export default Logo;
