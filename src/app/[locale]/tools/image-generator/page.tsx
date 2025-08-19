/**
 * AI Image Generator 专用页面
 * 从工具平台导航到此页面
 */

import AIImageGeneratorHero from "@/components/blocks/ai-image-generator-hero";
import AIImageGeneratorSchema from "@/components/schema/ai-image-generator-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://aigenerator.com';
  const canonicalUrl = `${baseUrl}/${locale}/tools/image-generator`;

  return {
    title: "AI Image Generator - Free Text to Image AI Tool | Create Stunning Visuals",
    description: "Transform text into stunning images with our free AI image generator. Powered by FLUX, Stable Diffusion, and advanced AI models. No signup required for 2 free trials.",
    keywords: "ai image generator, free ai image generator, text to image, ai art generator, flux ai, stable diffusion, ai generated images, image creation tool",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "AI Image Generator - Create Amazing Images with AI",
      description: "Free AI image generator with 2 trials. Transform your ideas into stunning visuals using cutting-edge AI technology.",
      url: canonicalUrl,
      siteName: "AI Universal Generator",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/imgs/ai-image-generator-og.png`,
          width: 1200,
          height: 630,
          alt: "AI Image Generator Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Image Generator - Free Text to Image Tool",
      description: "Create stunning images from text descriptions. Free trials available, no signup required.",
      images: [`${baseUrl}/imgs/ai-image-generator-twitter.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ImageGeneratorPage() {
  return (
    <>
      <AIImageGeneratorSchema />
      <AIImageGeneratorHero />
    </>
  );
}