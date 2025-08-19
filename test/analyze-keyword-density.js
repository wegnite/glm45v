#!/usr/bin/env node

/**
 * 关键词密度分析工具
 * 用于验证SEO优化效果
 */

const fs = require('fs');
const path = require('path');

/**
 * 提取文本内容，移除HTML标签和JSX
 */
function extractText(content) {
  // 移除JSX/HTML标签
  let text = content.replace(/<[^>]*>/g, ' ');
  // 移除代码块
  text = text.replace(/```[\s\S]*?```/g, ' ');
  text = text.replace(/`[^`]*`/g, ' ');
  // 移除import语句
  text = text.replace(/import .* from .*/g, ' ');
  // 移除export语句
  text = text.replace(/export .*/g, ' ');
  // 移除JavaScript代码特征
  text = text.replace(/const |let |var |function |return |if |else |for |while /g, ' ');
  text = text.replace(/[{}()[\];]/g, ' ');
  // 移除多余空格
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * 计算关键词密度
 */
function calculateKeywordDensity(text, keyword) {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  
  // 计算关键词出现次数
  const regex = new RegExp(`\\b${lowerKeyword}\\b`, 'gi');
  const matches = text.match(regex) || [];
  const count = matches.length;
  
  // 计算总词数
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const totalWords = words.length;
  
  // 计算密度
  const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
  
  return {
    count,
    totalWords,
    density: density.toFixed(2)
  };
}

/**
 * 分析Weather Icons组件
 */
function analyzeWeatherIconsComponent() {
  const filePath = path.join(__dirname, '../src/components/blocks/weather-icons-hero/index.tsx');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const text = extractText(content);
    
    console.log('🔍 Weather Icons Hero 组件关键词密度分析');
    console.log('=====================================\n');
    
    // 分析主关键词
    const mainKeyword = 'weather icons';
    const mainResult = calculateKeywordDensity(text, mainKeyword);
    
    console.log(`📊 主关键词: "${mainKeyword}"`);
    console.log(`   出现次数: ${mainResult.count} 次`);
    console.log(`   总词数: ${mainResult.totalWords} 词`);
    console.log(`   关键词密度: ${mainResult.density}%`);
    console.log(`   目标密度: 3-5%`);
    console.log(`   状态: ${mainResult.density >= 3 && mainResult.density <= 5 ? '✅ 达标' : '❌ 需要调整'}`);
    
    // 分析次要关键词
    console.log('\n📊 次要关键词: "weather app icon"');
    const secondaryResult = calculateKeywordDensity(text, 'weather app icon');
    console.log(`   出现次数: ${secondaryResult.count} 次`);
    console.log(`   关键词密度: ${secondaryResult.density}%`);
    console.log(`   目标密度: 1-2%`);
    console.log(`   状态: ${secondaryResult.density >= 1 && secondaryResult.density <= 2 ? '✅ 达标' : '❌ 需要调整'}`);
    
    // 分析相关关键词
    console.log('\n📊 相关关键词分析:');
    const relatedKeywords = [
      'weather',
      'icons',
      'icon',
      'app',
      'download',
      'free',
      'svg',
      'png'
    ];
    
    relatedKeywords.forEach(keyword => {
      const result = calculateKeywordDensity(text, keyword);
      console.log(`   "${keyword}": ${result.count} 次 (${result.density}%)`);
    });
    
    // 内容长度分析
    console.log('\n📏 内容长度分析:');
    console.log(`   总词数: ${mainResult.totalWords} 词`);
    console.log(`   目标: 600-800 词`);
    console.log(`   状态: ${mainResult.totalWords >= 600 && mainResult.totalWords <= 800 ? '✅ 达标' : '❌ 需要调整'}`);
    
    // 提供优化建议
    console.log('\n💡 优化建议:');
    
    if (mainResult.density < 3) {
      console.log('   - 主关键词 "weather icons" 密度偏低，建议增加使用频率');
      const needed = Math.ceil((3 * mainResult.totalWords / 100) - mainResult.count);
      console.log(`     需要增加约 ${needed} 次使用`);
    } else if (mainResult.density > 5) {
      console.log('   - 主关键词 "weather icons" 密度偏高，可能被视为关键词堆砌');
      const excess = Math.floor(mainResult.count - (5 * mainResult.totalWords / 100));
      console.log(`     建议减少约 ${excess} 次使用`);
    } else {
      console.log('   - 主关键词密度完美！');
    }
    
    if (secondaryResult.density < 1) {
      console.log('   - 次要关键词 "weather app icon" 密度偏低');
      const needed = Math.ceil((1 * mainResult.totalWords / 100) - secondaryResult.count);
      console.log(`     需要增加约 ${needed} 次使用`);
    } else if (secondaryResult.density > 2) {
      console.log('   - 次要关键词 "weather app icon" 密度偏高');
      const excess = Math.floor(secondaryResult.count - (2 * mainResult.totalWords / 100));
      console.log(`     建议减少约 ${excess} 次使用`);
    } else {
      console.log('   - 次要关键词密度完美！');
    }
    
    if (mainResult.totalWords < 600) {
      console.log(`   - 内容长度不足，建议增加 ${600 - mainResult.totalWords} 词`);
    } else if (mainResult.totalWords > 800) {
      console.log(`   - 内容过长，建议精简 ${mainResult.totalWords - 800} 词`);
    } else {
      console.log('   - 内容长度适中！');
    }
    
  } catch (error) {
    console.error('❌ 无法读取文件:', error.message);
  }
}

// 运行分析
console.log('🚀 开始SEO关键词密度分析');
console.log('=====================================\n');
analyzeWeatherIconsComponent();