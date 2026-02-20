import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ERPFeatures from "../components/ERPFeatures";
import Footer from "../components/Footer";
import ERPCTA from "../components/ERPCTA";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <ERPFeatures/>
      <ERPCTA />
      <Footer/>
    </>
  );
}