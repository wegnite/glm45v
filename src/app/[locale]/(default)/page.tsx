import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import AIGenerator from "@/components/blocks/ai-generator";
import AIGeneratorJapanese from "@/components/blocks/ai-generator-ja";
import ToolsPlatformHero from "@/components/blocks/tools-platform-hero";
import Pricing from "@/components/blocks/pricing";
import { getLandingPage } from "@/services/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  // 日文是默认语言，不需要前缀；其他语言添加前缀
  if (locale !== "ja") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  // 日语用户的SEO优化元数据
  if (locale === "ja") {
    return {
      title: "AI画像生成 無料 | 日本No.1 AIジェネレーター - 登録不要で今すぐ使える",
      description: "【完全無料】AI画像生成ツールで誰でも簡単にプロ級の画像作成。日本語対応の画像生成AIで、テキストから瞬時に高品質な画像を生成。商用利用OK、登録不要で今すぐ始められます。",
      keywords: "AI画像生成,画像生成AI,生成AI,無料,AI画像生成 無料,画像生成AI 日本語,テキストから画像,AIイラスト生成,商用利用可能,登録不要",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: "AI画像生成 - 無料で使える日本No.1 AIジェネレーター",
        description: "最先端のAI画像生成技術で、テキストから高品質な画像を瞬時に生成。日本語完全対応、商用利用OK。",
        locale: "ja_JP",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  // 英语用户的SEO优化元数据 - AI Tools Platform
  if (locale === "en") {
    return {
      title: "AI Universal Generator - Free AI Tools Platform | Text, Image, Video Generation",
      description: "Access 48+ cutting-edge AI models for text, image, video, and audio generation. One platform for all your AI needs. Free trials available, no credit card required.",
      keywords: "ai generator, ai tools platform, text generation, image generation, video generation, GPT-4, FLUX, Midjourney, DeepSeek, AI universal generator, free ai tools",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: "AI Universal Generator - Premium AI Tools Platform",
        description: "48+ AI models in one platform. Generate text, images, videos, and more with cutting-edge AI technology.",
        locale: "en_US",
        type: "website",
        images: [
          {
            url: "/imgs/ai-platform-og.png",
            width: 1200,
            height: 630,
            alt: "AI Universal Generator Platform",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Universal Generator - All AI Tools in One Platform",
        description: "Access GPT-4, FLUX, Midjourney, and 45+ more AI models. Free trials available.",
        images: ["/imgs/ai-platform-twitter.png"],
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

  // 中文用户SEO优化元数据
  return {
    title: "AI生成器 - 免费AI文本图片视频生成工具 | AI Universal Generator",
    description: "一站式AI生成平台，支持文本、图片、视频、音频生成。集成GPT-4、FLUX、Midjourney等48+顶级AI模型。免费试用，无需信用卡。",
    keywords: "AI生成器,AI图片生成,AI文本生成,AI视频生成,免费AI工具,GPT-4,FLUX,Midjourney替代品,AI绘画,文心一言",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "AI Universal Generator - 全能AI生成平台",
      description: "48+AI模型一站式平台。生成文本、图片、视频等内容，引领AI创作新时代。",
      locale: "zh_CN",
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

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

  // 日语用户显示优化后的专用页面
  if (locale === "ja") {
    return <AIGeneratorJapanese />;
  }

  // 英语用户显示精品工具站平台页面
  if (locale === "en") {
    return <ToolsPlatformHero />;
  }

  // 其他语言（中文等）显示原有页面
  return (
    <>
      {page.hero && <AIGenerator hero={page.hero} />}
      {page.feature && <Feature section={page.feature} />}
      {/* {page.showcase && <Showcase section={page.showcase} />} */}
      {/* 
        暂时隐藏统计和评价部分 - Creem 支付平台合规要求
        不能显示虚假的用户数量和评价信息
        等获得真实数据后再启用
      */}
      {/* {page.stats && <Stats section={page.stats} />} */}
      {page.pricing && <Pricing pricing={page.pricing} />}
      {/* {page.testimonial && <Testimonial section={page.testimonial} />} */}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}
