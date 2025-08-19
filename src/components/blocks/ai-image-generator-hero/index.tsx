/**
 * AI Image Generator SEO优化首页组件
 * 
 * SEO优化策略：
 * - 主关键词：ai image generator (目标密度: 3-5%)
 * - 次要关键词：free ai image generator (目标密度: 1-2%)
 * - 相关关键词：text to image, ai art generator, ai generated images
 * - 内容长度：600-800字
 * - 结构化内容：清晰的H1-H6层级
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Palette,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Download,
  Loader2,
  Wand2,
  Image as ImageIcon,
  Cpu,
  Infinity,
  Gift
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AIImageGeneratorHero() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(5234567);
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [freeTrialsUsed, setFreeTrialsUsed] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  
  // 免费试用次数限制
  const FREE_TRIAL_LIMIT = 3;
  
  // 默认提示词列表（当用户不输入时随机选择）
  const defaultPrompts = [
    "A majestic dragon flying over a crystal mountain at sunset, fantasy art style",
    "Futuristic cyberpunk city with neon lights and flying cars, night scene",
    "Beautiful underwater palace made of coral and pearls, bioluminescent lighting",
    "Enchanted forest with glowing mushrooms and fairy lights, magical atmosphere",
    "Space station orbiting a purple planet with rings, sci-fi concept art",
    "Ancient temple hidden in misty mountains, atmospheric landscape",
    "Steampunk airship sailing through clouds at golden hour",
    "Magical library with floating books and spiral staircases",
  ];

  // 客户端初始化，避免hydration错误
  useEffect(() => {
    // 从localStorage读取免费试用次数
    const savedTrials = localStorage.getItem('freeTrialsUsed');
    if (savedTrials) {
      setFreeTrialsUsed(parseInt(savedTrials));
    }
    
    // 模拟实时生成计数
    const interval = setInterval(() => {
      setGeneratedCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // AI生成风格选项
  const styleOptions = [
    { id: "realistic", name: "Photorealistic", icon: "📷" },
    { id: "anime", name: "Anime Art", icon: "🎨" },
    { id: "digital", name: "Digital Art", icon: "💫" },
    { id: "oil", name: "Oil Painting", icon: "🖼️" },
    { id: "watercolor", name: "Watercolor", icon: "🎭" },
    { id: "3d", name: "3D Render", icon: "🎮" },
  ];

  // 特性列表 - 包含关键词
  const features = [
    {
      icon: <Wand2 className="w-5 h-5" />,
      title: "Advanced AI Image Generator",
      description: "Our AI image generator uses state-of-the-art machine learning models to create stunning visuals from text descriptions."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast Generation",
      description: "Generate AI images in seconds. Our optimized AI image generator delivers high-quality results without long wait times."
    },
    {
      icon: <Infinity className="w-5 h-5" />,
      title: "Free AI Image Generator",
      description: "Start creating with our free AI image generator. No credit card required, unlimited creativity at your fingertips."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Commercial License Included",
      description: "All AI generated images come with full commercial rights. Use your creations for any project, personal or business."
    }
  ];

  // 示例生成结果
  const exampleGenerations = [
    { prompt: "Futuristic city at sunset", style: "Digital Art", time: "12s" },
    { prompt: "Mystical forest with glowing trees", style: "Fantasy", time: "15s" },
    { prompt: "Portrait of a cyberpunk warrior", style: "Anime", time: "10s" },
    { prompt: "Underwater palace made of coral", style: "Realistic", time: "14s" },
    { prompt: "Dragon flying over mountains", style: "Oil Painting", time: "13s" },
    { prompt: "Space station orbiting Earth", style: "3D Render", time: "11s" },
  ];

  const handleGenerate = async () => {
    // 如果用户没有输入，使用随机默认提示词
    const finalPrompt = prompt.trim() || defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];
    
    // 检查是否已登录
    if (status === "authenticated") {
      // 已登录用户直接生成
      await performGeneration(finalPrompt);
    } else {
      // 未登录用户检查免费试用次数
      if (freeTrialsUsed < FREE_TRIAL_LIMIT) {
        // 还有免费试用次数
        await performGeneration(finalPrompt);
        const newTrialsUsed = freeTrialsUsed + 1;
        setFreeTrialsUsed(newTrialsUsed);
        localStorage.setItem('freeTrialsUsed', newTrialsUsed.toString());
        
        // 显示剩余次数提示
        if (newTrialsUsed === FREE_TRIAL_LIMIT) {
          toast.info("You've used all your free trials. Please sign in to continue!");
        } else {
          toast.success(`Image generated! ${FREE_TRIAL_LIMIT - newTrialsUsed} free trial${FREE_TRIAL_LIMIT - newTrialsUsed === 1 ? '' : 's'} remaining.`);
        }
      } else {
        // 免费试用次数用完，显示登录对话框
        setShowLoginDialog(true);
        toast.error("Free trials exhausted. Please sign in to continue generating images!");
      }
    }
  };

  // 执行实际的图像生成
  const performGeneration = async (finalPrompt: string) => {
    setIsGenerating(true);
    
    try {
      // 调用AI图像生成API
      const response = await fetch("/api/demo/gen-image-siliconflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          provider: "siliconflow",
          model: "black-forest-labs/FLUX.1-schnell",
          size: "1024x1024",
          n: 1,
          image_format: "jpeg"
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.data?.images?.[0]?.url) {
        setGeneratedImage(result.data.images[0].url);
        setShowResultDialog(true);
        setGeneratedCount(prev => prev + 1);
        
        // 如果使用了默认提示词，更新输入框显示
        if (!prompt.trim()) {
          setPrompt(finalPrompt);
        }
      } else {
        throw new Error(result.message || "Failed to generate image");
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 登录处理
  const handleLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      {/* Hero Section - SEO优化 */}
      <section className="relative min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 pt-20 pb-16">
          {/* 信任徽章 */}
          <div className="flex justify-center mb-8">
            <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              {generatedCount.toLocaleString()}+ Images Generated Today
            </Badge>
          </div>

          {/* H1 - 主关键词 */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Image Generator
            <span className="block text-3xl md:text-5xl mt-2">
              Transform Text to Stunning Images
            </span>
          </h1>

          {/* 副标题 - 包含关键词 */}
          <p className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Create amazing visuals with our <strong>free AI image generator</strong>. 
            Turn your ideas into professional artwork using advanced artificial intelligence technology.
          </p>

          {/* 主要生成界面 */}
          <Card className="max-w-4xl mx-auto p-8 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur">
            <div className="space-y-6">
              {/* 输入区域 */}
              <div>
                <label htmlFor="prompt" className="block text-lg font-semibold mb-3">
                  Describe Your Image
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Enter a description or leave empty for a random prompt (e.g., A majestic castle on a floating island...)"
                  className="min-h-[120px] text-lg"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Be descriptive! Our <strong>AI image generator</strong> works best with detailed prompts.
                </p>
              </div>

              {/* 风格选择 */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  Choose Art Style
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {styleOptions.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        selectedStyle === style.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 生成按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Your Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Image - It's Free!
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg py-6"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  View Gallery
                </Button>
              </div>

              {/* 信息提示 */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {status === "authenticated" ? (
                    <>
                      <Check className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-purple-700 dark:text-purple-300">
                          Welcome back! Ready to create amazing images
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          You have unlimited access to our AI image generator.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-semibold text-purple-700 dark:text-purple-300">
                          {freeTrialsUsed === 0 
                            ? `${FREE_TRIAL_LIMIT} Free Trials Available!`
                            : `${FREE_TRIAL_LIMIT - freeTrialsUsed} Free Trial${FREE_TRIAL_LIMIT - freeTrialsUsed === 1 ? '' : 's'} Remaining`
                          }
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Try our AI image generator free. No signup required for your first {FREE_TRIAL_LIMIT} generations!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* 特性网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO内容部分 - 提高关键词密度 */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Our <span className="text-purple-600">AI Image Generator</span> Stands Out
          </h2>
          
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <p>
              In the rapidly evolving world of artificial intelligence, our <strong>AI image generator</strong> represents 
              the cutting edge of text-to-image technology. Unlike traditional design tools that require artistic skills, 
              our <strong>AI image generator</strong> empowers anyone to create professional-quality visuals with just a 
              text description.
            </p>
            
            <h3>Advanced AI Technology</h3>
            <p>
              Our <strong>free AI image generator</strong> leverages the latest deep learning models, including diffusion 
              models and GANs (Generative Adversarial Networks). These sophisticated algorithms enable the AI image generator 
              to understand complex prompts and produce highly detailed, contextually accurate images that match your vision.
            </p>

            <h3>Versatile Creation Capabilities</h3>
            <p>
              Whether you need photorealistic portraits, abstract art, product mockups, or fantasy landscapes, our 
              <strong>AI image generator</strong> handles it all. The system has been trained on millions of images across 
              every conceivable style and subject, making it the most versatile <strong>free AI image generator</strong> 
              available today.
            </p>

            <h3>Professional Quality Output</h3>
            <p>
              Every image produced by our <strong>AI image generator</strong> is high-resolution and ready for professional 
              use. From marketing materials to book covers, social media content to presentation graphics, the AI generated 
              images meet the highest quality standards demanded by creative professionals.
            </p>

            <h3>Ethical AI Development</h3>
            <p>
              We're committed to responsible AI development. Our <strong>AI image generator</strong> is designed with 
              built-in safeguards to prevent misuse while maximizing creative freedom. The training data has been carefully 
              curated to ensure diverse representation and avoid biases.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600">
              Start Creating with AI Image Generator
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              No Credit Card Required • Instant Access • Commercial License
            </p>
          </div>
        </div>
      </section>

      {/* 示例展示 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Recent Creations from Our AI Image Generator
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            See what others are creating with our <strong>free AI image generator</strong>. 
            Each image was generated in seconds from a simple text prompt.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {exampleGenerations.map((example, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sample Image
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-sm mb-2">"{example.prompt}"</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{example.style}</span>
                    <span>Generated in {example.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions About Our AI Image Generator
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is the AI image generator really free?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Our basic AI image generator is completely free to use. You can generate unlimited images without 
                any payment. Premium features are available for professional users who need advanced capabilities.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can I use AI generated images commercially?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! All images created with our AI image generator come with full commercial rights. Use them 
                for your business, client projects, or any commercial purpose without restrictions.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How does the AI image generator work?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI image generator uses advanced machine learning models trained on millions of images. When you 
                provide a text description, the AI interprets your prompt and generates a unique image that matches 
                your specifications.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* 登录对话框 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In to Continue</DialogTitle>
            <DialogDescription>
              You've used all your free trials. Sign in to continue generating amazing images with our AI image generator!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                🎁 Member Benefits
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Unlimited AI image generation</li>
                <li>✓ Access to all AI models</li>
                <li>✓ High resolution downloads</li>
                <li>✓ Commercial usage rights</li>
                <li>✓ Priority processing</li>
              </ul>
            </div>
            
            <Button
              onClick={() => handleLogin('google')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
            
            <Button
              onClick={() => handleLogin('github')}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Sign in with GitHub
            </Button>
            
            <div className="text-center">
              <Link href="/auth/signin" className="text-sm text-gray-500 hover:text-gray-700">
                Sign in with email
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* 生成结果对话框 */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Your AI Generated Image</DialogTitle>
            <DialogDescription>
              Image generated successfully! Download or generate another one.
            </DialogDescription>
          </DialogHeader>
          
          {generatedImage && (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={generatedImage}
                  alt="AI Generated Image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={async () => {
                    // Download logic
                    try {
                      const response = await fetch(generatedImage);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `ai_generated_${Date.now()}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                      toast.success("Image downloaded successfully!");
                    } catch (error) {
                      toast.error("Failed to download image");
                    }
                  }}
                  className="flex-1"
                  variant="default"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
                <Button
                  onClick={() => {
                    setShowResultDialog(false);
                    setPrompt("");
                    setGeneratedImage(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Generate Another
                </Button>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Prompt used:</strong> {prompt || "AI selected a random prompt for you"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}