import { useRef } from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const trustedLogos = [
  { name: "Microsoft", src: assets.microsoft_logo },
  { name: "Walmart", src: assets.walmart_logo },
  { name: "Accenture", src: assets.accenture_logo },
  { name: "Samsung", src: assets.samsung_logo },
  { name: "Amazon", src: assets.amazon_logo },
  { name: "Adobe", src: assets.adobe_logo },
  { name: "Google", src: assets.google_logo },
  { name: "Meta", src: assets.meta_logo },
  { name: "IBM", src: assets.ibm_logo },
  { name: "Oracle", src: assets.oracle_logo },
  { name: "Netflix", src: assets.netflix_logo },
  { name: "Spotify", src: assets.spotify_logo },
  { name: "TCS", src: assets.tcs_logo },
  { name: "Infosys", src: assets.infosys_logo },
  { name: "Wipro", src: assets.wipro_logo },
];

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useAppContext();
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="hero-band rounded-xl bg-gradient-to-r from-[#3b0764] via-[#1e1b4b] to-[#312e81] px-4 py-16 text-center text-white">
        <h2 className="mb-4 text-2xl font-medium md:text-4xl lg:text-5xl">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-sm font-light opacity-80">
          Your Next Job Career Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="hero-search mx-auto flex w-full max-w-3xl items-center justify-between overflow-hidden rounded bg-white pl-4 text-gray-600">
          <div className="flex items-center">
            <img className="icon-adaptive h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <div className="flex items-center">
            <img className="icon-adaptive h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button
            onClick={onSearch}
            className="hero-search-btn m-1 rounded px-6 py-2 text-white sm:px-9"
          >
            Search
          </button>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-white">
          <div>
            <p className="text-xl font-semibold sm:text-2xl">10k+</p>
            <p className="text-[11px] opacity-80">Open jobs</p>
          </div>
          <div>
            <p className="text-xl font-semibold sm:text-2xl">500+</p>
            <p className="text-[11px] opacity-80">Companies</p>
          </div>
          <div>
            <p className="text-xl font-semibold sm:text-2xl">2k+</p>
            <p className="text-[11px] opacity-80">Hires made</p>
          </div>
        </div>
        </div>
        <div className="mt-16">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-gray-700">
          Trusted by leading companies
        </p>
        </div>
      <div className="flex items-center overflow-hidden p-3">
        <div className="marquee-track relative flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-4 pr-4">
            {[...trustedLogos, ...trustedLogos].map((logo, index) => (
              <div
                key={index}
                className="logo-tile flex h-16 w-40 shrink-0 items-center justify-center rounded border border-gray-200 px-3 shadow-sm"
                aria-hidden={index >= trustedLogos.length}
              >
                <img
                  className={`${
                    logo.name === "Amazon"
                      ? "max-h-4"
                      : logo.name === "Walmart"
                        ? "max-h-6"
                        : "max-h-8"
                  } w-auto max-w-full object-contain`}
                  src={logo.src}
                  alt={logo.name}
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
