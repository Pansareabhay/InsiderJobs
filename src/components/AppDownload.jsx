import { assets } from "../assets/assets.js";

const AppDownload = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="promo-band relative flex min-h-[260px] items-center overflow-hidden rounded-xl bg-[#F2F3FF] px-8 py-8 sm:min-h-[360px] sm:px-12 lg:min-h-[360px] lg:px-20">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Download Mobile App For Better Experience
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#">
              <img className="h-10 sm:h-12" src={assets.play_store} alt="Get it on Google Play" />
            </a>
            <a href="#">
              <img className="h-10 sm:h-12" src={assets.app_store} alt="Download on the App Store" />
            </a>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-8 hidden h-full w-auto object-contain object-bottom lg:block xl:right-24"
          src={assets.app_main_img}
          alt="Woman pointing at the mobile app download links"
        />
      </div>
    </div>
  );
};

export default AppDownload;
