// 测试数据持久化存储
const STORAGE_KEY = 'mbti_test_data';

export interface StoredTest {
  id: string;
  type: string;
  nickname: string;
  dimensions: {
    dimension: string;
    result: string;
    percentage: number;
  }[];
  createdAt: string;
}

// 生成唯一测试ID
export function generateTestId(): string {
  return 'TEST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// 保存测试结果
export function saveTestResult(testData: Omit<StoredTest, 'id' | 'createdAt'>): string {
  const id = generateTestId();
  const storedTest: StoredTest = {
    ...testData,
    id,
    createdAt: new Date().toISOString()
  };

  const existing = getAllTests();
  existing.push(storedTest);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save test:', e);
  }

  return id;
}

// 获取所有测试记录
export function getAllTests(): StoredTest[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// 通过ID获取测试
export function getTestById(id: string): StoredTest | null {
  const tests = getAllTests();
  return tests.find(t => t.id === id) || null;
}

// 删除测试记录
export function deleteTest(id: string): void {
  const tests = getAllTests().filter(t => t.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
  } catch (e) {
    console.error('Failed to delete test:', e);
  }
}

// 获取测试数量统计
export function getTestStats() {
  const tests = getAllTests();
  return {
    total: tests.length,
    byType: tests.reduce((acc, test) => {
      acc[test.type] = (acc[test.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}
