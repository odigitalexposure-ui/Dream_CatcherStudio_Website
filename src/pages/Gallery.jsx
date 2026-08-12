import GallerySection from "../components/Gallery/Gallery";
import SEO from "../components/SEO/SEO";
import { getBreadcrumbSchema } from "../components/SEO/schemas";

export default function Gallery() {
  const breadcrumb = getBreadcrumbSchema([{ name: "Gallery Portfolio", url: "/gallery" }]);

  return (
    <>
      <SEO
        title="Portfolio Gallery | DreamCatcher Studio Photography"
        description="Explore the photography portfolio of DreamCatcher Studio. Featuring high-fashion editorials, luxury macro jewellery, mouthwatering food styling, and wedding celebrations."
        keywords="photography portfolio Kolkata, fashion gallery, jewellery photography portfolio, wedding photo showcase, food styling gallery"
        jsonLd={[breadcrumb]}
      />
      <GallerySection />
    </>
  );
}
