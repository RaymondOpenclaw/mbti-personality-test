'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { MBTIType } from '@/types';
import { getMBTIType } from '@/data/mbtiTypes';

interface SharePosterProps {
  type: MBTIType;
  onClose: () => void;
}

export function SharePoster({ type, onClose }: SharePosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const typeData = getMBTIType(type);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `MBTI-${type}-result.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate poster:', error);
    }
  };

  if (!typeData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
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
          style={{ backgroundColor: typeData.color }}
        >
          {/* Header */}
          <div className="relative px-8 pt-12 pb-8 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-4xl font-bold shadow-xl" style={{ color: typeData.color }}>
              {typeData.code}
            </div>
            <h2 className="text-3xl font-bold text-white">{typeData.nickname}</h2>
            <p className="mt-2 text-lg text-white/80">{typeData.name}</p>
          </div>

          {/* Content */}
          <div className="bg-white px-8 py-8">
            <p className="text-center text-gray-600">{typeData.description}</p>

            {/* Functions */}
            <div className="mt-6">
              <h4 className="mb-3 text-center text-sm font-semibold text-gray-900">认知功能</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {typeData.functions.map((func, i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: typeData.color }}
                  >
                    {func}
                  </span>
                ))}
              </div>
            </div>

            {/* Famous */}
            <div className="mt-6">
              <h4 className="mb-3 text-center text-sm font-semibold text-gray-900">代表人物</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {typeData.famous.map((person, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 px-8 py-4 text-center">
            <p className="text-sm text-gray-400">MBTI人格测评</p>
            <p className="text-xs text-gray-500">www.mbti-test.com</p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl"
        >
          <Download className="h-5 w-5" />
          下载海报
        </button>
      </motion.div>
    </div>
  );
}
