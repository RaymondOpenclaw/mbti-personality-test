import { MBTIType, PersonalityType, Question, TestVersion } from '@/types';

export const mbtiTypes: PersonalityType[] = [
  {
    code: 'ISTJ',
    name: '检查者',
    nickname: '物流师',
    description: '务实可靠，注重细节，责任心强，是传统和秩序的守护者。',
    image: '/images/types/istj.png',
    color: '#3B82F6',
    functions: ['内向实感 (Si)', '外向思维 (Te)', '内向情感 (Fi)', '外向直觉 (Ne)'],
    famous: ['乔治·华盛顿', '沃伦·巴菲特', '安吉丽娜·朱莉']
  },
  {
    code: 'ISFJ',
    name: '保护者',
    nickname: '守卫者',
    description: '温暖体贴，乐于助人，具有强烈的责任感和服务精神。',
    image: '/images/types/isfj.png',
    color: '#10B981',
    functions: ['内向实感 (Si)', '外向情感 (Fe)', '内向思维 (Ti)', '外向直觉 (Ne)'],
    famous: ['凯特·米德尔顿', '特蕾莎修女', '罗伯特·帕丁森']
  },
  {
    code: 'INFJ',
    name: '提倡者',
    nickname: '预言家',
    description: '富有洞察力，理想主义，追求意义，是安静的理想主义者。',
    image: '/images/types/infj.png',
    color: '#8B5CF6',
    functions: ['内向直觉 (Ni)', '外向情感 (Fe)', '内向思维 (Ti)', '外向实感 (Se)'],
    famous: ['马丁·路德·金', '纳尔逊·曼德拉', 'Lady Gaga']
  },
  {
    code: 'INTJ',
    name: '建筑师',
    nickname: '战略家',
    description: '独立思考，追求完美，具有战略眼光和高效执行力。',
    image: '/images/types/intj.png',
    color: '#6366F1',
    functions: ['内向直觉 (Ni)', '外向思维 (Te)', '内向情感 (Fi)', '外向实感 (Se)'],
    famous: ['埃隆·马斯克', '马克·扎克伯格', '弗里德里希·尼采']
  },
  {
    code: 'ISTP',
    name: '鉴赏家',
    nickname: '手艺人',
    description: '灵活务实，善于分析问题，喜欢动手操作和解决技术难题。',
    image: '/images/types/istp.png',
    color: '#F59E0B',
    functions: ['内向思维 (Ti)', '外向实感 (Se)', '内向直觉 (Ni)', '外向情感 (Fe)'],
    famous: ['汤姆·克鲁斯', '克林特·伊斯特伍德', '迈克尔·乔丹']
  },
  {
    code: 'ISFP',
    name: '探险家',
    nickname: '艺术家',
    description: '敏感温和，追求和谐，具有艺术天赋和强烈的个人价值观。',
    image: '/images/types/isfp.png',
    color: '#EC4899',
    functions: ['内向情感 (Fi)', '外向实感 (Se)', '内向直觉 (Ni)', '外向思维 (Te)'],
    famous: ['迈克尔·杰克逊', '大卫·贝克汉姆', '布兰妮·斯皮尔斯']
  },
  {
    code: 'INFP',
    name: '调停者',
    nickname: '治愈者',
    description: '理想主义，忠于内心，富有创造力和同情心。',
    image: '/images/types/infp.png',
    color: '#A855F7',
    functions: ['内向情感 (Fi)', '外向直觉 (Ne)', '内向实感 (Si)', '外向思维 (Te)'],
    famous: ['威廉·莎士比亚', '托尔金', '约翰·列侬']
  },
  {
    code: 'INTP',
    name: '逻辑学家',
    nickname: '思想家',
    description: '好奇心强，喜欢分析理论，追求知识和真理。',
    image: '/images/types/intp.png',
    color: '#3B82F6',
    functions: ['内向思维 (Ti)', '外向直觉 (Ne)', '内向实感 (Si)', '外向情感 (Fe)'],
    famous: ['爱因斯坦', '比尔·盖茨', '艾萨克·牛顿']
  },
  {
    code: 'ESTP',
    name: '企业家',
    nickname: '挑战者',
    description: '精力充沛，敢于冒险，善于把握机会。',
    image: '/images/types/estp.png',
    color: '#EF4444',
    functions: ['外向实感 (Se)', '内向思维 (Ti)', '外向情感 (Fe)', '内向直觉 (Ni)'],
    famous: ['欧内斯特·海明威', '杰克·尼科尔森', '麦当娜']
  },
  {
    code: 'ESFP',
    name: '表演者',
    nickname: '娱乐家',
    description: '热情开朗，善于社交，喜欢成为焦点。',
    image: '/images/types/esfp.png',
    color: '#F97316',
    functions: ['外向实感 (Se)', '外向情感 (Fe)', '内向思维 (Ti)', '内向直觉 (Ni)'],
    famous: ['玛丽莲·梦露', '埃尔顿·约翰', '保罗·麦卡特尼']
  },
  {
    code: 'ENFP',
    name: '竞选者',
    nickname: '启发者',
    description: '充满热情，富有创意，善于激励他人。',
    image: '/images/types/enfp.png',
    color: '#F59E0B',
    functions: ['外向直觉 (Ne)', '外向情感 (Fe)', '内向实感 (Si)', '内向思维 (Ti)'],
    famous: ['小罗伯特·唐尼', '罗宾·威廉姆斯', '沃尔特·迪士尼']
  },
  {
    code: 'ENTP',
    name: '辩论家',
    nickname: '发明家',
    description: '机智聪明，喜欢辩论，善于创新思维。',
    image: '/images/types/entp.png',
    color: '#8B5CF6',
    functions: ['外向直觉 (Ne)', '内向思维 (Ti)', '外向情感 (Fe)', '内向实感 (Si)'],
    famous: ['托马斯·爱迪生', '马克·吐温', '席琳·迪翁']
  },
  {
    code: 'ESTJ',
    name: '总经理',
    nickname: '执行者',
    description: '务实高效，善于管理，重视传统和秩序。',
    image: '/images/types/estj.png',
    color: '#3B82F6',
    functions: ['外向思维 (Te)', '内向实感 (Si)', '外向直觉 (Ne)', '内向情感 (Fi)'],
    famous: ['亨利·福特', '乔治·华盛顿', '奥普拉·温弗瑞']
  },
  {
    code: 'ESFJ',
    name: '执政官',
    nickname: '供给者',
    description: '热心助人，善于协调，重视和谐与人际关系。',
    image: '/images/types/esfj.png',
    color: '#10B981',
    functions: ['外向情感 (Fe)', '内向实感 (Si)', '外向直觉 (Ne)', '内向思维 (Ti)'],
    famous: ['泰勒·斯威夫特', '比尔·克林顿', '詹妮弗·劳伦斯']
  },
  {
    code: 'ENFJ',
    name: '主人公',
    nickname: '教导者',
    description: '魅力四射，善于领导，关心他人成长。',
    image: '/images/types/enfj.png',
    color: '#F59E0B',
    functions: ['外向情感 (Fe)', '内向直觉 (Ni)', '外向实感 (Se)', '内向思维 (Ti)'],
    famous: ['奥巴马', '奥普拉·温弗瑞', '约翰·保罗二世']
  },
  {
    code: 'ENTJ',
    name: '指挥官',
    nickname: '领导者',
    description: '果断自信，具有战略眼光，是天生的领导者。',
    image: '/images/types/entj.png',
    color: '#EF4444',
    functions: ['外向思维 (Te)', '内向直觉 (Ni)', '外向实感 (Se)', '内向情感 (Fi)'],
    famous: ['史蒂夫·乔布斯', '拿破仑', '戈登·拉姆齐']
  }
];

export const testVersions: TestVersion[] = [
  {
    id: 'quick',
    name: '快速版',
    questionCount: 28,
    duration: '5-8分钟',
    price: 0,
    features: [
      '基础四字母类型',
      '简短性格概述',
      '核心优势分析'
    ],
    recommended: false
  },
  {
    id: 'standard',
    name: '标准版',
    questionCount: 48,
    duration: '10-15分钟',
    price: 0,
    features: [
      '四字母类型详解',
      '维度百分比图表',
      '职业匹配建议',
      '人际关系分析'
    ],
    recommended: true
  },
  {
    id: 'professional',
    name: '专业版',
    questionCount: 93,
    duration: '20-25分钟',
    price: 19.9,
    features: [
      '认知功能栈深度分析',
      '详细职业规划指南',
      '恋爱兼容性报告',
      '个人成长建议',
      '精美PDF报告导出'
    ],
    recommended: false
  }
];

// Sample questions for testing (in production, this would be a full database)
const sampleQuestions: Question[] = [
  {
    id: 1,
    content: '在社交场合中，你通常表现得比较外向和活跃',
    dimension: 'E_I',
    direction: 'positive'
  },
  {
    id: 2,
    content: '你更喜欢独处或与少数亲密的朋友相处',
    dimension: 'E_I',
    direction: 'reverse'
  },
  {
    id: 3,
    content: '你更关注具体的事实和细节，而不是抽象的概念',
    dimension: 'S_N',
    direction: 'positive'
  },
  {
    id: 4,
    content: '你更喜欢思考未来的可能性，而不是当下的现实',
    dimension: 'S_N',
    direction: 'reverse'
  },
  {
    id: 5,
    content: '在做决定时，你更注重逻辑和客观分析',
    dimension: 'T_F',
    direction: 'positive'
  },
  {
    id: 6,
    content: '在做决定时，你更考虑他人的感受和价值观',
    dimension: 'T_F',
    direction: 'reverse'
  },
  {
    id: 7,
    content: '你喜欢有计划、有组织的生活方式',
    dimension: 'J_P',
    direction: 'positive'
  },
  {
    id: 8,
    content: '你更喜欢灵活、随性的生活方式',
    dimension: 'J_P',
    direction: 'reverse'
  }
];

export function getMBTITypes(): PersonalityType[] {
  return mbtiTypes;
}

export function getMBTIType(code: MBTIType): PersonalityType | undefined {
  return mbtiTypes.find(type => type.code === code);
}

export function getTestVersions(): TestVersion[] {
  return testVersions;
}

export function getQuestions(version: 'quick' | 'standard' | 'professional'): Question[] {
  // In production, this would return different question sets based on version
  const count = version === 'quick' ? 28 : version === 'standard' ? 48 : 93;
  // For now, return the sample questions repeated
  const result: Question[] = [];
  for (let i = 0; i < count; i++) {
    const base = sampleQuestions[i % sampleQuestions.length];
    result.push({
      ...base,
      id: i + 1,
      content: base.content // In production, these would be unique questions
    });
  }
  return result;
}
