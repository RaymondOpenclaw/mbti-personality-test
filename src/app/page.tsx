import Link from 'next/link';
import Image from 'next/image';
import { TypeShowcase } from '@/components/TypeShowcase';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            {/* Brand Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              探索你的
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                MBTI人格
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              基于荣格心理类型理论，通过科学测评发现你的性格特质、认知模式和潜在优势
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/test"
                className="group inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700 hover:shadow-xl"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                开始测试
              </Link>
              <Link
                href="/types"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                了解16型人格
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
              <div>
                <div className="text-3xl font-bold text-violet-600">16</div>
                <div className="mt-1 text-sm text-gray-600">人格类型</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600">93</div>
                <div className="mt-1 text-sm text-gray-600">专业题目</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600">4</div>
                <div className="mt-1 text-sm text-gray-600">维度分析</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16 Types Preview */}
      <TypeShowcase />

      {/* Features */}
      <Features />

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-16 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              准备好发现真实的自己了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
              只需5-10分钟，即可获得专业的MBTI人格分析报告
            </p>
            <Link
              href="/test"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-lg transition-all hover:bg-gray-100"
            >
              免费开始测试
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
