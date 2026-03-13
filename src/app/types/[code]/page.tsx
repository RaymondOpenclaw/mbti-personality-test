import Link from 'next/link';
import { getMBTIType, getMBTITypes } from '@/data/mbtiTypes';
import { MBTIType } from '@/types';

// Generate static paths for all 16 MBTI types
export async function generateStaticParams() {
  const types = getMBTITypes();
  return types.map((type) => ({
    code: type.code,
  }));
}

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function TypeDetailPage({ params }: PageProps) {
  const { code } = await params;
  const type = getMBTIType(code.toUpperCase() as MBTIType);
  const allTypes = getMBTITypes();

  if (!type) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">类型未找到</h1>
          <Link href="/types" className="mt-4 text-violet-600 hover:underline">
            返回类型列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ backgroundColor: type.color }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/types"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回类型列表
            </Link>
          </div>

          {/* Type Info */}
          <div className="text-center">
            <div
              className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-4xl font-bold shadow-2xl"
              style={{ color: type.color }}
            >
              {type.code}
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {type.nickname}
            </h1>

            <p className="mt-2 text-xl text-white/80">
              {type.name}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              {type.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold transition-colors hover:bg-gray-50"
                style={{ color: type.color }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                开始测试
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                分享
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Cognitive Functions */}
            <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: type.color }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">认知功能栈</h2>
              </div>
              <div className="space-y-4">
                {type.functions.map((func, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: type.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{func}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Famous People */}
            <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: type.color }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">知名代表</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {type.famous.map((person, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {allTypes.findIndex(t => t.code === type.code) > 0 && (
                <Link
                  href={`/types/${allTypes[allTypes.findIndex(t => t.code === type.code) - 1].code}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                >
                  <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  上一个类型
                </Link>
              )}

              {allTypes.findIndex(t => t.code === type.code) < allTypes.length - 1 && (
                <Link
                  href={`/types/${allTypes[allTypes.findIndex(t => t.code === type.code) + 1].code}`}
                  className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                >
                  下一个类型
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
