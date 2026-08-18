import Hero from "../components/Hero/Hero";
import AboutSection from "../components/About/AboutSection";
import GallerySection from "../components/Gallery/GallerySection";
import Contact from "./Contact";
import SEO from "../components/SEO/SEO";
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from "../components/SEO/schemas";

export default function Home() {
  const schemas = [getLocalBusinessSchema(), getOrganizationSchema(), getWebSiteSchema()];

  return (
    <>
      <SEO
        title="Best Wedding Photographer in Kolkata, Rajpur & Sonarpur | DREAMCATCHER Studio"
        description="DREAMCATCHER Studio is the best wedding photographer in Kolkata, Rajpur & Sonarpur. Specializing in pre-wedding shoots, engagement photography in Rajpur, corporate events, product photography near me, and video editing services."
        keywords="photographer in rajpur, photographer in sonarpur, best wedding photographer in kolkata, photography near me, video editing service in kolkata, videography studio near me, pre-wedding shoots in kolkata, engagement photography in rajpur, corporate events photography in kolkata, product photography near me"
        jsonLd={schemas}
      />
      <Hero />
      <GallerySection />
      <AboutSection showWeddingPortfolio={false} />
      <Contact />
    </>
  );
}
