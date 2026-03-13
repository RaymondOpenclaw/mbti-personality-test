import { MBTIType, Dimension, DimensionScore, Answer, Question, MBTIResult } from '@/types';

export function calculateMBTI(
  answers: Answer[],
  questions: Question[]
): { type: MBTIType; dimensions: DimensionScore[] } {
  // Initialize scores
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Calculate scores
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const value = answer.value; // 1-5
    let points: number;

    if (question.direction === 'positive') {
      points = value;
    } else {
      points = 6 - value; // Reverse scoring
    }

    // Add points to appropriate dimension
    switch (question.dimension) {
      case 'E_I':
        if (question.direction === 'positive') {
          scores.E += points;
        } else {
          scores.I += points;
        }
        break;
      case 'S_N':
        if (question.direction === 'positive') {
          scores.S += points;
        } else {
          scores.N += points;
        }
        break;
      case 'T_F':
        if (question.direction === 'positive') {
          scores.T += points;
        } else {
          scores.F += points;
        }
        break;
      case 'J_P':
        if (question.direction === 'positive') {
          scores.J += points;
        } else {
          scores.P += points;
        }
        break;
    }
  });

  // Calculate dimensions
  const dimensions: DimensionScore[] = [
    calculateDimension('E_I', scores.E, scores.I),
    calculateDimension('S_N', scores.S, scores.N),
    calculateDimension('T_F', scores.T, scores.F),
    calculateDimension('J_P', scores.J, scores.P)
  ];

  // Determine type
  const type = dimensions.map(d => d.result).join('') as MBTIType;

  return { type, dimensions };
}

function calculateDimension(
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P',
  leftScore: number,
  rightScore: number
): DimensionScore {
  const total = leftScore + rightScore;
  const leftPercentage = total > 0 ? (leftScore / total) * 100 : 50;
  const rightPercentage = total > 0 ? (rightScore / total) * 100 : 50;

  let result: Dimension;
  let percentage: number;

  switch (dimension) {
    case 'E_I':
      result = leftPercentage >= 50 ? 'E' : 'I';
      percentage = Math.max(leftPercentage, rightPercentage);
      break;
    case 'S_N':
      result = leftPercentage >= 50 ? 'S' : 'N';
      percentage = Math.max(leftPercentage, rightPercentage);
      break;
    case 'T_F':
      result = leftPercentage >= 50 ? 'T' : 'F';
      percentage = Math.max(leftPercentage, rightPercentage);
      break;
    case 'J_P':
      result = leftPercentage >= 50 ? 'J' : 'P';
      percentage = Math.max(leftPercentage, rightPercentage);
      break;
  }

  return {
    dimension,
    leftScore,
    rightScore,
    result,
    percentage
  };
}

export function getMBTIResult(type: MBTIType): Omit<MBTIResult, 'dimensions'> {
  const typeDetails: Record<string, MBTIResult> = {
    ISTJ: {
      type: 'ISTJ',
      nickname: '检查者 - 物流师',
      description: '务实可靠，注重细节，责任心强。ISTJ是传统和秩序的守护者，他们以踏实的工作态度和坚定的原则著称。',
      strengths: ['责任心强，值得信赖', '注重细节，做事准确', '组织能力强', '遵守承诺，忠诚可靠'],
      weaknesses: ['过于保守，抗拒改变', '可能显得冷漠或不近人情', '对自己要求过高', '难以表达情感'],
      careers: ['会计师', '审计师', '项目经理', '公务员', '军官', '律师', '医生'],
      relationships: ['忠诚可靠的伴侣', '重视长期承诺', '用实际行动表达爱', '需要时间建立信任'],
      growth: ['学会接受变化和新方法', '培养情感表达能力', '适当放松对自己的要求', '倾听他人的感受']
    },
    ISFJ: {
      type: 'ISFJ',
      nickname: '保护者 - 守卫者',
      description: '温暖体贴，乐于助人，具有强烈的责任感和服务精神。ISFJ是无私的守护者，总是默默关心着身边的人。',
      strengths: ['富有同情心，善解人意', '可靠，值得信赖', '耐心细致', '实际，脚踏实地'],
      weaknesses: ['过度自我牺牲', '难以拒绝他人', '回避冲突', '对自己过于苛刻'],
      careers: ['护士', '教师', '社工', '行政助理', '图书管理员', '客户服务', '儿科医生'],
      relationships: ['温柔体贴的伴侣', '重视家庭', '默默付出', '需要被理解和欣赏'],
      growth: ['学会设定边界', '不要忽视自己的需求', '面对冲突而不是回避', '接受自己的不完美']
    },
    INFJ: {
      type: 'INFJ',
      nickname: '提倡者 - 预言家',
      description: '富有洞察力，理想主义，追求意义，是安静的理想主义者。INFJ渴望理解他人并帮助世界变得更好。',
      strengths: ['深刻的洞察力', '富有创造力和想象力', '坚定的原则', '真诚关心他人'],
      weaknesses: ['过于理想主义', '容易 burnout', '难以被人理解', '过于敏感'],
      careers: ['心理学家', '作家', '顾问', '非营利组织工作者', '教师', '人力资源', '灵性导师'],
      relationships: ['深度连接的伴侣', '需要真诚的交流', '重视精神层面', '需要独处时间'],
      growth: ['接受不完美', '学会放下控制', '照顾好自己的身心健康', '不要试图拯救所有人']
    },
    INTJ: {
      type: 'INTJ',
      nickname: '建筑师 - 战略家',
      description: '独立思考，追求完美，具有战略眼光和高效执行力。INTJ是天生的规划者，总是着眼于未来。',
      strengths: ['卓越的战略思维', '独立自主', '效率高', '坚定的目标导向'],
      weaknesses: ['可能显得傲慢', '不耐烦', '情感表达困难', '过度分析'],
      careers: ['战略顾问', '投资分析师', '软件架构师', '科学家', '高管', '律师', '产品经理'],
      relationships: ['智慧的伴侣', '重视智力交流', '忠诚但需空间', '用行动表达关心'],
      growth: ['培养同理心', '学会表达情感', '接受不完美', '对他人更有耐心']
    },
    ISTP: {
      type: 'ISTP',
      nickname: '鉴赏家 - 手艺人',
      description: '灵活务实，善于分析问题，喜欢动手操作和解决技术难题。ISTP是冷静的观察者，擅长应急处理。',
      strengths: ['出色的问题解决能力', '灵活应变', '动手能力强', '理性客观'],
      weaknesses: ['承诺恐惧', '情感疏离', '容易厌倦', '冲动冒险'],
      careers: ['工程师', '飞行员', '消防员', '程序员', '机械师', '侦探', '运动员'],
      relationships: ['独立的伴侣', '需要自由空间', '忠诚但低调', '用行动而非言语'],
      growth: ['培养长期承诺', '关注情感连接', '避免过度冒险', '学会规划未来']
    },
    ISFP: {
      type: 'ISFP',
      nickname: '探险家 - 艺术家',
      description: '敏感温和，追求和谐，具有艺术天赋和强烈的个人价值观。ISFP享受当下，是天生的艺术家。',
      strengths: ['艺术天赋', '共情能力强', '灵活适应', '真诚待人'],
      weaknesses: ['回避冲突', '难以做决定', '容易受伤', '缺乏长期规划'],
      careers: ['艺术家', '设计师', '音乐家', '护士', '厨师', '摄影师', '理疗师'],
      relationships: ['温柔的伴侣', '重视和谐', '用行动表达爱', '需要肯定'],
      growth: ['学会面对冲突', '培养决策能力', '建立自信', '规划长远目标']
    },
    INFP: {
      type: 'INFP',
      nickname: '调停者 - 治愈者',
      description: '理想主义，忠于内心，富有创造力和同情心。INFP是梦想家，追求真实和意义。',
      strengths: ['深刻的同理心', '创造力丰富', '价值观坚定', '开放包容'],
      weaknesses: ['过于理想化', '容易沮丧', '拖延症', '自我批评'],
      careers: ['作家', '心理咨询师', '艺术家', '社会工作者', '教师', '翻译', '设计师'],
      relationships: ['深情的伴侣', '寻求灵魂连接', '忠诚专一', '需要理解'],
      growth: ['接受现实不完美', '采取行动', '减少自我批评', '建立边界']
    },
    INTP: {
      type: 'INTP',
      nickname: '逻辑学家 - 思想家',
      description: '好奇心强，喜欢分析理论，追求知识和真理。INTP是创新的思想家，热爱智力挑战。',
      strengths: ['逻辑思维强', '创新思维', '客观公正', '求知欲旺盛'],
      weaknesses: ['社交困难', '脱离现实', '决策拖延', '过于挑剔'],
      careers: ['科学家', '软件工程师', '数学家', '哲学家', '分析师', '研究员', '建筑师'],
      relationships: ['智慧的伴侣', '重视智力交流', '独立但忠诚', '不善表达情感'],
      growth: ['培养社交技能', '关注实际应用', '及时做决定', '接纳不完美']
    },
    ESTP: {
      type: 'ESTP',
      nickname: '企业家 - 挑战者',
      description: '精力充沛，敢于冒险，善于把握机会。ESTP是行动派，活在当下，热爱刺激。',
      strengths: ['行动力强', '适应力佳', '务实直接', '善于应变'],
      weaknesses: ['冲动鲁莽', '不耐烦', '风险意识低', '忽视长期后果'],
      careers: ['销售', '创业者', '投资交易员', '体育教练', '急救人员', '工程师', '演员'],
      relationships: ['激情的伴侣', '追求刺激', '诚实直接', '需要自由'],
      growth: ['三思而后行', '培养耐心', '考虑长期影响', '关注他人感受']
    },
    ESFP: {
      type: 'ESFP',
      nickname: '表演者 - 娱乐家',
      description: '热情开朗，善于社交，喜欢成为焦点。ESFP是派对灵魂，享受生活的每一刻。',
      strengths: ['社交能力强', '乐观积极', '灵活应变', '善于观察'],
      weaknesses: ['回避严肃话题', '容易分心', '对批评敏感', '缺乏规划'],
      careers: ['活动策划', '公关', '销售', '演员', '幼教', '导游', '主持人'],
      relationships: ['有趣的伴侣', '重视陪伴', '表达爱意直接', '需要关注'],
      growth: ['学会处理严肃问题', '提高专注力', '建立抗压能力', '制定长远计划']
    },
    ENFP: {
      type: 'ENFP',
      nickname: '竞选者 - 启发者',
      description: '充满热情，富有创意，善于激励他人。ENFP是自由的灵魂，充满无限可能。',
      strengths: ['创意丰富', '沟通能力强', '适应力佳', '善于鼓舞他人'],
      weaknesses: ['容易分心', '执行拖延', '情绪波动', '过于理想化'],
      careers: ['咨询顾问', '市场营销', '记者', '创业者', '教师', '编剧', '培训师'],
      relationships: ['浪漫的伴侣', '寻求深层连接', '忠诚支持', '需要理解'],
      growth: ['提高执行力', '建立专注力', '情绪管理', '脚踏实地']
    },
    ENTP: {
      type: 'ENTP',
      nickname: '辩论家 - 发明家',
      description: '机智聪明，喜欢辩论，善于创新思维。ENTP热爱智力挑战，是创新的推动者。',
      strengths: ['思维敏捷', '创新能力强', '善于辩论', '适应力强'],
      weaknesses: ['好辩', '容易厌倦', '执行力弱', '可能显得傲慢'],
      careers: ['战略顾问', '律师', '创业者', '发明家', '工程师', '记者', '投资人'],
      relationships: ['机智的伴侣', '重视智力刺激', '忠诚但需新鲜感', '不善处理情感'],
      growth: ['学会倾听', '坚持完成任务', '尊重他人观点', '培养同理心']
    },
    ESTJ: {
      type: 'ESTJ',
      nickname: '总经理 - 执行者',
      description: '务实高效，善于管理，重视传统和秩序。ESTJ是可靠的组织者，追求效率和结果。',
      strengths: ['组织能力佳', '务实直接', '责任心强', '果断高效'],
      weaknesses: ['固执己见', '不够灵活', '可能显得专横', '忽视情感因素'],
      careers: ['高管', '项目经理', '军官', '法官', '财务总监', '运营总监', '公务员'],
      relationships: ['可靠的伴侣', '重视承诺', '保护家人', '需学习表达情感'],
      growth: ['学会灵活变通', '倾听不同意见', '关注他人感受', '避免过于武断']
    },
    ESFJ: {
      type: 'ESFJ',
      nickname: '执政官 - 供给者',
      description: '热心助人，善于协调，重视和谐与人际关系。ESFJ是忠诚的朋友，天生的照顾者。',
      strengths: ['社交能力强', '热心助人', '组织能力强', '忠诚可靠'],
      weaknesses: ['过分在意他人看法', '回避冲突', '可能多管闲事', '情感依赖'],
      careers: ['人力资源', '客户服务', '销售', '护士', '教师', '社工', '行政'],
      relationships: ['体贴的伴侣', '重视家庭', '全心全意付出', '需要被认可'],
      growth: ['学会设定边界', '不要过度付出', '接受不同意见', '培养独立性']
    },
    ENFJ: {
      type: 'ENFJ',
      nickname: '主人公 - 教导者',
      description: '魅力四射，善于领导，关心他人成长。ENFJ是鼓舞人心的领导者，追求共同成长。',
      strengths: ['领导力强', '善于沟通', '洞察他人需求', '富有感染力'],
      weaknesses: ['过度投入他人', '忽视自身需求', '对批评敏感', '可能操纵他人'],
      careers: ['培训师', '咨询顾问', '人力资源总监', '教练', '政治家', '非营利组织领导'],
      relationships: ['支持的伴侣', '促进对方成长', '全心投入', '需平衡自我与他人'],
      growth: ['学会说不', '关注自身需求', '接受不完美', '避免过度干涉']
    },
    ENTJ: {
      type: 'ENTJ',
      nickname: '指挥官 - 领导者',
      description: '果断自信，具有战略眼光，是天生的领导者。ENTJ追求效率和成就，善于组织资源。',
      strengths: ['战略思维强', '果断高效', '领导力强', '目标导向'],
      weaknesses: ['可能显得冷酷', '不耐烦', '对效率低下零容忍', '忽视情感因素'],
      careers: ['CEO', '战略顾问', '投资人', '律师', '企业家', '管理顾问', '军官'],
      relationships: ['强大的伴侣', '共同追求目标', '忠诚保护', '需学习情感表达'],
      growth: ['培养同理心', '学会耐心等待', '重视过程而非仅结果', '倾听他人感受']
    }
  };

  const result = typeDetails[type];
  if (!result) {
    throw new Error(`Invalid MBTI type: ${type}`);
  }
  return result;
}
