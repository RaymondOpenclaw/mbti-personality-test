import { MBTIType, PersonalityType, Question, TestVersion } from '@/types';

// 四色系配色系统（参考16personalities）
const colorSystem = {
  // 分析家 (NT) - 紫色系
  analyst: {
    primary: '#8B5CF6',    // violet-500
    secondary: '#A78BFA',  // violet-400
    light: '#EDE9FE',      // violet-100
    dark: '#5B21B6',       // violet-800
    gradient: 'from-violet-500 to-purple-600'
  },
  // 外交家 (NF) - 绿色系
  diplomat: {
    primary: '#10B981',    // emerald-500
    secondary: '#34D399',  // emerald-400
    light: '#D1FAE5',      // emerald-100
    dark: '#065F46',       // emerald-800
    gradient: 'from-emerald-500 to-teal-600'
  },
  // 守护者 (SJ) - 蓝色系
  sentinel: {
    primary: '#3B82F6',    // blue-500
    secondary: '#60A5FA',  // blue-400
    light: '#DBEAFE',      // blue-100
    dark: '#1E40AF',       // blue-800
    gradient: 'from-blue-500 to-indigo-600'
  },
  // 探险家 (SP) - 黄色/橙色系
  explorer: {
    primary: '#F59E0B',    // amber-500
    secondary: '#FBBF24',  // amber-400
    light: '#FEF3C7',      // amber-100
    dark: '#92400E',       // amber-800
    gradient: 'from-amber-500 to-orange-600'
  }
};

export const mbtiTypes: PersonalityType[] = [
  {
    code: 'ISTJ',
    name: '检查者',
    nickname: '物流师',
    emoji: '📋',
    description: '务实可靠，注重细节，责任心强。ISTJ是传统和秩序的守护者，他们以踏实的工作态度和坚定的原则著称。在混乱中保持冷静，在压力下维持效率，是你值得信赖的伙伴。',
    image: '/images/types/istj.png',
    color: colorSystem.sentinel.primary,
    colorTheme: colorSystem.sentinel,
    group: 'sentinel',
    groupName: '守护者',
    functions: ['内向实感 (Si)', '外向思维 (Te)', '内向情感 (Fi)', '外向直觉 (Ne)'],
    famous: ['乔治·华盛顿', '沃伦·巴菲特', '安吉丽娜·朱莉'],
    traits: ['责任心强', '注重细节', '可靠务实', '遵守规则'],
    careers: ['会计师', '审计师', '项目经理', '公务员', '军官', '律师', '医生'],
    growthAreas: ['学会灵活变通', '培养创新思维', '表达内心感受']
  },
  {
    code: 'ISFJ',
    name: '保护者',
    nickname: '守卫者',
    emoji: '🛡️',
    description: '温暖体贴，乐于助人，具有强烈的责任感和服务精神。ISFJ是无私的守护者，总是默默关心着身边的人。他们的同理心和耐心让周围的世界变得更加温暖。',
    image: '/images/types/isfj.png',
    color: colorSystem.sentinel.primary,
    colorTheme: colorSystem.sentinel,
    group: 'sentinel',
    groupName: '守护者',
    functions: ['内向实感 (Si)', '外向情感 (Fe)', '内向思维 (Ti)', '外向直觉 (Ne)'],
    famous: ['凯特·米德尔顿', '特蕾莎修女', '罗伯特·帕丁森'],
    traits: ['富有同情心', '可靠耐心', '实际务实', '忠诚奉献'],
    careers: ['护士', '教师', '社工', '行政助理', '图书管理员', '客户服务'],
    growthAreas: ['学会设定边界', '关注自身需求', '面对冲突而非回避']
  },
  {
    code: 'INFJ',
    name: '提倡者',
    nickname: '预言家',
    emoji: '🔮',
    description: '富有洞察力，理想主义，追求意义，是安静的理想主义者。INFJ渴望理解他人并帮助世界变得更好。他们的直觉和同理心让他们能看透事物的本质。',
    image: '/images/types/infj.png',
    color: colorSystem.diplomat.primary,
    colorTheme: colorSystem.diplomat,
    group: 'diplomat',
    groupName: '外交家',
    functions: ['内向直觉 (Ni)', '外向情感 (Fe)', '内向思维 (Ti)', '外向实感 (Se)'],
    famous: ['马丁·路德·金', '纳尔逊·曼德拉', 'Lady Gaga'],
    traits: ['深刻洞察', '富有创造力', '原则坚定', '真诚关怀'],
    careers: ['心理学家', '作家', '顾问', '非营利组织工作者', '教师', '人力资源'],
    growthAreas: ['接受不完美', '学会自我照顾', '不要试图拯救所有人']
  },
  {
    code: 'INTJ',
    name: '建筑师',
    nickname: '战略家',
    emoji: '🏗️',
    description: '独立思考，追求完美，具有战略眼光和高效执行力。INTJ是天生的规划者，总是着眼于未来。他们的创新思维和坚定意志让他们能够实现宏大目标。',
    image: '/images/types/intj.png',
    color: colorSystem.analyst.primary,
    colorTheme: colorSystem.analyst,
    group: 'analyst',
    groupName: '分析家',
    functions: ['内向直觉 (Ni)', '外向思维 (Te)', '内向情感 (Fi)', '外向实感 (Se)'],
    famous: ['埃隆·马斯克', '马克·扎克伯格', '弗里德里希·尼采'],
    traits: ['战略思维', '独立自主', '高效执行', '目标导向'],
    careers: ['战略顾问', '投资分析师', '软件架构师', '科学家', '高管', '律师'],
    growthAreas: ['培养同理心', '学会表达情感', '接受不完美']
  },
  {
    code: 'ISTP',
    name: '鉴赏家',
    nickname: '手艺人',
    emoji: '🔧',
    description: '灵活务实，善于分析问题，喜欢动手操作和解决技术难题。ISTP是冷静的观察者，擅长应急处理。他们的实用主义和创新精神让他们成为优秀的问题解决者。',
    image: '/images/types/istp.png',
    color: colorSystem.explorer.primary,
    colorTheme: colorSystem.explorer,
    group: 'explorer',
    groupName: '探险家',
    functions: ['内向思维 (Ti)', '外向实感 (Se)', '内向直觉 (Ni)', '外向情感 (Fe)'],
    famous: ['汤姆·克鲁斯', '克林特·伊斯特伍德', '迈克尔·乔丹'],
    traits: ['问题解决', '灵活应变', '动手能力强', '理性客观'],
    careers: ['工程师', '飞行员', '消防员', '程序员', '机械师', '侦探'],
    growthAreas: ['培养长期承诺', '关注情感连接', '学会规划未来']
  },
  {
    code: 'ISFP',
    name: '探险家',
    nickname: '艺术家',
    emoji: '🎨',
    description: '敏感温和，追求和谐，具有艺术天赋和强烈的个人价值观。ISFP享受当下，是天生的艺术家。他们的创造力和对美的追求让生活充满色彩。',
    image: '/images/types/isfp.png',
    color: colorSystem.explorer.primary,
    colorTheme: colorSystem.explorer,
    group: 'explorer',
    groupName: '探险家',
    functions: ['内向情感 (Fi)', '外向实感 (Se)', '内向直觉 (Ni)', '外向思维 (Te)'],
    famous: ['迈克尔·杰克逊', '大卫·贝克汉姆', '布兰妮·斯皮尔斯'],
    traits: ['艺术天赋', '共情能力强', '灵活适应', '真诚待人'],
    careers: ['艺术家', '设计师', '音乐家', '护士', '厨师', '摄影师'],
    growthAreas: ['学会面对冲突', '培养决策能力', '建立长远目标']
  },
  {
    code: 'INFP',
    name: '调停者',
    nickname: '治愈者',
    emoji: '🌸',
    description: '理想主义，忠于内心，富有创造力和同情心。INFP是梦想家，追求真实和意义。他们的内心世界丰富而深刻，总是寻找让生活更美好的方式。',
    image: '/images/types/infp.png',
    color: colorSystem.diplomat.primary,
    colorTheme: colorSystem.diplomat,
    group: 'diplomat',
    groupName: '外交家',
    functions: ['内向情感 (Fi)', '外向直觉 (Ne)', '内向实感 (Si)', '外向思维 (Te)'],
    famous: ['威廉·莎士比亚', '托尔金', '约翰·列侬'],
    traits: ['深刻同理心', '创造力丰富', '价值观坚定', '开放包容'],
    careers: ['作家', '心理咨询师', '艺术家', '社会工作者', '教师', '翻译'],
    growthAreas: ['接受现实不完美', '采取行动', '减少自我批评']
  },
  {
    code: 'INTP',
    name: '逻辑学家',
    nickname: '思想家',
    emoji: '🧩',
    description: '好奇心强，喜欢分析理论，追求知识和真理。INTP是创新的思想家，热爱智力挑战。他们的逻辑思维和求知欲推动着知识的边界。',
    image: '/images/types/intp.png',
    color: colorSystem.analyst.primary,
    colorTheme: colorSystem.analyst,
    group: 'analyst',
    groupName: '分析家',
    functions: ['内向思维 (Ti)', '外向直觉 (Ne)', '内向实感 (Si)', '外向情感 (Fe)'],
    famous: ['爱因斯坦', '比尔·盖茨', '艾萨克·牛顿'],
    traits: ['逻辑思维强', '创新思维', '客观公正', '求知欲旺盛'],
    careers: ['科学家', '软件工程师', '数学家', '哲学家', '分析师', '研究员'],
    growthAreas: ['培养社交技能', '关注实际应用', '及时做决定']
  },
  {
    code: 'ESTP',
    name: '企业家',
    nickname: '挑战者',
    emoji: '🚀',
    description: '精力充沛，敢于冒险，善于把握机会。ESTP是行动派，活在当下，热爱刺激。他们的勇气和决断力让他们成为天生的创业者。',
    image: '/images/types/estp.png',
    color: colorSystem.explorer.primary,
    colorTheme: colorSystem.explorer,
    group: 'explorer',
    groupName: '探险家',
    functions: ['外向实感 (Se)', '内向思维 (Ti)', '外向情感 (Fe)', '内向直觉 (Ni)'],
    famous: ['欧内斯特·海明威', '杰克·尼科尔森', '麦当娜'],
    traits: ['行动力强', '适应力佳', '务实直接', '善于应变'],
    careers: ['销售', '创业者', '投资交易员', '体育教练', '急救人员', '工程师'],
    growthAreas: ['三思而后行', '培养耐心', '考虑长期影响']
  },
  {
    code: 'ESFP',
    name: '表演者',
    nickname: '娱乐家',
    emoji: '🎭',
    description: '热情开朗，善于社交，喜欢成为焦点。ESFP是派对灵魂，享受生活的每一刻。他们的活力和魅力让周围的人都感到快乐。',
    image: '/images/types/esfp.png',
    color: colorSystem.explorer.primary,
    colorTheme: colorSystem.explorer,
    group: 'explorer',
    groupName: '探险家',
    functions: ['外向实感 (Se)', '外向情感 (Fe)', '内向思维 (Ti)', '内向直觉 (Ni)'],
    famous: ['玛丽莲·梦露', '埃尔顿·约翰', '保罗·麦卡特尼'],
    traits: ['社交能力强', '乐观积极', '灵活应变', '善于观察'],
    careers: ['活动策划', '公关', '销售', '演员', '幼教', '导游'],
    growthAreas: ['学会处理严肃问题', '提高专注力', '制定长远计划']
  },
  {
    code: 'ENFP',
    name: '竞选者',
    nickname: '启发者',
    emoji: '✨',
    description: '充满热情，富有创意，善于激励他人。ENFP是自由的灵魂，充满无限可能。他们的热情和创新思维让他们成为优秀的启发者。',
    image: '/images/types/enfp.png',
    color: colorSystem.diplomat.primary,
    colorTheme: colorSystem.diplomat,
    group: 'diplomat',
    groupName: '外交家',
    functions: ['外向直觉 (Ne)', '外向情感 (Fe)', '内向实感 (Si)', '内向思维 (Ti)'],
    famous: ['小罗伯特·唐尼', '罗宾·威廉姆斯', '沃尔特·迪士尼'],
    traits: ['创意丰富', '沟通能力强', '适应力佳', '善于鼓舞他人'],
    careers: ['咨询顾问', '市场营销', '记者', '创业者', '教师', '编剧'],
    growthAreas: ['提高执行力', '建立专注力', '情绪管理']
  },
  {
    code: 'ENTP',
    name: '辩论家',
    nickname: '发明家',
    emoji: '💡',
    description: '机智聪明，喜欢辩论，善于创新思维。ENTP热爱智力挑战，是创新的推动者。他们的创造力和辩论技巧让他们成为思想的先锋。',
    image: '/images/types/entp.png',
    color: colorSystem.analyst.primary,
    colorTheme: colorSystem.analyst,
    group: 'analyst',
    groupName: '分析家',
    functions: ['外向直觉 (Ne)', '内向思维 (Ti)', '外向情感 (Fe)', '内向实感 (Si)'],
    famous: ['托马斯·爱迪生', '马克·吐温', '席琳·迪翁'],
    traits: ['思维敏捷', '创新能力强', '善于辩论', '适应力强'],
    careers: ['战略顾问', '律师', '创业者', '发明家', '工程师', '记者'],
    growthAreas: ['学会倾听', '坚持完成任务', '尊重他人观点']
  },
  {
    code: 'ESTJ',
    name: '总经理',
    nickname: '执行者',
    emoji: '👔',
    description: '务实高效，善于管理，重视传统和秩序。ESTJ是可靠的组织者，追求效率和结果。他们的领导力和执行力让团队运转如钟表般精准。',
    image: '/images/types/estj.png',
    color: colorSystem.sentinel.primary,
    colorTheme: colorSystem.sentinel,
    group: 'sentinel',
    groupName: '守护者',
    functions: ['外向思维 (Te)', '内向实感 (Si)', '外向直觉 (Ne)', '内向情感 (Fi)'],
    famous: ['亨利·福特', '乔治·华盛顿', '奥普拉·温弗瑞'],
    traits: ['组织能力佳', '务实直接', '责任心强', '果断高效'],
    careers: ['高管', '项目经理', '军官', '法官', '财务总监', '运营总监'],
    growthAreas: ['学会灵活变通', '倾听不同意见', '关注他人感受']
  },
  {
    code: 'ESFJ',
    name: '执政官',
    nickname: '供给者',
    emoji: '🤝',
    description: '热心助人，善于协调，重视和谐与人际关系。ESFJ是忠诚的朋友，天生的照顾者。他们的关怀和组织能力让社区更加温暖和谐。',
    image: '/images/types/esfj.png',
    color: colorSystem.sentinel.primary,
    colorTheme: colorSystem.sentinel,
    group: 'sentinel',
    groupName: '守护者',
    functions: ['外向情感 (Fe)', '内向实感 (Si)', '外向直觉 (Ne)', '内向思维 (Ti)'],
    famous: ['泰勒·斯威夫特', '比尔·克林顿', '詹妮弗·劳伦斯'],
    traits: ['社交能力强', '热心助人', '组织能力强', '忠诚可靠'],
    careers: ['人力资源', '客户服务', '销售', '护士', '教师', '社工'],
    growthAreas: ['学会设定边界', '不要过度付出', '接受不同意见']
  },
  {
    code: 'ENFJ',
    name: '主人公',
    nickname: '教导者',
    emoji: '🌟',
    description: '魅力四射，善于领导，关心他人成长。ENFJ是鼓舞人心的领导者，追求共同成长。他们的同理心和愿景让团队发挥出最大潜力。',
    image: '/images/types/enfj.png',
    color: colorSystem.diplomat.primary,
    colorTheme: colorSystem.diplomat,
    group: 'diplomat',
    groupName: '外交家',
    functions: ['外向情感 (Fe)', '内向直觉 (Ni)', '外向实感 (Se)', '内向思维 (Ti)'],
    famous: ['奥巴马', '奥普拉·温弗瑞', '约翰·保罗二世'],
    traits: ['领导力强', '善于沟通', '洞察他人需求', '富有感染力'],
    careers: ['培训师', '咨询顾问', '人力资源总监', '教练', '政治家'],
    growthAreas: ['学会说不', '关注自身需求', '避免过度干涉']
  },
  {
    code: 'ENTJ',
    name: '指挥官',
    nickname: '领导者',
    emoji: '👑',
    description: '果断自信，具有战略眼光，是天生的领导者。ENTJ追求效率和成就，善于组织资源。他们的决断力和远见让他们能够带领团队达成宏伟目标。',
    image: '/images/types/entj.png',
    color: colorSystem.analyst.primary,
    colorTheme: colorSystem.analyst,
    group: 'analyst',
    groupName: '分析家',
    functions: ['外向思维 (Te)', '内向直觉 (Ni)', '外向实感 (Se)', '内向情感 (Fi)'],
    famous: ['史蒂夫·乔布斯', '拿破仑', '戈登·拉姆齐'],
    traits: ['战略思维强', '果断高效', '领导力强', '目标导向'],
    careers: ['CEO', '战略顾问', '投资人', '律师', '企业家', '管理顾问'],
    growthAreas: ['培养同理心', '学会耐心等待', '重视过程而非仅结果']
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

// 获取分组统计
export function getGroupStats() {
  return {
    analyst: mbtiTypes.filter(t => t.group === 'analyst').length,
    diplomat: mbtiTypes.filter(t => t.group === 'diplomat').count,
    sentinel: mbtiTypes.filter(t => t.group === 'sentinel').length,
    explorer: mbtiTypes.filter(t => t.group === 'explorer').length
  };
}
