/**
 * 精品工具站主页 - Premium AI Tools Platform Hero Component
 * 
 * 功能概述：
 * - 展示所有AI工具类别（文本、图像、视频生成）
 * - 提供快速导航到各个工具
 * - 统计和展示平台使用数据
 * - 响应式设计适配移动端
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  MessageSquare,
  Image,
  Video,
  Wand2,
  ArrowRight,
  Search,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  Cpu,
  Palette,
  FileText,
  Code2,
  Music,
  Mic,
  Brain,
  Layers,
  BookOpen,
  PenTool,
  Camera,
  Play,
  Settings2,
  Star,
  ChevronRight,
  Bot,
  Rocket,
  Crown
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ToolsPlatformHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(523456);
  const [totalGenerations, setTotalGenerations] = useState(8234567);
  const [activeTools, setActiveTools] = useState(48);

  // 动画计数效果
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUsers(prev => prev + Math.floor(Math.random() * 10) + 1);
      setTotalGenerations(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // AI工具分类
  const toolCategories = [
    {
      id: "text",
      name: "Text Generation",
      zhName: "文本生成",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "AI-powered text creation and editing",
      tools: [
        { name: "GPT-4o Chat", model: "OpenAI GPT-4o", popular: true },
        { name: "DeepSeek R1", model: "DeepSeek", new: true },
        { name: "Claude 3", model: "Anthropic", popular: true },
        { name: "Llama 3.3", model: "Meta", new: true }
      ],
      link: "/tools/text-generator"
    },
    {
      id: "image",
      name: "Image Generation",
      zhName: "图像生成",
      icon: <Image className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Create stunning visuals from text",
      tools: [
        { name: "FLUX.1 Pro", model: "Black Forest Labs", popular: true },
        { name: "Midjourney V6", model: "Midjourney", popular: true },
        { name: "DALL·E 3", model: "OpenAI", new: true },
        { name: "Stable Diffusion", model: "Stability AI" }
      ],
      link: "/en"
    },
    {
      id: "video",
      name: "Video Generation",
      zhName: "视频生成",
      icon: <Video className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      description: "Transform ideas into dynamic videos",
      tools: [
        { name: "KLING V1.5", model: "Kuaishou", new: true },
        { name: "Runway Gen-3", model: "Runway", popular: true },
        { name: "Pika 1.0", model: "Pika Labs", new: true },
        { name: "Stable Video", model: "Stability AI" }
      ],
      link: "/tools/video-generator"
    },
    {
      id: "audio",
      name: "Audio Generation",
      zhName: "音频生成",
      icon: <Music className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      description: "Create music and voice content",
      tools: [
        { name: "ElevenLabs", model: "Voice AI", popular: true },
        { name: "Suno AI", model: "Music Generation", new: true },
        { name: "Mubert", model: "AI Music" },
        { name: "Replica", model: "Voice Cloning" }
      ],
      link: "/tools/audio-generator"
    },
    {
      id: "code",
      name: "Code Generation",
      zhName: "代码生成",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      description: "AI-assisted coding and development",
      tools: [
        { name: "GitHub Copilot", model: "OpenAI Codex", popular: true },
        { name: "Cursor", model: "AI IDE", new: true },
        { name: "Codeium", model: "AI Autocomplete" },
        { name: "Tabnine", model: "AI Assistant" }
      ],
      link: "/tools/code-generator"
    },
    {
      id: "design",
      name: "Design Tools",
      zhName: "设计工具",
      icon: <Palette className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      borderColor: "border-pink-200 dark:border-pink-800",
      description: "AI-powered design and creativity",
      tools: [
        { name: "Canva AI", model: "Design Assistant", popular: true },
        { name: "Figma AI", model: "UI/UX Helper", new: true },
        { name: "Adobe Firefly", model: "Creative AI" },
        { name: "Framer AI", model: "Web Design" }
      ],
      link: "/tools/design"
    }
  ];

  // 热门工具快速访问
  const quickAccessTools = [
    { name: "ChatGPT", icon: <Bot />, gradient: "from-green-400 to-blue-500", link: "/tools/chatgpt" },
    { name: "Image AI", icon: <Camera />, gradient: "from-purple-400 to-pink-500", link: "/en" },
    { name: "Video AI", icon: <Play />, gradient: "from-blue-400 to-cyan-500", link: "/tools/video" },
    { name: "Voice AI", icon: <Mic />, gradient: "from-orange-400 to-red-500", link: "/tools/voice" },
    { name: "Code AI", icon: <Code2 />, gradient: "from-indigo-400 to-purple-500", link: "/tools/code" },
    { name: "More Tools", icon: <Layers />, gradient: "from-gray-400 to-gray-600", link: "/tools" }
  ];

  // 平台特性
  const platformFeatures = [
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "48+ AI Models",
      description: "Access to all major AI providers"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Ready",
      description: "Secure, scalable, and reliable"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global CDN",
      description: "Fast response worldwide"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Real-time Processing",
      description: "Instant AI generation"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-200/30 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 pt-20 pb-16">
          {/* 顶部徽章 */}
          <div className="flex justify-center mb-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <Crown className="w-4 h-4 mr-2" />
              Premium AI Tools Platform
            </Badge>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Universal Generator
            </span>
            <span className="block text-3xl md:text-5xl mt-4 text-gray-800 dark:text-gray-200">
              全能AI生成器平台
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            One platform, infinite possibilities. Access 48+ cutting-edge AI models for text, image, video, audio, and more.
          </p>

          {/* 搜索栏 */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search AI tools... (e.g., image generator, GPT-4, video creator)"
                className="pl-12 pr-32 py-6 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Explore
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          {/* 快速访问工具 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
            {quickAccessTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.link}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex flex-col items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} text-white mb-2`}>
                      {tool.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {activeTools}+
              </div>
              <div className="text-sm text-gray-500">AI Tools</div>
            </div>
            <div className="text-center border-x border-gray-200 dark:border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {(totalUsers / 1000).toFixed(0)}K+
              </div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {(totalGenerations / 1000000).toFixed(1)}M+
              </div>
              <div className="text-sm text-gray-500">Generations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具分类展示 */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore AI Tools by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose from our comprehensive collection of AI-powered tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {toolCategories.map((category) => (
              <Card 
                key={category.id}
                className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group ${category.borderColor}`}
                onClick={() => handleCategoryClick(category.link)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative p-6">
                  {/* 头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* 标题和描述 */}
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{category.zhName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>

                  {/* 工具列表 */}
                  <div className="space-y-2">
                    {category.tools.slice(0, 3).map((tool, index) => (
                      <div key={index} className="flex items-center justify-between py-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tool.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{tool.model}</span>
                          {tool.popular && (
                            <Badge variant="secondary" className="text-xs">Hot</Badge>
                          )}
                          {tool.new && (
                            <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">New</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {category.tools.length > 3 && (
                      <div className="text-xs text-gray-500 pt-1">
                        +{category.tools.length - 3} more tools
                      </div>
                    )}
                  </div>

                  {/* 底部按钮 */}
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 group-hover:bg-gray-50 dark:group-hover:bg-gray-700"
                  >
                    Explore {category.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 平台特性 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Built for creators, developers, and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA按钮 */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => router.push('/auth/signin')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating for Free
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Instant access • 2 free trials
            </p>
          </div>
        </div>
      </section>

      {/* 最新更新 */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Latest Updates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What&apos;s New
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <Badge className="mb-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">New Model</Badge>
              <h3 className="font-bold mb-2">DeepSeek R1 Released</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Experience the latest reasoning model with enhanced logical capabilities
              </p>
            </Card>
            <Card className="p-6">
              <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Update</Badge>
              <h3 className="font-bold mb-2">FLUX.1 Pro Available</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate ultra-realistic images with the newest FLUX model
              </p>
            </Card>
            <Card className="p-6">
              <Badge className="mb-3 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Feature</Badge>
              <h3 className="font-bold mb-2">Video Generation Live</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create stunning videos with KLING V1.5 and Runway Gen-3
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}