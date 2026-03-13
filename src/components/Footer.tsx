'use client';

import Link from 'next/link';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { label: '开始测试', href: '/test' },
    { label: '16型人格', href: '/types' },
    { label: '深度报告', href: '/report/premium' },
    { label: '团体测试', href: '/enterprise' },
  ],
  support: [
    { label: '帮助中心', href: '/help' },
    { label: '测试说明', href: '/guide' },
    { label: '常见问题', href: '/faq' },
    { label: '联系我们', href: '/contact' },
  ],
  company: [
    { label: '关于我们', href: '/about' },
    { label: '隐私政策', href: '/privacy' },
    { label: '服务条款', href: '/terms' },
    { label: '免责声明', href: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MBTI测评</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              专业的人格测评平台，帮助您深入了解自己的性格特点、职业倾向和人际关系模式。
              已有超过 10 万+ 用户完成测试。
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-violet-400" />
                <span>contact@mbti-test.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-violet-400" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-violet-400" />
                <span>北京市朝阳区</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                产品服务
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                帮助支持
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                关于我们
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-violet-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © 2026 MBTI测评. 保留所有权利.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                测试结果仅供参考，不作为心理诊断依据
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
