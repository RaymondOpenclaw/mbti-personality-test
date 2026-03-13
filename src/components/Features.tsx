'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  BarChart3,
  Share2,
  Lock,
  Headphones,
  FileText,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '快速便捷',
    description: '10-20分钟即可完成测试，支持断点续答，随时随地开始探索'
  },
  {
    icon: Shield,
    title: '科学可靠',
    description: '基于迈尔斯-布里格斯理论，结合本土化优化，确保测评准确性'
  },
  {
    icon: BarChart3,
    title: '深度分析',
    description: '多维度分析报告，涵盖职业匹配、人际关系、个人成长建议'
  },
  {
    icon: Share2,
    title: '社交分享',
    description: '精美海报一键生成，支持多平台分享，与好友一起探索人格奥秘'
  },
  {
    icon: Lock,
    title: '隐私保护',
    description: '严格的数据加密和隐私保护措施，您的信息安全是我们的首要任务'
  },
  {
    icon: Headphones,
    title: '专业支持',
    description: '7x24小时客服支持，专业团队为您解答任何关于测试的疑问'
  },
  {
    icon: FileText,
    title: 'PDF报告',
    description: '专业版用户可下载精美排版的PDF报告，随时查阅或打印保存'
  },
  {
    icon: Clock,
    title: '历史记录',
    description: '保存所有测试历史，追踪人格变化趋势，见证成长轨迹'
  }
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            为什么选择我们
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            我们致力于提供最专业、最准确、最便捷的MBTI人格测评服务
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
