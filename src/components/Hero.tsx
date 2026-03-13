'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Brain, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: '专业测评',
    description: '基于迈尔斯-布里格斯理论的科学测评体系'
  },
  {
    icon: Users,
    title: '已测人数',
    description: '已有超过 100,000+ 用户完成测试'
  },
  {
    icon: Sparkles,
    title: '深度解析',
    description: '个性化的详细报告与成长建议'
  }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white py-16 sm:py-24 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            更懂中国用户的人格测评
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            发现真实的自己
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              探索MBTI人格类型
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
          >
            通过专业的MBTI人格测试，深入了解你的性格特点、职业倾向和人际关系模式。
            已有超过 10 万+ 用户完成测试，开启自我探索之旅。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/test"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              立即开始测试
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/types"
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-violet-300 hover:text-violet-700 hover:shadow-lg"
            >
              了解16型人格
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center rounded-2xl bg-white/60 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-center text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
