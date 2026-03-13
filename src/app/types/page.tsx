'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { getMBTITypes } from '@/data/mbtiTypes';

export default function TypesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const types = getMBTITypes();

  const filteredTypes = types.filter(type =>
    type.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 py-16 sm:py-24">
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
              16种MBTI人格类型
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-white/80"
            >
              了解每种人格类型的独特特质、职业倾向和人际关系模式
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-8 max-w-md"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索人格类型或名称..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-0 bg-white/90 py-3 pl-12 pr-4 text-gray-900 shadow-lg backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types Grid */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTypes.map((type, index) => (
              <motion.div
                key={type.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/types/${type.code}`}
                  className="group block h-full rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Type Code Badge */}
                  <div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.code}
                  </div>

                  {/* Names */}
                  <h3 className="text-lg font-bold text-gray-900">
                    {type.nickname}
                  </h3>
                  <p className="text-sm text-gray-500">{type.name}</p>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                    {type.description}
                  </p>

                  {/* Famous People */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-1">代表人物</p>
                    <div className="flex flex-wrap gap-1">
                      {type.famous.slice(0, 2).map((person, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learn More */}
                  <div className="mt-4 flex items-center text-sm font-medium" style={{ color: type.color }}>
                    了解详情
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredTypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">没有找到匹配的人格类型</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-violet-600 hover:underline"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
