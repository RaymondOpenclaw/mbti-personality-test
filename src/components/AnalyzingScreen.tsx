'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

export function AnalyzingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="relative mx-auto mb-8 h-24 w-24">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-violet-200"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-fuchsia-200"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          {/* Center icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="h-10 w-10 text-violet-600" />
          </motion.div>
          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="h-6 w-6 text-fuchsia-500" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="h-5 w-5 text-violet-500" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            正在分析您的人格类型
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            我们的AI正在根据您的答案计算四维度得分...
          </p>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-violet-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>

        {/* Fun facts */}
        <motion.div
          className="mt-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="rounded-xl bg-violet-50 p-4 text-sm text-violet-800">
            <p className="font-medium mb-1">💡 小知识</p>
            <p>MBTI将人格分为四个维度：外向/内向(E/I)、实感/直觉(S/N)、思维/情感(T/F)、判断/知觉(J/P)，共形成16种人格类型。</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
