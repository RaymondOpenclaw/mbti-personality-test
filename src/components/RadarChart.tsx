'use client';

import { motion } from 'framer-motion';
import { DimensionScore } from '@/types';

interface RadarChartProps {
  dimensions: DimensionScore[];
  size?: number;
}

export function RadarChart({ dimensions, size = 320 }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.32;
  const angleStep = (Math.PI * 2) / 4;

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // 维度配置 - 丰富视觉效果
  const dimConfig = [
    {
      name: 'E',
      opposite: 'I',
      full: '外向 / 内向',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      icon: '⚡',
      desc: '能量来源'
    },
    {
      name: 'S',
      opposite: 'N',
      full: '实感 / 直觉',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      icon: '👁️',
      desc: '认知方式'
    },
    {
      name: 'T',
      opposite: 'F',
      full: '思维 / 情感',
      color: '#10B981',
      bgColor: '#D1FAE5',
      icon: '🧠',
      desc: '决策风格'
    },
    {
      name: 'J',
      opposite: 'P',
      full: '判断 / 知觉',
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
      icon: '📋',
      desc: '生活态度'
    },
  ];

  // 生成路径
  const pathData = dimensions.map((dim, i) => {
    const point = getPoint(i, dim.percentage);
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  // 网格百分比
  const gridCircles = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center w-full">
      {/* 雷达图主体 */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* 背景网格 */}
          {gridCircles.map((percent) => (
            <polygon
              key={percent}
              points={dimConfig.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = (percent / 100) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray={percent === 100 ? undefined : '4,4'}
            />
          ))}

          {/* 轴线 */}
          {dimConfig.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            );
          })}

          {/* 数据区域 - 渐变填充 */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <motion.path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* 数据点 */}
          {dimensions.map((dim, i) => {
            const point = getPoint(i, dim.percentage);
            const config = dimConfig[i];
            return (
              <motion.g key={i}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill={config.color}
                  stroke="white"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4, type: 'spring' }}
                />
                {/* 数值标签 */}
                <motion.text
                  x={point.x}
                  y={point.y - 12}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill={config.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  {Math.round(dim.percentage)}%
                </motion.text>
              </motion.g>
            );
          })}

          {/* 中心发光点 */}
          <circle cx={center} cy={center} r="5" fill="#8B5CF6" opacity="0.3">
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={center} cy={center} r="4" fill="white" stroke="#8B5CF6" strokeWidth="2" />
        </svg>

        {/* 四周维度标签 */}
        {dimensions.map((dim, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 45;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const config = dimConfig[i];
          const isFirst = dim.result === config.name;

          return (
            <motion.div
              key={dim.dimension}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div
                className="px-3 py-2 rounded-xl shadow-sm border-2"
                style={{
                  backgroundColor: config.bgColor,
                  borderColor: isFirst ? config.color : 'transparent'
                }}
              >
                <div className="text-lg mb-0.5">{config.icon}</div>
                <div className="text-xs font-bold" style={{ color: config.color }}>
                  {isFirst ? config.name : config.opposite}
                </div>
                <div className="text-[10px] text-gray-500 whitespace-nowrap">{config.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 底部详细图例 */}
      <motion.div
        className="mt-8 grid grid-cols-2 gap-3 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {dimensions.map((dim, i) => {
          const config = dimConfig[i];
          const isFirst = dim.result === config.name;
          return (
            <div
              key={dim.dimension}
              className="flex items-center gap-3 p-3 rounded-xl border-2 transition-all hover:shadow-md"
              style={{
                backgroundColor: config.bgColor,
                borderColor: isFirst ? config.color : `${config.color}30`
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                {config.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="font-bold text-sm"
                    style={{ color: config.color }}
                  >
                    {isFirst ? config.name : config.opposite}
                  </span>
                  <span className="text-xs text-gray-400">/</span>
                  <span className="text-xs text-gray-400">
                    {isFirst ? config.opposite : config.name}
                  </span>
                </div>
                <div className="text-xs text-gray-600">{config.full}</div>
                <div className="mt-1 h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: config.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.percentage}%` }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                  />
                </div>
              </div>
              <div
                className="text-lg font-bold"
                style={{ color: config.color }}
              >
                {Math.round(dim.percentage)}%
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
