export const SITE_URL = "https://www.dreamcatcherstudio.co.in";

// 1. Photography Business / Local Business Schema
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": `${SITE_URL}/#business`,
    "name": "DREAMCATCHER Studio",
    "alternateName": "DREAMCATCHER Photography & Videography Studio Kolkata",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo_dark.png`,
    "image": `${SITE_URL}/logo_dark.png`,
    "description": "Premier photography and videography studio in Rajpur, Sonarpur, Kolkata specializing in best wedding photography, pre-wedding shoots, engagement photography, corporate events, video editing services, and product photography.",
    "telephone": "+918240481762",
    "email": "hello@dreamcatcher.studio",
    "priceRange": "₹₹-₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A3, 736, Paschim Nischintapur, Boral",
      "addressLocality": "Rajpur Sonarpur, Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700154",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.4415,
      "longitude": 88.3756
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dreamcatcherstudio",
      "https://www.facebook.com/dreamcatcherstudio",
      "https://www.youtube.com/@dreamcatcherstudio"
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Rajpur"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Sonarpur"
      },
      {
        "@type": "City",
        "name": "Kolkata"
      },
      {
        "@type": "AdministrativeArea",
        "name": "West Bengal"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography & Videography Services in Rajpur, Sonarpur & Kolkata",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Best Wedding Photography in Kolkata",
            "description": "Cinematic wedding photography, traditional ceremonies, and luxury wedding visual storytelling in Kolkata and Rajpur Sonarpur."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pre-Wedding Shoots in Kolkata & Engagement Photography in Rajpur",
            "description": "Creative outdoor pre-wedding concepts, engagement couple portraits, and cinematic couple shoot videos."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Videography Studio & Video Editing Service in Kolkata",
            "description": "Professional studio videography, 4K camera setup, aerial drone footage, reel editing, and commercial video editing services."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Events Photography in Kolkata",
            "description": "Coverage of corporate events, brand launches, business summits, seminars, and executive portraiture."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Photography Near Me & Macro Jewellery Shoots",
            "description": "Commercial product photography, luxury jewellery macro details, e-commerce styling, and high-fashion editorials."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photographer in Rajpur & Sonarpur",
            "description": "Top-rated local photography studio service in Rajpur, Sonarpur, Boral, and South Kolkata."
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
    "name": "DREAMCATCHER Studio",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo_dark.png`,
    "description": "High-end commercial, event, and wedding photography and videography studio based in Rajpur Sonarpur, Kolkata.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918240481762",
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
    "name": "DREAMCATCHER Studio",
    "description": "Official Website of DREAMCATCHER Studio - Best Wedding Photographer, Videography & Product Photography Studio in Rajpur, Sonarpur, Kolkata.",
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
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Rajpur"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Sonarpur"
      },
      {
        "@type": "City",
        "name": "Kolkata"
      }
    ]
  };
}

