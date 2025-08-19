/**
 * 结构化数据组件 - Weather Icons
 * 实现Schema.org标记以提升SEO
 */

export default function WeatherIconsSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://aigenerator.com/#website",
        "url": "https://aigenerator.com/",
        "name": "Weather Icons",
        "description": "Premium weather icons collection for modern applications",
        "publisher": {
          "@id": "https://aigenerator.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://aigenerator.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://aigenerator.com/#organization",
        "name": "Weather Icons",
        "url": "https://aigenerator.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://aigenerator.com/#/schema/logo/image/",
          "url": "https://aigenerator.com/logo.png",
          "contentUrl": "https://aigenerator.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "Weather Icons"
        },
        "image": {
          "@id": "https://aigenerator.com/#/schema/logo/image/"
        },
        "sameAs": [
          "https://twitter.com/weathericons",
          "https://github.com/weathericons"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://aigenerator.com/#webpage",
        "url": "https://aigenerator.com/",
        "name": "Weather Icons - 2500+ Free Weather App Icons | Download SVG & PNG",
        "isPartOf": {
          "@id": "https://aigenerator.com/#website"
        },
        "about": {
          "@id": "https://aigenerator.com/#organization"
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "description": "Download professional weather icons for your applications. High-quality weather app icon collection with 2500+ designs.",
        "breadcrumb": {
          "@id": "https://aigenerator.com/#breadcrumb"
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": ["https://aigenerator.com/"]
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://aigenerator.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aigenerator.com/"
          }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://aigenerator.com/#product",
        "name": "Weather Icons Collection",
        "description": "Professional weather icons for modern applications. 2500+ designs covering all meteorological conditions.",
        "image": [
          "https://aigenerator.com/imgs/weather-icons-preview-1.png",
          "https://aigenerator.com/imgs/weather-icons-preview-2.png",
          "https://aigenerator.com/imgs/weather-icons-preview-3.png"
        ],
        "brand": {
          "@type": "Brand",
          "name": "Weather Icons"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://aigenerator.com/",
          "priceCurrency": "USD",
          "price": "0",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@id": "https://aigenerator.com/#organization"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "John Developer"
            },
            "datePublished": "2024-11-15",
            "reviewBody": "Excellent weather icons collection! Perfect for my weather app project."
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Sarah Designer"
            },
            "datePublished": "2024-11-20",
            "reviewBody": "High quality icons with great variety. The SVG format is perfect for scalability."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many weather icons are included in the collection?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our weather icons collection includes over 2500 unique designs covering all meteorological conditions including sunny, rainy, cloudy, snowy, stormy, and many more variations."
            }
          },
          {
            "@type": "Question",
            "name": "What formats are the weather icons available in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Weather icons are available in multiple formats including SVG (scalable vector graphics), PNG (multiple resolutions), and icon fonts for easy web implementation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use these weather icons for commercial projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all weather icons in our collection are free for commercial use. No attribution is required, though appreciated. You can use them in client projects, commercial applications, or personal projects."
            }
          },
          {
            "@type": "Question",
            "name": "Are the weather app icons optimized for mobile devices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all weather app icons are optimized for mobile displays. They maintain clarity on high-resolution Retina screens and standard mobile devices, with vector-based designs ensuring scalability without quality loss."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}