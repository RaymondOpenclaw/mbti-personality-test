'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { useTestSession } from '@/hooks/useTestSession';
import { calculateMBTI, getMBTIResult } from '@/utils/mbtiCalculator';
import { MBTIResult, DimensionScore } from '@/types';

export default function ReportPage() {
  const [mounted, setMounted] = useState(false);
  const { session, questions } = useTestSession();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [dimensions, setDimensions] = useState<DimensionScore[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (session && session.answers.length > 0 && questions.length > 0) {
      try {
        // Validate answers match questions
        if (session.answers.length !== questions.length) {
          console.warn('Answers count does not match questions count');
        }
        const { type, dimensions } = calculateMBTI(session.answers, questions);
        const result = getMBTIResult(type);
        setResult(result);
        setDimensions(dimensions);
      } catch (error) {
        console.error('Error calculating MBTI result:', error);
        setError('生成报告失败，请重新测试');
      }
    }
  }, [session, questions, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-50/50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-gray-600">加载中...</p>
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
          <Link
            href="/test"
            className="mt-4 inline-block rounded-full bg-violet-600 px-6 py-2 text-white hover:bg-violet-700"
          >
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
          <p className="text-gray-600">正在生成报告...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">测试结果</h1>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
                分享
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Download className="h-4 w-4" />
                下载
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          {/* Result Header */}
          <div
            className="relative px-8 py-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${result.type.startsWith('I') ? '#8B5CF6' : '#EC4899'}, ${result.type.startsWith('E') ? '#F59E0B' : '#3B82F6'})`
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

            {/* Decorative elements */}
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10" />
            <div className="absolute right-20 bottom-10 h-32 w-32 rounded-full bg-white/10" />
          </div>

          {/* Dimensions Chart */}
          <div className="border-b border-gray-100 px-8 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">四维度分析</h3>
            <div className="space-y-6">
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
                      {Math.round(dim.percentage)}%
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                    {/* Result indicator */}
                    <div
                      className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-gray-900 shadow-md"
                      style={{ left: dim.result === dim.dimension.split('_')[0] ? '5%' : '95%' }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>{dim.leftScore}</span>
                    <span>{dim.rightScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="px-8 py-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">类型概述</h3>
            <p className="text-gray-600 leading-relaxed">
              {result.description}
            </p>

            {/* Strengths */}
            <div className="mt-8">
              <h4 className="mb-3 text-base font-semibold text-gray-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                核心优势
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="mt-6">
              <h4 className="mb-3 text-base font-semibold text-gray-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs">!</span>
                潜在盲点
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upgrade CTA (for free reports) */}
          {!isPaid && (
            <div className="border-t border-gray-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-8 py-8">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    解锁完整深度报告
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    获取20+页详细分析，包括职业匹配、恋爱兼容性和个人成长建议
                  </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5">
                  ¥19.9 解锁报告
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <RefreshCw className="h-5 w-5" />
            重新测试
          </Link>
          <Link
            href="/types"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
          >
            探索其他类型
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
