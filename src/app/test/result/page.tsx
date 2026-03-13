'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, MessageCircle, ChevronRight, Users, Sparkles, Lock, Zap, Target, Lightbulb, Heart } from 'lucide-react';
import { useTestSession } from '@/hooks/useTestSession';
import { calculateMBTI, getMBTIResult } from '@/utils/mbtiCalculator';
import { MBTIResult, DimensionScore } from '@/types';
import { RadarChart } from '@/components/RadarChart';
import { SharePoster } from '@/components/SharePoster';

export default function TestResultPage() {
  const [mounted, setMounted] = useState(false);
  const { session, questions } = useTestSession();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [dimensions, setDimensions] = useState<DimensionScore[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (session && session.answers.length > 0 && questions.length > 0) {
      try {
        const { type, dimensions } = calculateMBTI(session.answers, questions);
        const resultData = getMBTIResult(type);
        setResult({ ...resultData, dimensions } as MBTIResult);
        setDimensions(dimensions);
      } catch (error) {
        console.error('Error calculating MBTI result:', error);
        setError('生成报告失败，请重新测试');
      }
    }
  }, [session, questions, mounted]);

  const handleShare = () => {
    if (result?.type) {
      setShowPoster(true);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-50/50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-gray-600">正在分析您的人格类型...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-50/50 to-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">出错了</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link href="/test" className="mt-4 inline-block rounded-full bg-violet-600 px-6 py-2 text-white hover:bg-violet-700">
            重新测试
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-50/50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-gray-600">正在生成您的专属报告...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white pb-20">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">您的 MBTI 人格报告</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                分享
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 人格类型卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          {/* 类型标题区 */}
          <div
            className="relative px-8 py-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${result.type?.startsWith('I') ? '#8B5CF6' : '#EC4899'}, ${result.type?.startsWith('E') ? '#F59E0B' : '#3B82F6'})`
            }}
          >
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 text-lg font-medium text-white/90"
              >
                您的人格类型是
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl font-bold text-white tracking-tight sm:text-7xl"
              >
                {result.type}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-2xl font-semibold text-white"
              >
                {result.nickname}
              </motion.p>
            </div>
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10 animate-pulse" />
            <div className="absolute right-20 bottom-10 h-32 w-32 rounded-full bg-white/10" />
          </div>

          {/* 四维度雷达图 + 进度条 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              四维度分析
            </h3>

            {/* 雷达图 */}
            <div className="mb-8 flex justify-center">
              <RadarChart dimensions={dimensions} size={320} />
            </div>
          </div>

          {/* 类型概述 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">类型概述</h3>
            <p className="text-gray-600 leading-relaxed">{result.description}</p>
          </div>

          {/* 核心优势 - 故事化 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              你的超能力
            </h3>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                想象一下，当其他人还在为混乱的局势感到困惑时，你已经凭借着
                <span className="font-semibold text-amber-700">{result.strengths?.[0]}</span>
                的特质，迅速理清了头绪。这种与生俱来的天赋让你在人群中脱颖而出。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                你不仅{result.strengths?.[1]}，更重要的是，你懂得如何将这种能力转化为实际的成果。
                无论是面对复杂的工作项目还是日常的人际关系，你总能找到最高效的解决方案。
              </p>
              <p className="text-gray-700 leading-relaxed">
                你的{result.strengths?.[2]}让你在团队中成为不可或缺的存在，
                而<span className="font-semibold text-amber-700">{result.strengths?.[3]}</span>
                则是你建立深厚人际关系的秘密武器。这些优势组合在一起，构成了你独特的人格魅力。
              </p>
            </div>
          </div>

          {/* 潜在盲点 - 故事化 */}
          <div className="px-6 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5 text-rose-500" />
              成长的契机
            </h3>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                每个超能力背后都有一个需要注意的平衡点。有时候，
                <span className="font-semibold text-rose-700">{result.weaknesses?.[0]}</span>
                可能会让你在快速变化的环境中感到不适。但这并不是缺陷，而是一个可以开发的成长空间。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                当你发现自己{result.weaknesses?.[1]}时，试着把它当作一个信号——
                提醒你暂停一下，从不同的角度审视情况。这种自我意识本身就是一种强大的能力。
              </p>
              <p className="text-gray-700 leading-relaxed">
                记住，{result.weaknesses?.[2]}和{result.weaknesses?.[3]}只是你人格光谱中需要更多关注的区域。
                通过有意识的练习，这些都可以转化为你的次级优势。成长的过程，就是不断扩展舒适区的过程。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 微信引导卡片 - 优化版 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-1 shadow-xl"
        >
          <div className="rounded-3xl bg-white p-6">
            {/* 头部标签 */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1 text-xs font-semibold text-amber-700">
                <Sparkles className="h-3 w-3" />
                限时免费
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-500/30">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-gray-900">解锁完整深度报告</h3>
              <p className="mb-6 text-gray-600 max-w-sm">
                添加专业咨询师微信，免费领取 <span className="font-semibold text-violet-600">20+页</span> 详细人格分析
              </p>

              {/* 报告内容预览 - 已去掉恋爱兼容性 */}
              <div className="w-full mb-6 bg-gray-50 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xs">✓</span>
                    职业匹配建议
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xs">✓</span>
                    个人成长路径
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xs">✓</span>
                    人际关系指南
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-xs">✓</span>
                    认知功能解析
                  </div>
                </div>
              </div>

              {/* 二维码区域 */}
              <div className="mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 border-2 border-dashed border-gray-200">
                <div className="h-44 w-44 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <div className="text-center p-4">
                    <div className="text-5xl mb-2">📱</div>
                    <p className="text-sm font-medium text-gray-700">微信扫一扫</p>
                    <p className="text-xs text-gray-400 mt-1">回复「MBTI」领取报告</p>
                  </div>
                </div>
              </div>

              {/* 社交证明 */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 text-green-500" />
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                已有 <span className="font-semibold text-gray-700">12,580+</span> 人获取了完整报告
              </div>

              <div className="text-xs text-gray-400 max-w-sm flex items-center gap-1">
                <Lock className="h-3 w-3" />
                添加微信后回复「MBTI」即可领取，我们承诺保护您的隐私信息
              </div>
            </div>
          </div>
        </motion.div>

        {/* 操作按钮 */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg hover:bg-gray-50"
          >
            <Share2 className="h-5 w-5" />
            分享结果
          </button>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg hover:bg-gray-50"
          >
            <RefreshCw className="h-5 w-5" />
            重新测试
          </Link>
          <Link
            href="/types"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:bg-violet-700"
          >
            探索其他类型
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* 分享海报弹窗 */}
      <AnimatePresence>
        {showPoster && result?.type && (
          <SharePoster type={result.type} onClose={() => setShowPoster(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
