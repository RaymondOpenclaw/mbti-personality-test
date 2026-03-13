'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeShowcase } from '@/components/TypeShowcase';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { StatsCounter } from '@/components/StatsCounter';
import { Sparkles, Users, ArrowRight, Star } from 'lucide-react';

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              探索你的
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                MBTI人格
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
            >
              基于荣格心理类型理论，通过科学测评发现你的性格特质、认知模式和潜在优势
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/test"
                className="group inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-violet-700 hover:shadow-xl hover:scale-105"
              >
                <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
                开始测试
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/types"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
              >
                <Users className="h-5 w-5" />
                了解16型人格
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
            >
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                4.9分用户评价
              </span>
              <span className="hidden sm:inline">•</span>
              <span>基于荣格心理类型理论</span>
              <span className="hidden sm:inline">•</span>
              <span>科学严谨的分析体系</span>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <StatsCounter />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 16 Types Preview */}
      <TypeShowcase />

      {/* Features */}
      <Features />

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              用户真实反馈
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              来自全球各地的测试结果分享
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: '小李',
                type: 'INTJ',
                avatar: '👩‍💻',
                content: '测试结果非常准确！让我更清楚自己的优势和需要改进的地方。',
                location: '北京'
              },
              {
                name: '阿明',
                type: 'ENFP',
                avatar: '🧑‍🎨',
                content: '通过测试了解了自己为什么总是充满创意但执行力不足，找到了平衡的方法。',
                location: '上海'
              },
              {
                name: 'Cathy',
                type: 'ISFJ',
                avatar: '👩‍⚕️',
                content: '终于明白为什么我总是优先考虑他人，学会了更好地设定边界。',
                location: '深圳'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-gray-50 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-violet-600">{testimonial.type} · {testimonial.location}</div>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.content}"</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-16 text-center sm:px-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                准备好发现真实的自己了吗？
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
                已有超过 12 万人完成了测试，加入他们发现自我的旅程
              </p>
              <Link
                href="/test"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
              >
                免费开始测试
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-4 text-sm text-violet-200">
                无需注册 · 免费获取基础报告
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
