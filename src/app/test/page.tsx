'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestSession } from '@/hooks/useTestSession';
import { TestIntro } from '@/components/TestIntro';
import { QuestionCard } from '@/components/QuestionCard';
import { AnalyzingScreen } from '@/components/AnalyzingScreen';
import { ProgressBar } from '@/components/ProgressBar';

const validVersions = ['quick', 'standard', 'professional'] as const;
type Version = typeof validVersions[number];

function isValidVersion(v: string | null): v is Version {
  return validVersions.includes(v as Version);
}

function getVersionFromURL(): Version {
  if (typeof window === 'undefined') return 'standard';
  const params = new URLSearchParams(window.location.search);
  const versionParam = params.get('version');
  return isValidVersion(versionParam) ? versionParam : 'standard';
}

export default function TestPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [version, setVersion] = useState<Version>('standard');
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    session,
    questions,
    currentQuestion,
    progress,
    isLoading,
    startTest,
    answerQuestion,
    goBack,
    completeTest
  } = useTestSession();

  // Client-side mount and URL parsing
  useEffect(() => {
    setMounted(true);
    setVersion(getVersionFromURL());
  }, []);

  // Check for existing session
  useEffect(() => {
    if (session && session.version === version && session.status === 'in_progress') {
      setTestStarted(true);
    }
  }, [session, version]);

  const handleStart = () => {
    try {
      setError(null);
      startTest(version);
      setTestStarted(true);
    } catch (err) {
      console.error('Failed to start test:', err);
      setError('启动测试失败，请刷新页面重试');
    }
  };

  const handleAnswer = (value: number) => {
    try {
      const question = questions[currentQuestion];
      if (!question) {
        console.error('Question not found at index:', currentQuestion);
        return;
      }
      answerQuestion(question.id, value);
    } catch (err) {
      console.error('Failed to answer question:', err);
      setError('提交答案失败，请刷新页面重试');
    }
  };

  const handleComplete = () => {
    try {
      setError(null);
      setShowAnalyzing(true);
      // Mark test as completed
      completeTest();
      // Redirect to result page after showing analyzing screen
      setTimeout(() => {
        router.push('/test/result');
      }, 1500);
    } catch (err) {
      console.error('Failed to complete test:', err);
      setError('完成测试失败，请刷新页面重试');
    }
  };

  // Prevent hydration mismatch - show loading until client-side mounted
  if (!mounted || isLoading) {
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">出错了</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-violet-600 px-6 py-2 text-white hover:bg-violet-700"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {!testStarted ? (
        <TestIntro version={version} onStart={handleStart} />
      ) : showAnalyzing ? (
        <AnalyzingScreen />
      ) : currentQuestion >= questions.length ? (
        /* All questions answered - show complete button */
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  题目 {questions.length} / {questions.length}
                </span>
                <span className="text-sm font-medium text-violet-600">100%</span>
              </div>
              <ProgressBar progress={100} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">所有题目已完成</h2>
              <p className="text-gray-600 mb-6">点击下方按钮查看您的 MBTI 人格报告</p>
              <button
                onClick={handleComplete}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
              >
                查看我的 MBTI 报告
              </button>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  题目 {Math.min(currentQuestion + 1, questions.length)} / {questions.length}
                </span>
                <span className="text-sm font-medium text-violet-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <ProgressBar progress={progress} />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              {questions[currentQuestion] && (
                <QuestionCard
                  key={currentQuestion}
                  question={questions[currentQuestion]}
                  currentIndex={currentQuestion}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  onBack={goBack}
                  canGoBack={currentQuestion > 0}
                />
              )}
            </AnimatePresence>

            {/* Complete Button - only show on last question */}
            {currentQuestion === questions.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <p className="mb-4 text-sm text-gray-500">这是最后一题，点击提交查看您的 MBTI 人格报告</p>
                <button
                  onClick={handleComplete}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
                >
                  查看我的 MBTI 报告
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
