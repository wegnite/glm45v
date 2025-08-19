import { MetadataRoute } from 'next';

/**
 * Generate dynamic sitemap for SEO
 * This function creates a sitemap.xml file that helps search engines discover and index all pages
 * 
 * @returns Array of sitemap entries with URL, last modified date, change frequency, and priority
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://glm45v.com';
  
  // Get current date for lastModified
  const currentDate = new Date().toISOString();
  
  // Define locales for multi-language support
  const locales = ['en', 'zh', 'ja'];
  
  // Define pages with their priorities and change frequencies
  // 为每个语言版本生成独立的URL，避免重复
  const pages = [
    {
      path: '',  // 首页
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      path: '/tools/image-generator',  // AI图像生成工具
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      path: '/tools/text-generator',  // AI文本生成工具
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      path: '/pricing',  // 定价页面
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      path: '/gallery',  // 画廊页面
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      path: '/showcase',  // 展示页面
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      path: '/blog',  // 博客页面
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      path: '/about',  // 关于页面
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/contact',  // 联系页面
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      path: '/terms-of-service',  // 服务条款
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      path: '/privacy-policy',  // 隐私政策
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
  
  // Generate URLs for all locales
  // 为每个语言版本生成完整的 URL
  const sitemapEntries = locales.flatMap(locale => {
    return pages.map(page => {
      // 日文版本使用根路径（默认语言），其他语言使用 locale 前缀
      const url = locale === 'ja' 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`;
      
      // 日语版本优先级最高（主要目标市场）
      let priority = page.priority;
      if (locale === 'ja') {
        priority = page.priority; // 日文保持原始优先级
      } else if (locale === 'en') {
        priority = page.priority * 0.95;
      } else if (locale === 'zh') {
        priority = page.priority * 0.9;
      }
      
      return {
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority,
      };
    });
  });
  
  return sitemapEntries;
}