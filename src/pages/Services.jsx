import ServiceSection from "../components/ServicesComp/ServiceSection";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema, getServiceSchema } from "../components/SEO/schemas";

export default function Services() {
  const breadcrumb = getBreadcrumbSchema([{ name: "Services", url: "/services" }]);
  const fashionService = getServiceSchema(
    "Fashion & Editorial Photography",
    "High-fashion editorial shoots, model lookbooks, portraiture, and studio lighting concepts."
  );
  const jewelleryService = getServiceSchema(
    "Jewellery & Luxury Photography",
    "Macro detail photography, luxury jewellery campaigns, and premium product presentation."
  );

  return (
    <>
      <SEO
        title="Studio Services | Fashion, Jewellery, Food & Wedding Photography"
        description="Professional photography studio services in Kolkata. High-fashion editorials, luxury macro jewellery photography, commercial culinary styling, and cinematic wedding coverage."
        keywords="photography services Kolkata, fashion photo shoot, jewellery product photography, commercial food photography, wedding photography packages"
        jsonLd={[breadcrumb, fashionService, jewelleryService]}
      />
      <ServiceSection />
    </>
  );
}
