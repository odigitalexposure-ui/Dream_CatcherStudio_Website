import AboutSection from "../components/About/AboutSection";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "../components/SEO/schemas";

export default function About() {
  const breadcrumb = getBreadcrumbSchema([{ name: "About Us", url: "/about" }]);
  const schemas = [getLocalBusinessSchema(), breadcrumb];

  return (
    <>
      <SEO
        title="About DREAMCATCHER Studio | Top Photographer in Rajpur & Sonarpur Kolkata"
        description="Learn about DREAMCATCHER Studio, the premier photographer in Rajpur, Sonarpur & Kolkata. Specializing in best wedding photography, pre-wedding shoots in Kolkata, engagement photography in Rajpur, corporate events, and video editing services."
        keywords="photographer in rajpur, photographer in sonarpur, best wedding photographer in kolkata, photography near me, engagement photography in rajpur, videography studio near me, pre-wedding shoots in kolkata"
        jsonLd={schemas}
      />
      <AboutSection />
    </>
  );
}
