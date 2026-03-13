'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Shield, Award, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: '专业性',
    description: '基于迈尔斯-布里格斯类型指标理论，结合本土化研究，提供科学准确的测评结果。'
  },
  {
    icon: Users,
    title: '用户至上',
    description: '始终以用户需求为中心，不断优化产品体验，提供个性化、有温度的服务。'
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '采用银行级加密技术，严格遵守隐私保护法规，确保用户数据安全。'
  },
  {
    icon: Heart,
    title: '社会责任',
    description: '致力于心理健康知识普及，让更多人了解自我、接纳自我、成长自我。'
  }
];

const stats = [
  { value: '100,000+', label: '用户完成测试' },
  { value: '98%', label: '用户满意度' },
  { value: '16', label: '人格类型覆盖' },
  { value: '24/7', label: '在线服务' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              关于我们
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-white/80"
            >
              我们致力于帮助每个人更好地了解自己，发现内在潜能，
              促进个人成长和人际关系和谐
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-lg"
              >
                <div className="text-3xl font-bold text-violet-600">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">我们的使命</h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                在MBTI测评，我们相信每个人都有独特的价值和潜能。我们的使命是通过科学的人格测评工具，
                帮助每个人更好地了解自己的性格特点、优势和成长空间，从而在工作、学习和人际关系中发挥最大潜能。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">我们的价值观</h2>
            <p className="mt-4 text-lg text-gray-600">
              这些核心原则指导着我们的每一个决策和行动
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 sm:p-12"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                开始探索您的人格类型
              </h2>
              <p className="mt-4 text-lg text-white/80">
                只需10-15分钟，获取专业的MBTI人格分析报告
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/test"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-violet-600 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
                >
                  开始测试
                </Link>
                <Link
                  href="/types"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  查看所有类型
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
