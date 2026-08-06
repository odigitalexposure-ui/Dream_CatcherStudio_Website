import Hero from "../components/Hero/Hero";
import AboutSection from "../components/About/AboutSection";
import GallerySection from "../components/Gallery/GallerySection";
import Services from "../pages/Services";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <GallerySection />
      <Services />
      <Contact />
    </>
  );
}
