'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getMBTITypes } from '@/data/mbtiTypes';

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

        {/* Type Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 lg:gap-3">
          {types.map((type, index) => (
            <motion.div
              key={type.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/types/${type.code}`}
                className="group relative flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Color indicator */}
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: type.color }}
                />

                {/* Type Code */}
                <div
                  className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md"
                  style={{ backgroundColor: type.color }}
                >
                  {type.code}
                </div>

                {/* Name */}
                <h3 className="text-center text-sm font-semibold text-gray-900">
                  {type.nickname}
                </h3>

                {/* Chinese Name */}
                <p className="mt-1 text-center text-xs text-gray-500">
                  {type.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

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
