'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, Globe } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ icon, value, label, suffix = '', delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="flex flex-col items-center p-4"
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  );
}

export function StatsCounter() {
  // 模拟数据 - 实际应用中可以从API获取
  const stats = {
    totalTests: 125847,
    todayTests: 3247,
    accuracy: 91.2,
    countries: 45
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-500">实时数据更新中</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem
            icon={<Users className="h-6 w-6" />}
            value={stats.totalTests}
            label="累计测试人数"
            delay={0}
          />
          <StatItem
            icon={<TrendingUp className="h-6 w-6" />}
            value={stats.todayTests}
            label="今日完成测试"
            delay={100}
          />
          <StatItem
            icon={<Calendar className="h-6 w-6" />}
            value={stats.accuracy}
            label="用户满意度"
            suffix="%"
            delay={200}
          />
          <StatItem
            icon={<Globe className="h-6 w-6" />}
            value={stats.countries}
            label="覆盖国家/地区"
            delay={300}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            基于过去30天的测试数据统计
          </p>
        </div>
      </motion.div>
    </div>
  );
}
