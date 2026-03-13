'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Check, Zap, Star, Crown } from 'lucide-react';
import { getTestVersions } from '@/data/mbtiTypes';

const iconMap = {
  quick: Zap,
  standard: Star,
  professional: Crown
};

export function TestVersionSelector() {
  const versions = getTestVersions();

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            选择适合您的测试版本
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            我们提供多种测试版本，从快速体验到专业深度分析，满足不同需求
          </motion.p>
        </div>

        {/* Version Cards */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {versions.map((version, index) => {
            const Icon = iconMap[version.id];
            return (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col rounded-2xl border-2 p-6 sm:p-8 transition-all hover:shadow-xl ${
                  version.recommended
                    ? 'border-violet-500 bg-gradient-to-b from-violet-50/50 to-white'
                    : 'border-gray-100 bg-white hover:border-violet-200'
                }`}
              >
                {/* Recommended Badge */}
                {version.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1 text-sm font-medium text-white shadow-lg">
                      推荐选择
                    </span>
                  </div>
                )}

                {/* Icon & Title */}
                <div className="text-center">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                    version.recommended
                      ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-8 w-8 ${version.recommended ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{version.name}</h3>
                  <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {version.duration}
                    </span>
                    <span>{version.questionCount}题</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6 flex-1">
                  <ul className="space-y-3">
                    {version.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 flex-shrink-0 ${
                          version.recommended ? 'text-violet-500' : 'text-green-500'
                        }`} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="mt-8">
                  <div className="mb-4 text-center">
                    {version.price === 0 ? (
                      <span className="text-2xl font-bold text-green-600">免费</span>
                    ) : (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-lg text-gray-500">¥</span>
                        <span className="text-3xl font-bold text-gray-900">{version.price}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/test?version=${version.id}`}
                    className={`block w-full rounded-full py-3.5 text-center font-semibold transition-all ${
                      version.recommended
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {version.price === 0 ? '免费开始' : '立即购买'}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
