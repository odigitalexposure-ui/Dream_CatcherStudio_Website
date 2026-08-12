export const SITE_URL = "https://dreamcatcherstudio.in";

// 1. Photography Business / Local Business Schema
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": `${SITE_URL}/#business`,
    "name": "DreamCatcher Studio",
    "alternateName": "DreamCatcher Photography Studio",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo_dark.png`,
    "image": `${SITE_URL}/logo_dark.png`,
    "description": "Premium photography studio in Kolkata specializing in high-fashion editorials, luxury jewellery campaigns, commercial food styling, and cinematic wedding photography worldwide.",
    "telephone": "+919830000000",
    "email": "contact@dreamcatcherstudio.in",
    "priceRange": "₹₹-₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.5726,
      "longitude": 88.3639
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dreamcatcherstudio",
      "https://www.facebook.com/dreamcatcherstudio",
      "https://www.youtube.com/@dreamcatcherstudio"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Kolkata"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fashion & Editorial Photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jewellery & Luxury Product Photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Food & Culinary Styling Photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding & Celebration Photography"
          }
        }
      ]
    }
  };
}

// 2. Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": "DreamCatcher Studio",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo_dark.png`,
    "description": "High-end commercial and artistic photography studio specializing in fashion, jewellery, food, and wedding visual storytelling.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919830000000",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Bengali"]
    }
  };
}

// 3. WebSite Schema
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "DreamCatcher Studio",
    "description": "Official Website of DreamCatcher Studio - Fashion, Jewellery, Food & Wedding Photography",
    "publisher": {
      "@id": `${SITE_URL}/#organization`
    }
  };
}

// 4. Breadcrumb Schema
export function getBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `${SITE_URL}${item.url}`
      }))
    ]
  };
}

// 5. Service Schema
export function getServiceSchema(serviceName, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@id": `${SITE_URL}/#business`
    },
    "description": description,
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };
}
