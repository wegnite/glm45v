import { MetadataRoute } from 'next';

/**
 * Generate dynamic sitemap for SEO
 * This function creates a sitemap.xml file that helps search engines discover and index all pages
 * 
 * @returns Array of sitemap entries with URL, last modified date, change frequency, and priority
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigenerator.com';
  
  // Get current date for lastModified
  const currentDate = new Date().toISOString();
  
  // Define static pages with their priorities and change frequencies
  // 只包含实际存在的页面，避免404错误影响SEO
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ja-landing`,  // 日语AI生成页面
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/image-generator`,  // AI图像生成工具
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/text-generator`,  // AI文本生成工具
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/showcase`,  // 展示页面
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/posts`,  // 博客文章列表
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signin`,  // 登录页面
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ];
  
  // Define locales for multi-language support
  const locales = ['en', 'zh', 'ja'];
  
  // Generate URLs for all locales
  const localizedPages = staticPages.flatMap(page => {
    return locales.map(locale => ({
      ...page,
      url: page.url.replace(baseUrl, `${baseUrl}/${locale}`),
      priority: page.priority * 0.9, // Slightly lower priority for localized pages
    }));
  });
  
  // Combine all pages
  const allPages = [...staticPages, ...localizedPages];
  
  return allPages;
}