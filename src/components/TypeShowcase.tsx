'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Lightbulb, Shield, Compass } from 'lucide-react';
import { getMBTITypes } from '@/data/mbtiTypes';

const groupInfo = {
  analyst: {
    name: '分析家',
    icon: Lightbulb,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    description: '理性与直觉的完美结合'
  },
  diplomat: {
    name: '外交家',
    icon: Users,
    color: '#10B981',
    bgColor: '#D1FAE5',
    description: '同理心与理想的追求者'
  },
  sentinel: {
    name: '守护者',
    icon: Shield,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    description: '秩序与责任的坚定维护者'
  },
  explorer: {
    name: '探险家',
    icon: Compass,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    description: '自由与行动的实践者'
  }
};

export function TypeShowcase() {
  const types = getMBTITypes();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-violet-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            探索16种人格类型
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            每一种人格类型都有其独特的魅力和优势，了解它们可以帮助你更好地认识自己和他人
          </motion.p>
        </div>

        {/* Group Sections */}
        {Object.entries(groupInfo).map(([groupKey, group], groupIndex) => {
          const groupTypes = types.filter(t => t.group === groupKey);
          const Icon = group.icon;

          return (
            <motion.div
              key={groupKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-8"
            >
              {/* Group Header */}
              <div
                className="flex items-center gap-3 mb-4 p-4 rounded-2xl"
                style={{ backgroundColor: group.bgColor }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: group.color }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: group.color }}>
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
              </div>

              {/* Type Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {groupTypes.map((type, index) => (
                  <motion.div
                    key={type.code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/types/${type.code}`}
                      className="group relative flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-current"
                      style={{ '--tw-border-opacity': 0.2, color: type.colorTheme.primary }}
                    >
                      {/* Emoji */}
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm"
                        style={{ backgroundColor: type.colorTheme.light }}
                      >
                        {type.emoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-lg font-bold"
                          style={{ color: type.colorTheme.primary }}
                        >
                          {type.code}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {type.nickname}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/types"
            className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 bg-white px-8 py-3 text-base font-semibold text-violet-700 transition-all hover:border-violet-500 hover:bg-violet-50"
          >
            查看全部16型人格
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
