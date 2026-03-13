'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, X, Sparkles, Star, Crown, Zap, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { MBTIType } from '@/types';
import { getMBTIType } from '@/data/mbtiTypes';

interface SharePosterProps {
  type: MBTIType;
  onClose: () => void;
}

// 类型颜色映射 - 更活泼的配色
const typeColors: Record<string, { bg: string; primary: string; secondary: string; accent: string }> = {
  NT: { bg: 'from-purple-400 via-pink-400 to-rose-400', primary: '#9333EA', secondary: '#EC4899', accent: '#F43F5E' },
  NF: { bg: 'from-emerald-400 via-teal-400 to-cyan-400', primary: '#059669', secondary: '#14B8A6', accent: '#06B6D4' },
  SP: { bg: 'from-amber-400 via-orange-400 to-red-400', primary: '#D97706', secondary: '#F97316', accent: '#EF4444' },
  SJ: { bg: 'from-blue-400 via-indigo-400 to-violet-400', primary: '#2563EB', secondary: '#6366F1', accent: '#8B5CF6' },
};

function getTypeColor(type: string) {
  const code = type.slice(0, 2);
  if (['INT', 'ENT'].includes(code)) return typeColors.NT;
  if (['INF', 'ENF'].includes(code)) return typeColors.NF;
  if (['IST', 'ISF', 'EST', 'ESF'].includes(code) && type[3] === 'P') return typeColors.SP;
  return typeColors.SJ;
}

// 装饰元素组件
function Decorations() {
  return (
    <>
      {/* 星星装饰 */}
      <div className="absolute top-8 left-8 text-yellow-300 text-2xl animate-pulse">⭐</div>
      <div className="absolute top-16 right-12 text-yellow-300 text-xl animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="absolute bottom-24 left-6 text-yellow-300 text-lg animate-pulse" style={{ animationDelay: '0.6s' }}>⭐</div>
      <div className="absolute top-32 left-20 text-white/30 text-sm">✦</div>
      <div className="absolute bottom-32 right-16 text-white/30 text-sm">✦</div>

      {/* 圆形装饰 */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/5" />

      {/* 漂浮的形状 */}
      <motion.div
        className="absolute top-20 right-20 w-8 h-8 rounded-lg bg-white/20 rotate-12"
        animate={{ y: [-5, 5, -5], rotate: [12, 20, 12] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-16 w-6 h-6 rounded-full bg-white/20"
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </>
  );
}

export function SharePoster({ type, onClose }: SharePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const typeData = getMBTIType(type);
  const colors = getTypeColor(type);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `MBTI-${type}-人格海报.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate poster:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!typeData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Poster */}
        <div
          ref={posterRef}
          className="overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* Header - 渐变背景 */}
          <div className={`relative px-6 pt-10 pb-8 text-center bg-gradient-to-br ${colors.bg}`}>
            <Decorations />

            {/* 顶部标签 */}
            <div className="relative z-10 flex justify-center mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                <Sparkles className="h-3 w-3" />
                MBTI 人格测评
              </span>
            </div>

            {/* 大字母卡片 */}
            <div className="relative z-10 flex justify-center mb-4">
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-white/30 blur-xl rounded-full" />
                <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-2xl">
                  <span className="text-5xl font-black" style={{ color: colors.primary }}>
                    {typeData.code}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 类型名称 */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-1">{typeData.nickname}</h2>
              <p className="text-white/80 text-sm">{typeData.name}</p>
            </motion.div>
          </div>

          {/* Content - 白色区域 */}
          <div className="bg-white px-6 py-6">
            {/* 标语 */}
            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                我是{typeData.nickname.split(' ')[0]}，
                <br />
                <span className="font-semibold" style={{ color: colors.primary }}>
                  独一无二的存在
                </span>
              </p>
            </motion.div>

            {/* 特点卡片 */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <motion.div
                className="rounded-2xl p-3 text-center"
                style={{ backgroundColor: `${colors.primary}15` }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Zap className="h-5 w-5 mx-auto mb-1" style={{ color: colors.primary }} />
                <p className="text-xs text-gray-500">核心优势</p>
                <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                  {typeData.functions[0]}
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl p-3 text-center"
                style={{ backgroundColor: `${colors.secondary}15` }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Heart className="h-5 w-5 mx-auto mb-1" style={{ color: colors.secondary }} />
                <p className="text-xs text-gray-500">价值观</p>
                <p className="text-sm font-semibold" style={{ color: colors.secondary }}>
                  {typeData.functions[1]}
                </p>
              </motion.div>
            </div>

            {/* 代表人物 */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-400 text-center mb-2">同类型的名人</p>
              <div className="flex flex-wrap justify-center gap-2">
                {typeData.famous.slice(0, 4).map((person, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {person}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 底部 CTA */}
            <motion.div
              className="rounded-2xl p-4 text-center"
              style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: colors.primary }}>
                测测你的人格类型
              </p>
              <p className="text-xs text-gray-500">扫码免费测试</p>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">MBTI人格测评</p>
              <p className="text-gray-500 text-xs">发现真实的自己</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
              <div className="text-2xl">🔮</div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              生成中...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              保存海报
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-white/60">
          保存海报分享给好友，一起探索人格奥秘
        </p>
      </motion.div>
    </div>
  );
}
