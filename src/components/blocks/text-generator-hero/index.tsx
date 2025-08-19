/**
 * AI Text Generator Component
 * 支持多个AI模型的文本生成工具
 * 包括GPT-4, DeepSeek R1, Claude等
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare,
  Send,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Brain,
  Zap,
  Shield,
  ChevronDown,
  Check,
  Gift,
  TrendingUp,
  Bot,
  FileText,
  Code,
  PenTool,
  BookOpen,
  Briefcase
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TextGeneratorHero() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [selectedTask, setSelectedTask] = useState("general");
  const [freeTrialsUsed, setFreeTrialsUsed] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [generationCount, setGenerationCount] = useState(1234567);
  
  const FREE_TRIAL_LIMIT = 3; // 文本生成提供3次免费试用

  // 客户端初始化
  useEffect(() => {
    const savedTrials = localStorage.getItem('textFreeTrialsUsed');
    if (savedTrials) {
      setFreeTrialsUsed(parseInt(savedTrials));
    }
    
    // 模拟实时计数
    const interval = setInterval(() => {
      setGenerationCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // AI模型选项
  const modelOptions = [
    { 
      id: "gpt-4o", 
      name: "GPT-4o", 
      provider: "OpenAI",
      description: "Most advanced language model",
      badge: "Popular"
    },
    { 
      id: "gpt-4o-mini", 
      name: "GPT-4o Mini", 
      provider: "OpenAI",
      description: "Fast and efficient",
      badge: null
    },
    { 
      id: "deepseek-chat", 
      name: "DeepSeek Chat", 
      provider: "DeepSeek",
      description: "Powerful Chinese-English model",
      badge: "New"
    },
    { 
      id: "deepseek-r1", 
      name: "DeepSeek R1", 
      provider: "DeepSeek",
      description: "Advanced reasoning model",
      badge: "Hot"
    },
    { 
      id: "llama-3.3", 
      name: "Llama 3.3", 
      provider: "Meta",
      description: "Open-source powerhouse",
      badge: "Free"
    },
    { 
      id: "qwen-2.5", 
      name: "Qwen 2.5", 
      provider: "Alibaba",
      description: "Multilingual excellence",
      badge: null
    }
  ];

  // 任务类型
  const taskTypes = [
    { id: "general", name: "General Writing", icon: <FileText className="w-4 h-4" /> },
    { id: "creative", name: "Creative Writing", icon: <PenTool className="w-4 h-4" /> },
    { id: "code", name: "Code Generation", icon: <Code className="w-4 h-4" /> },
    { id: "academic", name: "Academic Writing", icon: <BookOpen className="w-4 h-4" /> },
    { id: "business", name: "Business Content", icon: <Briefcase className="w-4 h-4" /> },
    { id: "chat", name: "Conversational", icon: <MessageSquare className="w-4 h-4" /> }
  ];

  // 示例提示词
  const examplePrompts = [
    "Write a compelling product description for an AI-powered smartwatch",
    "Explain quantum computing to a 10-year-old",
    "Create a Python function to calculate fibonacci numbers",
    "Draft a professional email declining a meeting invitation",
    "Write a short story about a time traveler in ancient Rome",
    "Generate 5 creative marketing slogans for eco-friendly products"
  ];

  // 默认提示词（当用户不输入时）
  const defaultPrompts = [
    "Explain the benefits of artificial intelligence in healthcare",
    "Write a motivational quote about perseverance and success",
    "Create a simple recipe for a healthy breakfast smoothie",
    "Describe the future of transportation in 2050",
    "Write tips for improving productivity while working from home",
    "Explain the importance of cybersecurity in simple terms"
  ];

  const handleGenerate = async () => {
    const finalPrompt = prompt.trim() || defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];
    
    if (status === "authenticated") {
      await performGeneration(finalPrompt);
    } else {
      if (freeTrialsUsed < FREE_TRIAL_LIMIT) {
        await performGeneration(finalPrompt);
        const newTrialsUsed = freeTrialsUsed + 1;
        setFreeTrialsUsed(newTrialsUsed);
        localStorage.setItem('textFreeTrialsUsed', newTrialsUsed.toString());
        
        if (newTrialsUsed === FREE_TRIAL_LIMIT) {
          toast.info("You've used all your free trials. Please sign in to continue!");
        } else {
          toast.success(`Text generated! ${FREE_TRIAL_LIMIT - newTrialsUsed} free trial${FREE_TRIAL_LIMIT - newTrialsUsed === 1 ? '' : 's'} remaining.`);
        }
      } else {
        setShowLoginDialog(true);
        toast.error("Free trials exhausted. Please sign in to continue!");
      }
    }
  };

  const performGeneration = async (finalPrompt: string) => {
    setIsGenerating(true);
    setGeneratedText("");
    
    try {
      // 根据选择的模型调用相应的API
      const apiEndpoint = selectedModel.includes('deepseek') 
        ? '/api/demo/gen-text-deepseek'
        : '/api/demo/gen-text-openai';
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant specialized in ${taskTypes.find(t => t.id === selectedTask)?.name}.`
            },
            {
              role: "user",
              content: finalPrompt
            }
          ],
          model: selectedModel,
          stream: false,
          temperature: selectedTask === "creative" ? 0.9 : 0.7,
          max_tokens: 1000
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.data?.content) {
        setGeneratedText(result.data.content);
        setGenerationCount(prev => prev + 1);
        
        if (!prompt.trim()) {
          setPrompt(finalPrompt);
        }
      } else {
        throw new Error(result.message || "Failed to generate text");
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate text. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success("Text copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_generated_text_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Text downloaded successfully!");
  };

  const handleLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/tools/text-generator' });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 pt-20 pb-16">
          {/* 信任徽章 */}
          <div className="flex justify-center mb-8">
            <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              {generationCount.toLocaleString()}+ Texts Generated Today
            </Badge>
          </div>

          {/* 标题 */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            AI Text Generator
            <span className="block text-3xl md:text-5xl mt-2">
              Powered by GPT-4 & DeepSeek
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Generate high-quality content with the world's most advanced AI language models. 
            From creative writing to code generation.
          </p>

          {/* 主要生成界面 */}
          <Card className="max-w-5xl mx-auto p-8 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur">
            <div className="space-y-6">
              {/* 模型和任务选择 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">AI Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modelOptions.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-gray-500">{model.provider} - {model.description}</div>
                            </div>
                            {model.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {model.badge}
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Task Type</label>
                  <Select value={selectedTask} onValueChange={setSelectedTask}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map(task => (
                        <SelectItem key={task.id} value={task.id}>
                          <div className="flex items-center gap-2">
                            {task.icon}
                            <span>{task.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 输入区域 */}
              <div>
                <label htmlFor="prompt" className="block text-lg font-semibold mb-3">
                  Enter Your Prompt
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your prompt or leave empty for a random prompt (e.g., Write a blog post about renewable energy...)"
                  className="min-h-[150px] text-lg"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    Be specific for better results. Leave empty for a random prompt.
                  </p>
                  <span className="text-sm text-gray-500">
                    {prompt.length} characters
                  </span>
                </div>
              </div>

              {/* 示例提示词 */}
              <div>
                <p className="text-sm font-medium mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.slice(0, 3).map((example, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(example)}
                      className="text-xs"
                    >
                      {example.substring(0, 50)}...
                    </Button>
                  ))}
                </div>
              </div>

              {/* 生成按钮 */}
              <Button
                size="lg"
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Text...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Text
                  </>
                )}
              </Button>

              {/* 免费试用提示 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {status === "authenticated" ? (
                    <>
                      <Check className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-700 dark:text-blue-300">
                          Unlimited Access Active
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          You have full access to all AI models and features.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-700 dark:text-blue-300">
                          {freeTrialsUsed === 0 
                            ? `${FREE_TRIAL_LIMIT} Free Trials Available!`
                            : `${FREE_TRIAL_LIMIT - freeTrialsUsed} Free Trial${FREE_TRIAL_LIMIT - freeTrialsUsed === 1 ? '' : 's'} Remaining`
                          }
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Try our AI text generator free. No signup required!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 生成结果区域 */}
              {generatedText && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Generated Text</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerate()}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans">
                        {generatedText}
                      </pre>
                    </div>
                  </Card>

                  <Alert>
                    <AlertDescription>
                      Generated with {modelOptions.find(m => m.id === selectedModel)?.name} • 
                      Task: {taskTypes.find(t => t.id === selectedTask)?.name}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </Card>

          {/* 特性卡片 */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Brain className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">6+ AI Models</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access GPT-4, DeepSeek, Llama, and more cutting-edge models
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate high-quality content in seconds, not minutes
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is encrypted and never used for training
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Multi-Purpose</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                From creative writing to technical documentation
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
              You&apos;ve used all your free trials. Sign in to continue generating text with our AI models!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                🎁 Member Benefits
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Unlimited text generation</li>
                <li>✓ Access to all AI models</li>
                <li>✓ Advanced features & settings</li>
                <li>✓ Priority processing</li>
                <li>✓ Export in multiple formats</li>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}