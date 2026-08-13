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
        title="DreamCatcher Studio | Professional Photography & Visual Arts | Kolkata"
        description="DreamCatcher Studio is a premier photography studio in Kolkata specializing in high-fashion editorials, luxury jewellery campaigns, commercial food styling, and cinematic wedding photography."
        keywords="photography studio Kolkata, fashion photography Kolkata, luxury jewellery photography, commercial food styling, wedding photographer Kolkata, professional studio shoots"
        jsonLd={schemas}
      />
      <Hero />
      <GallerySection />
      <AboutSection showWeddingPortfolio={false} />
      <Contact />
    </>
  );
}
