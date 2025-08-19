import Branding from "@/components/blocks/branding";
import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import AIGenerator from "@/components/blocks/ai-generator";
import AIGeneratorJapanese from "@/components/blocks/ai-generator-ja";
import Pricing from "@/components/blocks/pricing";
import Showcase from "@/components/blocks/showcase";
import Stats from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonial";
import { getLandingPage } from "@/services/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
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
    };
  }

  return {
    alternates: {
      canonical: canonicalUrl,
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

  // 其他语言显示原有页面
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
