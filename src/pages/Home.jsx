import AppDownload from "../components/AppDownload.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import HomeHighlights from "../components/HomeHighlights.jsx";
import JobAlertForm from "../components/JobAlertForm.jsx";
import JobListing from "../components/JobListing.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HomeHighlights />
      <JobListing />
      <div className="container mx-auto pb-10">
        <JobAlertForm />
      </div>
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
