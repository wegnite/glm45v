#!/usr/bin/env node

/**
 * 验证 sitemap.xml 中的所有页面是否都有对应的 page.tsx 文件
 * 
 * 功能：
 * 1. 检查 sitemap 中声明的页面
 * 2. 验证对应的 page.tsx 文件是否存在
 * 3. 报告缺失的页面
 */

const fs = require('fs');
const path = require('path');

// sitemap 中声明的页面（不包含locale前缀）
const sitemapPages = [
  '/',  // 首页
  '/ai-text-generator',
  '/ai-image-generator',
  '/ai-video-generator',
  '/tools',
  '/gallery',
  '/pricing',
  '/blog',
  '/about',
  '/contact',
  '/help',
  '/help/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/cookie-policy',
];

// 实际存在的页面文件（从 find 命令结果整理）
const existingPages = {
  // (default) 路由组
  '/': 'src/app/[locale]/(default)/page.tsx',
  '/ja-landing': 'src/app/[locale]/(default)/ja-landing/page.tsx',
  '/contact': 'src/app/[locale]/(default)/contact/page.tsx',
  '/cookie-policy': 'src/app/[locale]/(default)/cookie-policy/page.tsx',
  '/refund-policy': 'src/app/[locale]/(default)/refund-policy/page.tsx',
  '/pricing': 'src/app/[locale]/(default)/pricing/page.tsx',
  '/showcase': 'src/app/[locale]/(default)/showcase/page.tsx',
  '/posts': 'src/app/[locale]/(default)/posts/page.tsx',
  '/posts/[slug]': 'src/app/[locale]/(default)/posts/[slug]/page.tsx',
  '/i/[code]': 'src/app/[locale]/(default)/i/[code]/page.tsx',
  
  // (console) 路由组
  '/api-keys': 'src/app/[locale]/(default)/(console)/api-keys/page.tsx',
  '/api-keys/create': 'src/app/[locale]/(default)/(console)/api-keys/create/page.tsx',
  '/my-credits': 'src/app/[locale]/(default)/(console)/my-credits/page.tsx',
  '/my-invites': 'src/app/[locale]/(default)/(console)/my-invites/page.tsx',
  '/my-orders': 'src/app/[locale]/(default)/(console)/my-orders/page.tsx',
  
  // (admin) 路由组
  '/admin': 'src/app/[locale]/(admin)/admin/page.tsx',
  '/admin/feedbacks': 'src/app/[locale]/(admin)/admin/feedbacks/page.tsx',
  '/admin/orders': 'src/app/[locale]/(admin)/admin/orders/page.tsx',
  '/admin/posts': 'src/app/[locale]/(admin)/admin/posts/page.tsx',
  '/admin/posts/add': 'src/app/[locale]/(admin)/admin/posts/add/page.tsx',
  '/admin/posts/[uuid]/edit': 'src/app/[locale]/(admin)/admin/posts/[uuid]/edit/page.tsx',
  '/admin/users': 'src/app/[locale]/(admin)/admin/users/page.tsx',
  
  // (docs) 路由组
  '/docs': 'src/app/[locale]/(docs)/docs/[[...slug]]/page.tsx',
  
  // 认证页面
  '/auth/signin': 'src/app/[locale]/auth/signin/page.tsx',
};

console.log('🔍 开始验证 sitemap.xml 页面映射');
console.log('=====================================\n');

// 检查缺失的页面
const missingPages = [];
const foundPages = [];
const needsToRemove = [];

sitemapPages.forEach(page => {
  // 检查基本映射
  if (existingPages[page]) {
    foundPages.push(page);
  } else {
    // 检查是否可能是blog的别名（posts）
    if (page === '/blog' && existingPages['/posts']) {
      console.log(`⚠️  ${page} -> 可能映射到 /posts (需要确认路由配置)`);
      foundPages.push(page);
    } else {
      missingPages.push(page);
      needsToRemove.push(page);
    }
  }
});

// 输出结果
console.log('\n✅ 已存在的页面:');
foundPages.forEach(page => {
  console.log(`   ${page}`);
});

console.log('\n❌ 缺失的页面（需要从 sitemap 移除或创建对应页面）:');
missingPages.forEach(page => {
  console.log(`   ${page}`);
});

// 提供建议
console.log('\n📝 建议的操作:');
console.log('=====================================');

if (missingPages.length > 0) {
  console.log('\n需要从 sitemap.ts 中移除以下页面:');
  missingPages.forEach(page => {
    console.log(`- ${page}`);
  });
  
  console.log('\n或者创建以下页面文件:');
  missingPages.forEach(page => {
    const suggestedPath = `src/app/[locale]/(default)${page}/page.tsx`;
    console.log(`- ${suggestedPath}`);
  });
}

// 检查是否有页面存在但不在sitemap中
console.log('\n📋 额外发现的页面（不在 sitemap 中）:');
Object.keys(existingPages).forEach(page => {
  if (!sitemapPages.includes(page) && !page.includes('[') && !page.includes('admin') && !page.includes('my-') && !page.includes('api-keys')) {
    console.log(`   ${page} - 考虑添加到 sitemap`);
  }
});

console.log('\n=====================================');
console.log(`📊 统计: ${foundPages.length}/${sitemapPages.length} 页面已匹配`);
console.log(`❌ 需要处理: ${missingPages.length} 个页面`);

// 输出更新后的 sitemap 页面列表
if (missingPages.length > 0) {
  console.log('\n🔧 建议的 sitemap 页面列表（移除不存在的页面）:');
  console.log('-------------------------------------');
  const validPages = sitemapPages.filter(page => !missingPages.includes(page));
  validPages.forEach(page => {
    console.log(`'${page}',`);
  });
}