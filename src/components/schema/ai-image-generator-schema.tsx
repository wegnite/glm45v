/**
 * 结构化数据组件 - AI Image Generator
 * 实现Schema.org标记以提升SEO
 */

export default function AIImageGeneratorSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://aigenerator.com/#website",
        "url": "https://aigenerator.com/",
        "name": "AI Image Generator",
        "description": "Free AI image generator for creating stunning visuals from text",
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
        "name": "AI Image Generator",
        "url": "https://aigenerator.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://aigenerator.com/#/schema/logo/image/",
          "url": "https://aigenerator.com/logo.png",
          "contentUrl": "https://aigenerator.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "AI Image Generator"
        },
        "image": {
          "@id": "https://aigenerator.com/#/schema/logo/image/"
        },
        "sameAs": [
          "https://twitter.com/aigenerator",
          "https://github.com/aigenerator"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://aigenerator.com/#webpage",
        "url": "https://aigenerator.com/",
        "name": "AI Image Generator - Free Text to Image AI Tool",
        "isPartOf": {
          "@id": "https://aigenerator.com/#website"
        },
        "about": {
          "@id": "https://aigenerator.com/#organization"
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "description": "Create amazing images with our free AI image generator. Transform text to stunning visuals using advanced AI technology.",
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
        "@type": "SoftwareApplication",
        "@id": "https://aigenerator.com/#application",
        "name": "AI Image Generator",
        "description": "Free AI image generator that transforms text descriptions into stunning visuals using advanced machine learning models.",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free tier with 2 trial generations, premium features available"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "3250",
          "bestRating": "5",
          "worstRating": "1"
        },
        "screenshot": [
          "https://aigenerator.com/imgs/screenshot1.png",
          "https://aigenerator.com/imgs/screenshot2.png",
          "https://aigenerator.com/imgs/screenshot3.png"
        ],
        "featureList": [
          "Text to image generation",
          "Multiple AI models (FLUX, Stable Diffusion)",
          "Various art styles",
          "High resolution output",
          "Commercial usage rights",
          "Free trials available",
          "No signup required for trials"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the AI image generator really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI image generator offers 2 free trial generations without signup. After that, you can sign in for unlimited access with our free tier, or upgrade to premium for advanced features."
            }
          },
          {
            "@type": "Question",
            "name": "What AI models does the image generator use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI image generator uses multiple state-of-the-art models including FLUX.1-schnell, Stable Diffusion 3.5, and other advanced diffusion models to create high-quality images from text descriptions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use AI generated images commercially?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! All images created with our AI image generator come with full commercial rights. You can use them for business, client projects, or any commercial purpose without restrictions."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to generate an image?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI image generator typically produces images in 10-15 seconds, depending on the complexity of your prompt and the selected style. We use optimized models for fast generation without compromising quality."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to provide a prompt or can it generate automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can either provide your own text prompt or let our AI image generator select a creative prompt for you. If you don't enter any text, the system will use one of our curated default prompts to generate an interesting image."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://aigenerator.com/#howto",
        "name": "How to Use AI Image Generator",
        "description": "Simple steps to create amazing images with our AI image generator",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter your prompt",
            "text": "Type a description of the image you want to create, or leave it empty for a random prompt"
          },
          {
            "@type": "HowToStep",
            "name": "Choose art style",
            "text": "Select from various styles like photorealistic, anime, digital art, or watercolor"
          },
          {
            "@type": "HowToStep",
            "name": "Click Generate",
            "text": "Hit the generate button and wait 10-15 seconds for your image"
          },
          {
            "@type": "HowToStep",
            "name": "Download your image",
            "text": "Download the generated image in high resolution for free"
          }
        ],
        "totalTime": "PT30S"
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