/**
 * AI Text Generator 专用页面
 * 提供多模型文本生成功能
 */

import TextGeneratorHero from "@/components/blocks/text-generator-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://aigenerator.com';
  const canonicalUrl = `${baseUrl}/${locale}/tools/text-generator`;

  return {
    title: "AI Text Generator - GPT-4, DeepSeek R1 & More | Free Text Generation",
    description: "Generate high-quality text with GPT-4, DeepSeek R1, and other advanced AI models. Free trials available. Perfect for creative writing, business content, and code generation.",
    keywords: "ai text generator, gpt-4, deepseek r1, text generation, ai writing tool, content generator, free text generator, llama 3.3",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "AI Text Generator - Advanced Language Models",
      description: "Access GPT-4, DeepSeek, and more AI models for text generation. Free trials, no signup required.",
      url: canonicalUrl,
      siteName: "AI Universal Generator",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/imgs/ai-text-generator-og.png`,
          width: 1200,
          height: 630,
          alt: "AI Text Generator Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Text Generator - GPT-4 & DeepSeek",
      description: "Generate professional content with the world's best AI language models.",
      images: [`${baseUrl}/imgs/ai-text-generator-twitter.png`],
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

export default function TextGeneratorPage() {
  return <TextGeneratorHero />;
}