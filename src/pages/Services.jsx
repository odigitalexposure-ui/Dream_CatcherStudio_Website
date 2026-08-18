import ServiceSection from "../components/ServicesComp/ServiceSection";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema, getServiceSchema } from "../components/SEO/schemas";

export default function Services() {
  const breadcrumb = getBreadcrumbSchema([{ name: "Services", url: "/services" }]);
  const weddingService = getServiceSchema(
    "Best Wedding Photographer in Kolkata",
    "Cinematic wedding photography, pre-wedding shoots in Kolkata, engagement photography in Rajpur, and traditional ceremony coverage."
  );
  const videoService = getServiceSchema(
    "Video Editing Service in Kolkata & Videography Studio",
    "Professional videography studio near me, 4K camera production, drone videography, and commercial video editing service in Kolkata."
  );
  const corporateService = getServiceSchema(
    "Corporate Events Photography in Kolkata",
    "Corporate event coverage, executive portraits, company launches, and commercial brand photography in Kolkata."
  );
  const productService = getServiceSchema(
    "Product Photography Near Me & Macro Jewellery Shoots",
    "Product photography near me, luxury jewellery macro details, e-commerce catalog shoots, and high-fashion editorials."
  );

  return (
    <>
      <SEO
        title="Services | Video Editing Service in Kolkata, Pre-Wedding Shoots & Corporate Events"
        description="Explore top photography & videography services by DREAMCATCHER Studio. Offering video editing service in Kolkata, videography studio near me, pre-wedding shoots in Kolkata, engagement photography in Rajpur, corporate events photography, and product photography near me."
        keywords="photographer in rajpur, photographer in sonarpur, best wedding photographer in kolkata, photography near me, video editing service in kolkata, videography studio near me, pre-wedding shoots in kolkata, engagement photography in rajpur, corporate events photography in kolkata, product photography near me"
        jsonLd={[breadcrumb, weddingService, videoService, corporateService, productService]}
      />
      <ServiceSection />
    </>
  );
}
