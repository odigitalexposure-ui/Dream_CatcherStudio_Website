import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_SITE_URL = "https://www.dreamcatcherstudio.co.in";
const DEFAULT_SITE_NAME = "DREAMCATCHER Studio";
const DEFAULT_TITLE = "DREAMCATCHER Studio | Best Wedding & Commercial Photographer in Kolkata, Rajpur & Sonarpur";
const DEFAULT_DESCRIPTION =
  "DREAMCATCHER Studio is the premier photography and videography studio in Kolkata, Rajpur & Sonarpur. Specializing in best wedding photography, pre-wedding shoots, engagement photography, corporate events, luxury product photography, and video editing services.";
const DEFAULT_KEYWORDS =
  "photographer in rajpur, photographer in sonarpur, best wedding photographer in kolkata, photography near me, video editing service in kolkata, videography studio near me, pre-wedding shoots in kolkata, engagement photography in rajpur, corporate events photography in kolkata, product photography near me";
const DEFAULT_IMAGE = "https://www.dreamcatcherstudio.co.in/logo_dark.png";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = "website",
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  twitterCard = "summary_large_image",
  jsonLd,
}) {
  const location = useLocation();
  const currentCanonical = canonical || `${DEFAULT_SITE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update meta tag
    const setMetaTag = (attribute, value, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "author", "DREAMCATCHER Studio");

    // Geo Local SEO Meta Tags
    setMetaTag("name", "geo.region", "IN-WB");
    setMetaTag("name", "geo.placename", "Kolkata");
    setMetaTag("name", "geo.position", "22.5726;88.3639");
    setMetaTag("name", "ICBM", "22.5726, 88.3639");

    // 3. Canonical URL
    setLinkTag("canonical", currentCanonical);

    // 4. Open Graph Meta Tags
    setMetaTag("property", "og:site_name", DEFAULT_SITE_NAME);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:url", currentCanonical);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:locale", "en_US");

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", twitterCard);
    setMetaTag("name", "twitter:title", ogTitle || title);
    setMetaTag("name", "twitter:description", ogDescription || description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schemaObj, idx) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.setAttribute("data-seo-idx", String(idx));
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, currentCanonical, ogType, ogTitle, ogDescription, ogImage, twitterCard, jsonLd]);

  return null;
}
