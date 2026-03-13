'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Building2, Users, BarChart3, FileText, CheckCircle, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    size: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    {
      icon: Users,
      title: '批量测评管理',
      description: '一键发起团队测评，实时跟踪完成进度，批量导出报告'
    },
    {
      icon: BarChart3,
      title: '团队人格分布',
      description: '可视化展示团队16型人格分布，了解团队整体特质'
    },
    {
      icon: FileText,
      title: '专业分析报告',
      description: '自动生成团队分析报告，包含沟通建议和改进方向'
    }
  ];

  const features = [
    '无限次团队测评',
    '管理员后台系统',
    'API 接口对接',
    '专属客户经理',
    '定制化报告模板',
    '数据安全加密',
    '7×24小时支持',
    '定期团队培训'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            返回首页
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-violet-700 mb-6"
            >
              <Building2 className="h-5 w-5" />
              <span className="font-medium">企业版解决方案</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              让 MBTI 助力企业人才发展
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              科学的团队测评工具，帮助您了解员工特质、优化团队配置、提升协作效率
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 mb-4">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Contact Form */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">企业版功能</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                <h3 className="text-xl font-semibold mb-2">适合哪些企业？</h3>
                <ul className="space-y-2 text-violet-100">
                  <li>• 需要进行人才盘点和团队优化的企业</li>
                  <li>• 希望提升团队协作效率的组织</li>
                  <li>• 开展新员工培训和职业发展规划的公司</li>
                  <li>• 进行管理层评估和领导力发展的机构</li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">预约企业版演示</h2>
                  <p className="text-gray-600 mb-6">填写信息，我们的顾问将在24小时内与您联系</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                        placeholder="请输入公司名称"
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">联系人</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                          placeholder="您的姓名"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                          placeholder="您的手机号"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">企业邮箱</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">企业规模</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-white"
                        value={formData.size}
                        onChange={e => setFormData({...formData, size: e.target.value})}
                      >
                        <option value="">请选择企业规模</option>
                        <option value="1-50">1-50人</option>
                        <option value="51-200">51-200人</option>
                        <option value="201-1000">201-1000人</option>
                        <option value="1000+">1000人以上</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">需求描述（选填）</label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
                        placeholder="请简单描述您的需求..."
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
                    >
                      提交申请
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      提交即表示您同意我们的服务条款和隐私政策
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h3>
                  <p className="text-gray-600 mb-6">我们的企业顾问将在24小时内与您联系</p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    返回首页
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">咨询电话</p>
                <p className="text-lg font-semibold">400-XXX-XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">商务邮箱</p>
                <p className="text-lg font-semibold">enterprise@mbti-test.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
