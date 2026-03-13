'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Download, MessageCircle, ChevronRight } from 'lucide-react';
import { useTestSession } from '@/hooks/useTestSession';
import { calculateMBTI, getMBTIResult } from '@/utils/mbtiCalculator';
import { MBTIResult, DimensionScore } from '@/types';

export default function TestResultPage() {
  const [mounted, setMounted] = useState(false);
  const { session, questions } = useTestSession();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [dimensions, setDimensions] = useState<DimensionScore[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">您的 MBTI 人格报告</h1>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
                分享
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
              <p className="mb-2 text-lg font-medium text-white/90">您的人格类型是</p>
              <h2 className="text-6xl font-bold text-white tracking-tight sm:text-7xl">
                {result.type}
              </h2>
              <p className="mt-4 text-2xl font-semibold text-white">
                {result.nickname}
              </p>
            </div>
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10" />
            <div className="absolute right-20 bottom-10 h-32 w-32 rounded-full bg-white/10" />
          </div>

          {/* 四维度分析 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">四维度分析</h3>
            <div className="space-y-5">
              {dimensions.map((dim) => (
                <div key={dim.dimension} className="relative">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-600">
                      {dim.dimension === 'E_I' && '外向 (E) / 内向 (I)'}
                      {dim.dimension === 'S_N' && '实感 (S) / 直觉 (N)'}
                      {dim.dimension === 'T_F' && '思维 (T) / 情感 (F)'}
                      {dim.dimension === 'J_P' && '判断 (J) / 知觉 (P)'}
                    </span>
                    <span className="font-semibold text-violet-600">
                      {Math.round(dim.percentage)}% {dim.result}
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 类型概述 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">类型概述</h3>
            <p className="text-gray-600 leading-relaxed">{result.description}</p>
          </div>

          {/* 核心优势 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
              核心优势
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {result.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* 潜在盲点 */}
          <div className="px-6 py-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs">!</span>
              潜在盲点
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {result.weaknesses?.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 微信引导卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-1 shadow-xl"
        >
          <div className="rounded-3xl bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">获取完整深度报告</h3>
              <p className="mb-6 text-gray-600 max-w-md">
                扫码添加专业咨询师微信，免费领取 20+ 页详细人格分析报告，包含职业匹配、恋爱兼容性和个人成长建议
              </p>

              {/* 二维码区域 */}
              <div className="mb-6 rounded-2xl bg-gray-50 p-6 border-2 border-dashed border-gray-200">
                <div className="h-48 w-48 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-sm text-gray-500">微信二维码</p>
                    <p className="text-xs text-gray-400 mt-1">请替换为您的微信二维码</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                已有 12,580+ 人获取了完整报告
              </div>

              <div className="text-xs text-gray-400 max-w-sm">
                添加微信后回复「MBTI」即可领取报告，我们承诺保护您的隐私信息
              </div>
            </div>
          </div>
        </motion.div>

        {/* 操作按钮 */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg"
          >
            <RefreshCw className="h-5 w-5" />
            重新测试
          </Link>
          <Link
            href="/types"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl"
          >
            探索其他类型
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
