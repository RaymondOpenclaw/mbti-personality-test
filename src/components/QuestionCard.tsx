'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const options = [
  { value: 1, label: '非常不同意', emoji: '👎' },
  { value: 2, label: '不同意', emoji: '🤔' },
  { value: 3, label: '一般', emoji: '😐' },
  { value: 4, label: '同意', emoji: '👍' },
  { value: 5, label: '非常同意', emoji: '❤️' },
];

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onBack,
  canGoBack,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8"
    >
      {/* Back Button */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          上一题
        </button>
      )}

      {/* Question */}
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          {question.content}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="group flex w-full items-center gap-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-left transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:shadow-md sm:gap-6 sm:p-5"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg transition-colors group-hover:bg-violet-100 sm:h-12 sm:w-12">
              {option.emoji}
            </span>
            <div className="flex-1">
              <span className="block text-base font-medium text-gray-900 sm:text-lg">
                {option.label}
              </span>
            </div>
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors group-hover:border-violet-500 group-hover:bg-violet-500">
              <div className="h-2 w-2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
