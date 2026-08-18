import GallerySection from "../components/Gallery/Gallery";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema } from "../components/SEO/schemas";

export default function Gallery() {
  const breadcrumb = getBreadcrumbSchema([{ name: "Gallery Portfolio", url: "/gallery" }]);

  return (
    <>
      <SEO
        title="Portfolio Showcase | Wedding, Pre-Wedding, Corporate & Product Photography"
        description="Explore the photography and videography portfolio of DREAMCATCHER Studio. Featuring best wedding photography in Kolkata, pre-wedding shoots, engagement photography in Rajpur, corporate events, and product photography near me."
        keywords="best wedding photographer in kolkata, pre-wedding shoots in kolkata, engagement photography in rajpur, corporate events photography in kolkata, product photography near me, videography studio near me"
        jsonLd={[breadcrumb]}
      />
      <GallerySection />
    </>
  );
}
