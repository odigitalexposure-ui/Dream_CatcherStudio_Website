import AboutSection from "../components/About/AboutSection";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "../components/SEO/schemas";

export default function About() {
  const breadcrumb = getBreadcrumbSchema([{ name: "About Us", url: "/about" }]);
  const schemas = [getLocalBusinessSchema(), breadcrumb];

  return (
    <>
      <SEO
        title="About DreamCatcher Studio | Kolkata Premier Photography Studio"
        description="Learn about DreamCatcher Studio's passion for visual storytelling. Our Kolkata studio brings high-fashion, luxury jewellery, commercial culinary styling, and wedding photography to life."
        keywords="about DreamCatcher Studio, photography studio team Kolkata, commercial photographer Kolkata, luxury portrait studio"
        jsonLd={schemas}
      />
      <AboutSection />
    </>
  );
}
