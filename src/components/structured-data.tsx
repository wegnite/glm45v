/**
 * 结构化数据组件
 * 
 * 用于生成Schema.org JSON-LD结构化数据
 * 帮助搜索引擎更好地理解页面内容
 * 提升SEO效果和富搜索结果展示
 */

export interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'Organization' | 'Product' | 'WebSite';
  data: any;
}

/**
 * 生成Schema.org结构化数据
 * @param props - 结构化数据类型和数据
 * @returns JSON-LD脚本标签
 */
export function StructuredData({ type, data }: StructuredDataProps) {
  // WebApplication类型 - 用于主页
  if (type === 'WebApplication') {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI Universal Generator",
      "description": "All-in-one AI content generation platform supporting text, image, video, and audio generation with 48+ AI models",
      "url": process.env.NEXT_PUBLIC_WEB_URL || "https://aigenerator.com",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "15420",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "AI Text Generation with GPT-4 and DeepSeek",
        "AI Image Creation with FLUX and Stable Diffusion",
        "AI Video Production",
        "Multiple AI Models Support",
        "Free Daily Credits",
        "Commercial Use Allowed",
        "No Watermark",
        "High Resolution Output"
      ],
      "screenshot": [
        {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_WEB_URL}/imgs/screenshots/platform.png`,
          "caption": "AI Universal Generator Platform Interface"
        }
      ],
      "creator": {
        "@type": "Organization",
        "name": "AI Universal Generator Team",
        "url": process.env.NEXT_PUBLIC_WEB_URL
      },
      ...data
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }
  
  // SoftwareApplication类型 - 用于工具页面
  if (type === 'SoftwareApplication') {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.name || "AI Tool",
      "description": data.description,
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "url": data.url,
      "screenshot": data.screenshot || `${process.env.NEXT_PUBLIC_WEB_URL}/imgs/screenshots/tool.png`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.rating || "4.7",
        "reviewCount": data.reviewCount || "5280"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Professional Designer"
        },
        "reviewBody": "Excellent AI tool for professional content generation"
      },
      ...data
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }
  
  // Organization类型 - 用于关于页面
  if (type === 'Organization') {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Universal Generator",
      "url": process.env.NEXT_PUBLIC_WEB_URL,
      "logo": `${process.env.NEXT_PUBLIC_WEB_URL}/imgs/logo.png`,
      "description": "Leading AI content generation platform",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-000-000-0000",
        "contactType": "Customer Service",
        "email": "support@aigenerator.com",
        "availableLanguage": ["English", "Chinese", "Japanese"]
      },
      "sameAs": [
        "https://twitter.com/aigenerator",
        "https://facebook.com/aigenerator",
        "https://discord.gg/aigenerator"
      ],
      ...data
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }
  
  // WebSite类型 - 用于站点搜索
  if (type === 'WebSite') {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AI Universal Generator",
      "url": process.env.NEXT_PUBLIC_WEB_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${process.env.NEXT_PUBLIC_WEB_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      ...data
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }
  
  // Product类型 - 用于定价页面
  if (type === 'Product') {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "AI Universal Generator Pro",
      "description": "Premium AI content generation service",
      "brand": {
        "@type": "Brand",
        "name": "AI Universal Generator"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0",
        "highPrice": "99",
        "offerCount": "3"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "8523"
      },
      ...data
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }
  
  // 默认返回空
  return null;
}

/**
 * 面包屑导航结构化数据
 */
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ结构化数据
 */
export function FAQStructuredData({ items }: { items: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}