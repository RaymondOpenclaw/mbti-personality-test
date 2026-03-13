'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, MessageCircle, ChevronRight, Users, Sparkles, Lock, Zap, Target, ChevronDown, ChevronUp, Copy, Check, History, Building2 } from 'lucide-react';
import { useTestSession } from '@/hooks/useTestSession';
import { calculateMBTI, getMBTIResult } from '@/utils/mbtiCalculator';
import { MBTIResult, DimensionScore } from '@/types';
import { RadarChart } from '@/components/RadarChart';
import { SharePoster } from '@/components/SharePoster';
import { saveTestResult, getAllTests, StoredTest } from '@/utils/testStorage';

export default function TestResultPage() {
  const [mounted, setMounted] = useState(false);
  const { session, questions } = useTestSession();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [dimensions, setDimensions] = useState<DimensionScore[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [testId, setTestId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [pastTests, setPastTests] = useState<StoredTest[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (session && session.answers.length > 0 && questions.length > 0) {
      try {
        const { type, dimensions } = calculateMBTI(session.answers, questions);
        const resultData = getMBTIResult(type);
        const fullResult = { ...resultData, dimensions } as MBTIResult;
        setResult(fullResult);
        setDimensions(dimensions);

        // 保存测试结果
        const id = saveTestResult({
          type: type,
          nickname: resultData.nickname,
          dimensions: dimensions
        });
        setTestId(id);

        // 加载历史测试
        setPastTests(getAllTests().slice(-5).reverse());
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

  const handleCopyId = () => {
    navigator.clipboard.writeText(testId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        {/* 测试ID卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-4 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-violet-100">您的测试编号</p>
              <p className="text-2xl font-bold font-mono">{testId}</p>
            </div>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm hover:bg-white/30 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <p className="mt-2 text-xs text-violet-200">
            保存此编号，可随时查看报告
          </p>
        </motion.div>

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

          {/* 四维度雷达图 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              四维度分析
            </h3>
            <div className="mb-8 flex justify-center">
              <RadarChart dimensions={dimensions} size={320} />
            </div>
          </div>

          {/* 分层报告 - 基础版 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">类型概述</h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                免费版
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{result.description}</p>
          </div>

          {/* 分层报告 - 核心优势 */}
          <div className="border-b border-gray-100 px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                你的超能力
              </h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                免费版
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                想象一下，当其他人还在为混乱的局势感到困惑时，你已经凭借着
                <span className="font-semibold text-amber-700">{result.strengths?.[0]}</span>
                的特质，迅速理清了头绪。
              </p>
              {!showFullReport && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/90" />
                  <button
                    onClick={() => setShowFullReport(true)}
                    className="relative w-full py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
                  >
                    查看完整优势分析
                  </button>
                </div>
              )}
              {showFullReport && (
                <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    你不仅{result.strengths?.[1]}，更重要的是，你懂得如何将这种能力转化为实际的成果。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    你的{result.strengths?.[2]}让你在团队中成为不可或缺的存在，
                    而<span className="font-semibold text-amber-700">{result.strengths?.[3]}</span>
                    则是你建立深厚人际关系的秘密武器。
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 分层报告 - 成长契机（锁定） */}
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-rose-500" />
                成长的契机
              </h3>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                完整版
              </span>
            </div>

            <div className="relative rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-6 border border-rose-100">
              <p className="text-gray-700 leading-relaxed blur-sm select-none">
                每个超能力背后都有一个需要注意的平衡点。有时候，{result.weaknesses?.[0]}
                可能会让你在快速变化的环境中感到不适。但这并不是缺陷，而是一个可以开发的成长空间...
              </p>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="text-center p-4">
                  <Lock className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">解锁完整报告</p>
                  <p className="text-sm text-gray-600 mt-1">添加微信获取20+页深度分析</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 微信引导卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-1 shadow-xl"
        >
          <div className="rounded-3xl bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">解锁完整深度报告</h3>
              <p className="mb-6 text-gray-600">
                添加微信获取 <span className="font-semibold text-violet-600">完整版报告</span>
              </p>
              <div className="rounded-2xl bg-gray-50 p-6 mb-4">
                <div className="text-5xl mb-2">📱</div>
                <p className="text-sm text-gray-500">扫码添加，回复「报告」领取</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4 text-green-500" />
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                已有 12,580+ 人获取完整报告
              </div>
            </div>
          </div>
        </motion.div>

        {/* 历史测试记录 */}
        {pastTests.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 rounded-2xl bg-white shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-violet-600" />
                <span className="font-semibold text-gray-900">历史测试记录</span>
                <span className="text-sm text-gray-500">({pastTests.length}次)</span>
              </div>
              {showHistory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y">
                    {pastTests.map((test) => (
                      <div key={test.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <span className="font-semibold text-violet-600">{test.type}</span>
                          <span className="text-gray-500 ml-2">{test.nickname}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(test.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 企业版入口 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/enterprise"
            className="flex items-center gap-4 p-6 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">企业版团队测评</h3>
              <p className="text-sm text-gray-400">批量测评、团队分析、人才地图</p>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* 操作按钮 */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg"
          >
            <Share2 className="h-5 w-5" />
            分享结果
          </button>
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

      <AnimatePresence>
        {showPoster && result?.type && (
          <SharePoster type={result.type} onClose={() => setShowPoster(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
