'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, HelpCircle, Check, Info } from 'lucide-react';
import { getTestVersions } from '@/data/mbtiTypes';

interface TestIntroProps {
  version: 'quick' | 'standard' | 'professional';
  onStart: () => void;
}

export function TestIntro({ version, onStart }: TestIntroProps) {
  const versions = getTestVersions();
  const currentVersion = versions.find(v => v.id === version) || versions[1];

  const tips = [
    '请根据你日常的真实行为和感受作答，而不是理想中的自己',
    '没有对错之分，选择最符合你本能反应的选项',
    '测试过程中可以暂停，系统会自动保存你的进度',
    '找一个安静的环境，保持放松的心态',
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-violet-600">首页</Link></li>
            <li>/</li>
            <li><Link href="/test" className="hover:text-violet-600">测试</Link></li>
            <li>/</li>
            <li className="text-violet-600">{currentVersion.name}</li>
          </ol>
        </nav>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-8 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {currentVersion.name}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-violet-100">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {currentVersion.duration}
              </span>
              <span>|</span>
              <span>{currentVersion.questionCount}道题目</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Features */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">包含内容</h3>
              <ul className="space-y-3">
                {currentVersion.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="rounded-2xl bg-violet-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-violet-600" />
                <h3 className="font-semibold text-violet-900">测试提示</h3>
              </div>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-violet-800">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-medium text-violet-700">
                      {index + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-8 py-6">
            <button
              onClick={onStart}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              开始测试
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              点击开始即表示您同意我们的
              <a href="/terms" className="text-violet-600 hover:underline">服务条款</a>
              和
              <a href="/privacy" className="text-violet-600 hover:underline">隐私政策</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
