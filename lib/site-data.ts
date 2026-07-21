import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  Headphones,
  LineChart,
  LockKeyhole,
  Megaphone,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
  Wrench,
} from "lucide-react";
import { businessFacts } from "@/lib/confirmed-facts";
import { isConfirmedForPublicUse } from "@/lib/content-policy";

type SiteLocale = "en" | "zh";

export const locale: SiteLocale = process.env.NEXT_PUBLIC_SITE_LOCALE === "zh" ? "zh" : "en";
export const isChineseSite = locale === "zh";

export const domains = {
  en: "ovops.com",
  zh: "www.ovops.com",
};

const currentDomain = domains[locale];
export const siteUrl = `https://${currentDomain}`;
export const apiPlatformUrl = "https://models.ovops.com/";
const publicLegalEntity = isConfirmedForPublicUse(businessFacts.legalEntity) ? businessFacts.legalEntity.value : undefined;
const publicContact = isConfirmedForPublicUse(businessFacts.contact) ? businessFacts.contact.value : undefined;
const publicFilings = isConfirmedForPublicUse(businessFacts.filings) ? businessFacts.filings.value : undefined;

export const site = {
  name: "Origin Vector",
  cnName: "原点向量",
  legalName: publicLegalEntity ? (isChineseSite ? publicLegalEntity.zh : publicLegalEntity.en) : "",
  icpFiling: publicFilings?.icp ?? "",
  icpUrl: "https://beian.miit.gov.cn/",
  publicSecurityFiling: publicFilings?.publicSecurity ?? "",
  publicSecurityUrl: "https://beian.mps.gov.cn/#/query/webSearch?code=44030002013952",
  domain: currentDomain,
  email: publicContact ? (isChineseSite ? publicContact.email.zh : publicContact.email.en) : "",
  location: "",
  brandLine: isChineseSite ? "原点向量｜AI提效服务商" : "AI Productivity Partner",
  cnPositioning: "AI提效服务商",
  slogan: isChineseSite
    ? "OPC超级个体"
    : "AI-Powered One-Person Company",
  description: isChineseSite
    ? "原点向量是专注AI企业提效的AI提效服务商，帮助企业把AI业务系统、AI工作流自动化、知识资产、销售客服话术、内容资产、SOP 和经营复盘流程，转化为可复用、可追踪、可迭代的提效系统。"
    : "Origin Vector is an AI productivity partner helping growing businesses turn AI workflow automation, reusable knowledge assets, RAG-ready knowledge bases and operating dashboards into measurable business systems.",
};

export const ui = {
  learnMore: isChineseSite ? "了解服务" : "Learn More",
  footerSite: isChineseSite ? "网站导航" : "Site",
  footerCompliance: isChineseSite ? "合规页面" : "Compliance",
  footerLanguage: isChineseSite ? "语言" : "Language",
  mainDomainNote: isChineseSite
    ? "中文站点：www.ovops.com。Postiz 子域名独立运行，不属于官网范围。"
    : "Main domain: ovops.com. The Postiz subdomain is operated separately and is not part of this website.",
};

export const navigation = isChineseSite
  ? [
      { href: "/", label: "首页" },
      { href: "/solutions", label: "解决方案" },
      { href: "/industries", label: "行业与场景" },
      { href: "/work", label: "典型场景" },
      { href: "/scenarios", label: "场景分类" },
      { href: "/insights", label: "洞察" },
      { href: "/delivery-process", label: "交付方式" },
      { href: "/about", label: "公司介绍" },
    ]
  : [
      { href: "/", label: "Home" },
      { href: "/solutions", label: "Solutions" },
      { href: "/industries", label: "Industries" },
      { href: "/work", label: "Scenarios" },
      { href: "/scenarios", label: "Scenario Library" },
      { href: "/insights", label: "Insights" },
      { href: "/delivery-process", label: "Delivery" },
      { href: "/about", label: "Company Profile" },
    ];

export const homeCopy = {
  metadataTitle: isChineseSite ? "原点向量 - AI提效服务商" : "Origin Vector | AI Productivity Partner",
  metadataDescription: site.description,
  heroTitle: isChineseSite ? site.name : "Origin Vector",
  heroDescription: isChineseSite
    ? "原点向量专注AI企业提效，帮助中小企业把AI嵌入真实业务流程，通过业务诊断、知识资产化、岗位工具和工作流开发，把产品资料、销售话术、客服问答、内容资产和经营复盘等转化为可复用、可追踪、可迭代的AI提效系统。"
    : "Origin Vector turns real business workflows into reusable AI operating systems. We combine diagnosis, knowledge structuring, role tools and workflow development to make sales, support, content and review loops traceable and measurable.",
  heroNote: isChineseSite ? "真正需要的不是再买一个AI工具，而是品牌自己的AI业务系统。" : "Your own AI operating system, not another tool.",
  primaryCta: isChineseSite ? "预约咨询" : "Book a Consultation",
  secondaryCta: isChineseSite ? "查看服务" : "Explore Services",
  showcaseNote: isChineseSite ? "服务场景与交付方式展示" : "Service scenarios and delivery patterns.",
  showcaseImages: isChineseSite
    ? [
        {
          src: "/showcase/showcase-desktop-1.webp",
          alt: "原点向量 AI 整合营销运营案例图",
          showBrand: false,
        },
        {
          src: "/showcase/showcase-desktop-2.webp",
          alt: "原点向量 AI 业务系统案例图",
          showBrand: false,
        },
        {
          src: "/showcase/showcase-desktop-3.webp",
          alt: "原点向量 AI 品牌资产系统案例图",
          showBrand: false,
        },
      ]
    : [
        {
          src: "/showcase/showcase-desktop-en-1.webp",
          alt: "Origin Vector AI sales support system showcase",
          showBrand: false,
        },
        {
          src: "/showcase/showcase-desktop-en-2.webp",
          alt: "Origin Vector integrated marketing showcase",
          showBrand: false,
        },
        {
          src: "/showcase/showcase-desktop-en-3.webp",
          alt: "Origin Vector brand asset system rebuild showcase",
          showBrand: false,
        },
      ],
  founderKicker: isChineseSite ? "创始人主导，业务驱动，可信交付。" : "Founder-led. Business-driven. Built for delivery.",
  founderName: isChineseSite ? "赵若淇 Roxy Chao" : "Roxy Chao",
  founderRole: isChineseSite ? "创始人及 CEO" : "Founder & CEO",
  founderImage: {
    src: "/founder/roxy-founder-profile.webp",
    alt: isChineseSite ? "Roxy Chao 创始人介绍" : "Roxy Chao founder profile",
  },
  founderTitle: isChineseSite ? "以业务问题、交付边界和持续复盘来推进 AI 与数字化项目。" : "Business problems, delivery boundaries and ongoing review guide our AI and digital work.",
  founderLead: isChineseSite
    ? "原点向量由具备复杂行业运营和项目交付经验的业务操盘手主导，更关注AI如何进入日常业务流程，并形成可复盘、可衡量的真实业务效果。"
    : "Origin Vector is led by an operator with complex industry operations and project delivery experience. We focus on how AI enters day-to-day work and creates reviewable, measurable business outcomes.",
  founderCta: isChineseSite ? "了解创始人" : "Learn More About Roxy",
  founderSummary: isChineseSite
    ? "原点向量的交付方式来自真实业务操盘：先看增长目标、组织协同、客户问题和资料资产，再把AI做成团队能持续使用的工作流。"
    : "Origin Vector is built from real operating work: start with growth goals, team collaboration, customer questions and existing knowledge assets, then turn AI into workflows teams can actually use, review and improve.",
  capabilityKicker: isChineseSite ? "我们能做什么" : "What Origin Vector Can Do",
  capabilityTitle: isChineseSite ? "AI企业提效解决方案" : "Practical AI Implementation Services",
  capabilityLead: isChineseSite
    ? "我们并非传统的代运营或AI工具提供商，而是围绕企业自己的业务、数据和团队，设计、开发并交付真正可用的AI提效解决方案。"
    : "We are not a traditional operations agency. We design, build and deliver practical AI workflows around your business, data, team and real operating needs.",
  capabilityFootnote: isChineseSite
    ? "注：以下为产品设计参考区间，实际以客户行业、数据复杂度、交付范围、英文/多语种需求、第三方工具成本和是否接入系统确定。"
    : "Pricing and timeline are reference ranges. Final scope depends on industry, data complexity, delivery depth, language needs, third-party tools and system integration.",
  vectorTitle: isChineseSite ? "VectorOps：Vectorized Business Operations" : "VectorOps: Vectorized Business Operations",
  vectorLead: isChineseSite
    ? "把企业知识、流程、内容、客户问题和岗位动作向量化、结构化、流程化，再接入AI工具与智能体。"
    : "A delivery method that vectorizes and structures company knowledge, workflows, content, customer questions and role actions before connecting them to AI tools and agents.",
  vectorSummary: isChineseSite
    ? "VectorOps 不是单点工具部署，而是企业AI落地的业务能力工程：先用轻量试点验证价值，再把高频场景沉淀为行业模板和企业自己的AI资产。"
    : "VectorOps is not a one-off tool deployment. It is a business capability engine for AI adoption: validate value through lightweight pilots, then turn repeated scenarios into reusable templates and company-owned AI assets.",
  serviceTitle: isChineseSite ? "从早期商业化验证沉淀出的服务矩阵。" : "Practical pilot services for AI adoption.",
  serviceLead: isChineseSite
    ? "初期服务聚焦诊断切入、试点交付、迭代陪跑和资产品牌化，适合中小企业、成长型品牌和服务型销售组织。"
    : "Start with a diagnosis sprint, a scoped pilot or a focused MVP, then keep only the workflows that teams can use and review.",
  serviceCta: isChineseSite ? "查看服务" : "Explore Services",
  receiveTitle: isChineseSite ? "客户实际会拿到什么" : "What clients actually receive",
  receiveLead: isChineseSite
    ? "交付物以流程、知识、看板、助手和复盘机制为主，避免停留在一次性咨询建议。"
    : "The work is delivered as workflow maps, knowledge assets, dashboards, assistant prototypes and review systems, not one-off advice.",
  workTitle: isChineseSite ? "案例先以可复用交付模式呈现。" : "Selected workflow pilots and reusable operating systems.",
  workLead: isChineseSite
    ? "公开内容遵循授权和可验证原则，重点呈现可迁移的交付结构：AI搜索基线、内容矩阵、AI客服、RAG-ready 知识库和 PMO 复盘。"
    : "Public examples follow authorization and verification standards. Each example focuses on the business problem, workflow design, reusable assets and review method.",
  workCta: isChineseSite ? "查看案例" : "View Work",
  vectorOpsImageAlt: isChineseSite ? "VectorOps 业务运营层概览" : "VectorOps operations layer overview",
  vectorOpsLink: isChineseSite ? "了解 VectorOps" : "Discover VectorOps",
};

export const homeBusinessAreas = isChineseSite
  ? [
      {
        title: "AI提效诊断",
        text: "识别最值得AI化的流程、岗位和资料，形成企业提效优先级。",
      },
      {
        title: "定制化开发",
        text: "围绕企业自身情况和业务实际，定制化开发AI智能体和工作流工具。",
      },
      {
        title: "整合营销运营",
        text: "利用最新的LLM及多模态模型，帮助企业提高营销和运营效率。",
      },
      {
        title: "品牌化资产",
        text: "将零散，不统一的品牌资产，归一化成可复用，可沉淀，可自生长的RAG系统。",
      },
    ]
  : [
      {
        title: "Business Diagnosis",
        text: "Pinpoint the workflows, role tasks and knowledge assets where AI can create the clearest productivity gains.",
      },
      {
        title: "AI Workflow Development",
        text: "Build lightweight agents, workflow tools and internal systems around each company's real operating needs.",
      },
      {
        title: "Integrated Marketing Operations",
        text: "Use LLMs, multimodal models and structured content workflows to improve marketing, content production and operating execution.",
      },
      {
        title: "Reusable Brand Knowledge",
        text: "Turn scattered brand materials, FAQs, scripts and content assets into a structured, reusable and RAG-ready knowledge base.",
      },
    ];

export const capabilityPackages = isChineseSite
  ? [
      {
        title: "企业AI机会地图",
        audience: "接触过AI但场景不清、员工AI使用率不高的企业。",
        timeline: "3-7 天",
        deliverables: ["业务访谈", "低效流程清单", "AI场景优先级", "工具栈建议", "下一阶段 SOW"],
        pricing: "低门槛定价",
        icon: FileSearch,
      },
      {
        title: "AI岗位提效与智能体定制包",
        audience: "销售、客服、运营、内容、PMO 团队。",
        timeline: "2-4 周",
        deliverables: ["岗位 SOP", "人才评估", "协同流程梳理", "岗位智能体应用", "培训与试用陪跑"],
        pricing: "按范围报价",
        icon: Bot,
      },
      {
        title: "AI整合营销增长包",
        audience: "新品、新品牌、消费品、电商和服务型企业。",
        timeline: "2-6 周或按月",
        deliverables: ["AI搜索基线", "内容矩阵", "官网搭建", "全域内容营销", "短视频 / 公关", "业务数据看板"],
        pricing: "按数据效果报价",
        icon: LineChart,
      },
      {
        title: "企业知识库 / RAG 搭建包",
        audience: "资料复杂、培训成本高、销售口径不统一的企业。",
        timeline: "2-4 周",
        deliverables: ["产品 FAQ", "话术库", "竞品对比库", "证据卡片", "RAG 系统"],
        pricing: "按实施周期报价",
        icon: DatabaseZap,
      },
      {
        title: "AI客服 / 销售提效月包",
        audience: "有咨询转化链路和聊天 / 通话数据的销售型企业。",
        timeline: "按月",
        deliverables: ["样本复盘", "模板沉淀", "话术综评", "异议归类", "成交工具", "销售提效系统"],
        pricing: "按模块和交付频次报价",
        icon: MessageSquareText,
      },
      {
        title: "企业AI内训工作坊",
        audience: "管理层和业务团队。",
        timeline: "0.5-2 天",
        deliverables: ["AI认知", "概念解析", "场景拆解", "岗位实操", "模板训练", "后续诊断转化"],
        pricing: "按培训班次报价",
        icon: UsersRound,
      },
    ]
  : [
      {
        title: "Enterprise AI Opportunity Map",
        audience: "Companies that have tried AI but lack clear use cases or team adoption.",
        timeline: "3-7 days",
        deliverables: ["Business interviews", "Inefficient process inventory", "AI scenario priorities", "Tool stack recommendations", "Next-stage SOW"],
        pricing: "Entry-level fixed fee",
        icon: FileSearch,
      },
      {
        title: "Role Productivity & AI Agent Package",
        audience: "Sales, support, operations, content and PMO teams.",
        timeline: "2-4 weeks",
        deliverables: ["Role SOPs", "Capability assessment", "Collaboration flow mapping", "Role-based AI agent prototype", "Training and pilot support"],
        pricing: "Quoted by delivery scope",
        icon: Bot,
      },
      {
        title: "AI-Integrated Marketing Growth Package",
        audience: "New products, new brands, consumer goods, e-commerce and service businesses.",
        timeline: "2-6 weeks or monthly",
        deliverables: ["GEO / AI search baseline", "Content matrix", "Website build", "Full-channel content operations", "Short video / PR assets", "Business dashboard"],
        pricing: "Quoted by data readiness and delivery scope",
        icon: LineChart,
      },
      {
        title: "Enterprise Knowledge Base / RAG-Ready Build",
        audience: "Teams with complex materials, high training costs or inconsistent sales and support answers.",
        timeline: "2-4 weeks",
        deliverables: ["Product FAQ", "Sales script library", "Competitor comparison library", "Evidence cards", "RAG-ready knowledge base or lightweight RAG prototype"],
        pricing: "Quoted by implementation scope",
        icon: DatabaseZap,
      },
      {
        title: "AI Support / Sales Enablement Monthly Package",
        audience: "Sales-led businesses with consultative conversion paths and chat or call data.",
        timeline: "Monthly",
        deliverables: ["Sample review", "Reusable templates", "Sales script evaluation", "Objection classification", "Conversion support tools", "Sales enablement workflow"],
        pricing: "By module and delivery cadence",
        icon: MessageSquareText,
      },
      {
        title: "Enterprise AI Training Workshop",
        audience: "Management teams and business teams.",
        timeline: "0.5-2 days",
        deliverables: ["AI awareness", "Concept explanation", "Scenario breakdown", "Role practice", "Template training", "Follow-up diagnosis path"],
        pricing: "By training session",
        icon: UsersRound,
      },
    ];

export const clientDeliverables = isChineseSite
  ? [
      {
        title: "Workflow diagnosis map",
        text: "把目标、角色、低效动作、资料入口和优先级画成可执行地图。",
        icon: FileSearch,
      },
      {
        title: "AI/search question library",
        text: "整理客户真实问题、AI搜索基线、内容缺口和后续复测口径。",
        icon: SearchCheck,
      },
      {
        title: "Content operations calendar",
        text: "连接官网、FAQ、社媒和短视频内容，让发布和复盘有节奏。",
        icon: ClipboardCheck,
      },
      {
        title: "RAG-ready Q&A knowledge base",
        text: "把 FAQ、证据卡、风险边界和转人工规则结构化。",
        icon: DatabaseZap,
      },
      {
        title: "AI support assistant MVP",
        text: "先做可测试的客服/销售问答入口，再用回归问题控制质量。",
        icon: MessageSquareText,
      },
      {
        title: "PMO dashboard / review system",
        text: "把负责人、任务、验收物、风险和经营指标放进同一套复盘节奏。",
        icon: BarChart3,
      },
    ]
  : [
      {
        title: "Workflow diagnosis map",
        text: "A practical map of goals, roles, inefficient routines, data inputs and priority scenarios.",
        icon: FileSearch,
      },
      {
        title: "AI/search question library",
        text: "Customer questions, AI/search baseline findings, content gaps and repeatable review logic.",
        icon: SearchCheck,
      },
      {
        title: "Content operations calendar",
        text: "A publishing rhythm that connects website, FAQ, social posts, short-form scripts and review.",
        icon: ClipboardCheck,
      },
      {
        title: "RAG-ready Q&A knowledge base",
        text: "Structured FAQs, evidence cards, risk boundaries, handoff rules and test questions.",
        icon: DatabaseZap,
      },
      {
        title: "AI support assistant MVP",
        text: "A testable FAQ assistant prototype with guardrails, logs and regression questions.",
        icon: MessageSquareText,
      },
      {
        title: "PMO dashboard / review system",
        text: "Owner maps, task progress, acceptance artifacts, risks and operating indicators in one cadence.",
        icon: BarChart3,
      },
    ];

export const services = isChineseSite
  ? [
      {
        title: "AI工作流诊断 Sprint",
        shortTitle: "工作流诊断",
        description: "面向试过AI工具但不知道先改哪个流程的团队，快速梳理高价值场景和下一阶段交付范围。",
        fit: "AI使用分散、场景优先级不清、第一单需要低风险启动的团队。",
        details: ["业务流程访谈", "痛点与机会地图", "AI场景优先级", "工具栈建议", "下一阶段 SOW"],
        timeline: "3-7 天",
        icon: FileSearch,
      },
      {
        title: "AI整合营销 Pilot",
        shortTitle: "AI整合营销",
        description: "面向新品上市、内容冷启动或品牌增长阶段，把官网、内容、短视频、社媒和AI搜索可见性串成一套复盘工作流。",
        fit: "产品资料多、内容团队小、需要建立官网 / FAQ / 短视频 / 社媒协同的业务。",
        details: ["用户问题库", "官网 / FAQ 改进计划", "内容矩阵", "短视频规划", "社媒发布流", "复盘看板结构"],
        timeline: "2-4 周",
        icon: LineChart,
      },
      {
        title: "RAG-ready Support MVP",
        shortTitle: "客服知识 MVP",
        description: "面向客服、销售问答重复且口径不统一的团队，建立可检索、可测试、有边界的问答原型。",
        fit: "FAQ、销售话术、产品证据和风险边界需要统一管理的团队。",
        details: ["Q&A 知识结构", "来源与证据卡", "Do-not-say 规则", "FAQ Assistant 原型", "转人工规则", "回归测试问题"],
        timeline: "2-6 周",
        icon: MessageSquareText,
      },
      {
        title: "Dashboard & PMO Review System",
        shortTitle: "PMO 复盘看板",
        description: "面向项目多、协同乱、负责人和验收标准不清的团队，搭建任务结构、复盘节奏和管理看板。",
        fit: "老板需要看进度、团队需要明确责任、项目需要复盘和验收的业务。",
        details: ["WBS 与负责人地图", "项目看板结构", "验收清单", "风险列表", "周复盘模板", "经营指标"],
        timeline: "2-6 周",
        icon: ClipboardCheck,
      },
      {
        title: "Monthly Workflow Optimization Retainer",
        shortTitle: "月度优化陪跑",
        description: "面向已经跑通试点的团队，按月复盘使用情况、优化提示词和 SOP，并扩展到下一个高价值流程。",
        fit: "需要持续优化AI工作流、训练团队、复用模板和沉淀标准件的业务。",
        details: ["月度复盘", "流程优化", "团队训练", "SOP 更新", "下一场景规划"],
        timeline: "Monthly",
        icon: Wrench,
      },
    ]
  : [
      {
        title: "AI Workflow Diagnosis Sprint",
        shortTitle: "Workflow Diagnosis",
        description: "A focused entry project for teams that have tried AI tools but still do not know which workflow should be automated first.",
        fit: "Teams with scattered AI usage, unclear priorities or a need for a low-risk first engagement.",
        details: ["Business workflow interview", "Pain-point and opportunity map", "AI scenario prioritization", "Tool stack recommendation", "Next-stage SOW"],
        timeline: "3-7 days",
        icon: FileSearch,
      },
      {
        title: "AI Integrated Marketing Pilot",
        shortTitle: "AI Integrated Marketing",
        description: "A pilot for brands that need website, content, short video, social publishing and AI-search visibility to work from one operating system.",
        fit: "Content-heavy teams that need website, FAQ, short video and social publishing to work from the same knowledge base.",
        details: ["User question library", "Website / FAQ improvement plan", "Content matrix", "Short-video planning", "Social publishing workflow", "Review dashboard structure"],
        timeline: "2-4 weeks",
        icon: LineChart,
      },
      {
        title: "RAG-ready Support MVP",
        shortTitle: "Support MVP",
        description: "A support and sales answer prototype for teams with repeated customer questions, inconsistent answers or high-risk product claims.",
        fit: "Teams that need product facts, sales answers, evidence and escalation rules to be structured before AI use.",
        details: ["Q&A knowledge structure", "Source and evidence cards", "Do-not-say rules", "FAQ assistant prototype", "Human handoff rules", "Regression test questions"],
        timeline: "2-6 weeks",
        icon: MessageSquareText,
      },
      {
        title: "Dashboard & PMO Review System",
        shortTitle: "PMO Review System",
        description: "A management visibility system for teams that need clearer project ownership, task progress, review cadence and acceptance standards.",
        fit: "Project-heavy teams where owners, deadlines, risks and acceptance artifacts need to be visible in one operating rhythm.",
        details: ["WBS and owner map", "Project dashboard structure", "Acceptance checklist", "Risk list", "Weekly review template", "Operating indicators"],
        timeline: "2-6 weeks",
        icon: ClipboardCheck,
      },
      {
        title: "Monthly Workflow Optimization Retainer",
        shortTitle: "Monthly Optimization",
        description: "A monthly operating layer for teams that have a working pilot and want to improve adoption, quality and the next reusable workflow.",
        fit: "Teams that need continuous workflow review, prompt/SOP updates, enablement and expansion into the next scenario.",
        details: ["Monthly workflow review", "Prompt and SOP optimization", "Team enablement", "Quality checks", "Next-scenario planning"],
        timeline: "Monthly",
        icon: Wrench,
      },
    ];

export const workExamples = isChineseSite
  ? [
      {
        title: "消费品新品冷启动AI试点",
        label: "匿名试点",
        description: "围绕高信任消费硬件品类，连接AI搜索基线、内容缺口、市场教育资产和复测指标。",
        items: ["AI搜索基线", "内容矩阵", "短视频规划", "复测指标"],
        icon: Target,
      },
      {
        title: "RAG-ready AI客服 MVP",
        label: "匿名内部系统",
        description: "围绕结构化知识、证据卡片、回答边界、日志和回归测试搭建客服/销售问答入口。",
        items: ["知识结构化", "检索优先回答", "风险边界", "转人工规则"],
        icon: ShieldCheck,
      },
      {
        title: "内容运营工作流平台",
        label: "工作流原型",
        description: "为内容日历、平台发布、审核节点和跨渠道素材复用建立可重复的运营流程。",
        items: ["内容日历", "发布队列", "素材复用", "审核流"],
        icon: Sparkles,
      },
      {
        title: "PMO 与经营复盘系统",
        label: "运营框架",
        description: "用轻量 PMO 管理范围、负责人、截止时间、验收物、风险和周期性经营复盘。",
        items: ["WBS 总控", "风险复盘", "验收清单", "看板数据"],
        icon: Wrench,
      },
    ]
  : [
      {
        title: "AI launch pilot for a UK water purifier brand",
        label: "Anonymized pilot",
        description: "Scope: GEO baseline, short-video assets, content matrix, AI support portal and RAG readiness. Delivery focus: search visibility, content education, reusable knowledge assets and lightweight customer support validation.",
        items: ["GEO baseline", "Content matrix", "AI support portal", "RAG readiness"],
        icon: Target,
      },
      {
        title: "RAG-ready AI support MVP",
        label: "Internal support system",
        description: "A support and sales answer flow built around structured knowledge, evidence cards, do-not-say rules, logs and regression tests.",
        items: ["Q&A structure", "Evidence cards", "Answer guardrails", "Handoff rules"],
        icon: ShieldCheck,
      },
      {
        title: "Content operations system",
        label: "Workflow prototype",
        description: "A repeatable operating system for content calendars, platform publishing, review checkpoints and cross-channel asset reuse.",
        items: ["Publishing queue", "Approval checkpoints", "Reusable assets", "Review cadence"],
        icon: Sparkles,
      },
      {
        title: "PMO and business review system",
        label: "Operations framework",
        description: "A lightweight management layer for project scope, owners, due dates, acceptance artifacts, risks and recurring business reviews.",
        items: ["WBS control", "Owner map", "Risk review", "Dashboard-ready data"],
        icon: Wrench,
      },
    ];

export const founderFacts = isChineseSite
  ? [
      "以范围、角色、资料与验收标准组织项目。",
      "公开资料以已确认的事实和授权范围为准。",
      "把网站、系统、知识与流程放进同一业务视角。",
      "重视可维护的内容、权限和交接边界。",
      "具体经历与项目范围以可核验材料为准。",
      "善于解决企业复杂业务问题并形成一体化AI解决方案。",
      "计算机学士、营销学硕士，曾获中国银行奖学金。",
    ]
  : [
      "Former Alibaba industry operations expert with category growth, platform operations and cross-functional collaboration experience.",
      "Former ecommerce project director and PMO lead, responsible for complex delivery, acceptance checks and review cadence.",
      "Managed category operations at ¥600M+ scale and supported large cross-functional business initiatives across platform, ecommerce and healthcare-related sectors.",
      "Built multiple startup initiatives from zero to one across product validation, operations and growth.",
      "Cross-sector exposure across consumer healthcare, medical aesthetics, medical devices, beauty, e-commerce and platform businesses.",
      "Skilled at solving complex business problems and turning them into integrated AI solutions.",
      "Holds a bachelor's degree in computer science and a master's degree in marketing, and was awarded the Bank of China Scholarship.",
    ];

export const servicesPageCopy = {
  metadataTitle: isChineseSite ? "AI企业提效服务" : "AI Productivity Services",
  metadataDescription: isChineseSite
    ? "原点向量提供企业AI提效、AI业务诊断、AI工作流自动化、岗位提效、AI整合营销、企业知识库、AI客服销售提效和企业AI内训服务。"
    : "AI workflow automation and AI productivity services for business diagnosis, role productivity, RAG-ready knowledge bases, AI marketing, sales support, customer support enablement and operations workflows.",
  heroTitle: isChineseSite ? "面向真实业务场景的AI企业提效服务" : "AI services built for real business execution",
  heroDescription: isChineseSite
    ? "原点向量是面向企业的AI提效服务商，从业务诊断切入，把AI方法、工具和智能体开发落到企业自身业务系统，帮助团队提升业绩、节约成本并优化执行效率。"
    : "As an AI productivity partner, Origin Vector helps companies apply AI workflow automation to sales support, customer support, operations workflows and management review. We identify high-value business scenarios, structure company knowledge into RAG-ready knowledge bases, and build role tools, agents and dashboards that make lead conversion, customer response, content production and review loops faster, steadier and measurable.",
  matrixTitle: isChineseSite ? "服务矩阵" : "AI Service Packages",
  matrixLead: isChineseSite
    ? "原点向量是一家初创OPC公司，以下服务矩阵仅为服务范围内的一部分。"
    : "Origin Vector is an early-stage, founder-led company. The service packages below represent our core delivery scope at this stage.",
  painTitle: isChineseSite ? "企业AI落地的真实痛点" : "The real blockers behind AI adoption",
  painLead: isChineseSite
    ? "AI能力本身越来越强，但企业落地通常卡在业务结构和执行路径。"
    : "AI capability is moving fast, but adoption usually stalls in the operating structure around it.",
  painPoints: isChineseSite
    ? ["场景不清", "数据和资料分散", "流程没有标准化", "岗位能力不均", "结果不可复盘"]
    : ["Unclear scenarios", "Scattered knowledge", "Non-standard workflows", "Uneven AI capability", "No review loop"],
  fitLabel: isChineseSite ? "场景" : "Scenario",
  deliverablesLabel: isChineseSite ? "交付物" : "Deliverables",
  timelineLabel: isChineseSite ? "周期" : "Typical timeline",
  pricingLabel: isChineseSite ? "报价方式" : "Pricing model",
  pathTitle: isChineseSite ? "交付流程" : "Delivery flow",
  pathLead: isChineseSite
    ? "先确认业务场景和资料基础，再进入工具或智能体开发，最后用复盘机制判断是否值得扩大。"
    : "Start with the business scenario and knowledge base, then build the tool or agent, launch a scoped pilot and review whether it should scale.",
  phases: isChineseSite
    ? [
        ["Diagnose", "梳理流程、资料、岗位痛点和高价值AI场景。"],
        ["Design", "确定场景优先级、工具边界、数据来源和验收标准。"],
        ["Structure", "整理 FAQ、SOP、话术、证据卡片和内容资产。"],
        ["Build", "开发岗位工具、智能体、工作流或轻量应用。"],
        ["Launch", "小范围上线、团队试用、记录问题和使用反馈。"],
        ["Review", "复盘效率、质量、可见性、转化线索和下一阶段方案。"],
      ]
    : [
        ["Diagnose", "Map workflows, materials, role pain points and high-value AI scenarios."],
        ["Design", "Define scenario priority, tool boundaries, data sources and acceptance checks."],
        ["Structure", "Organize FAQs, SOPs, sales scripts, evidence cards and content assets."],
        ["Build", "Develop role tools, agents, workflows or lightweight applications."],
        ["Launch", "Run a scoped pilot, train users, collect issues and usage feedback."],
        ["Review", "Review efficiency, quality, visibility, conversion signals and the next-stage plan."],
      ],
  opcTitle: isChineseSite ? "OPC 阶段策略" : "Owner-operated delivery principle",
  opcLead: isChineseSite
    ? "项目选择强调质量与可复用价值，不追求项目数量，而是优先选择能形成方法、可见成果和长期经营资产的业务场景。"
    : "Origin Vector favors focused, high-quality engagements over volume. We prioritize projects that can produce reusable methods, visible outcomes and long-term operating assets.",
  cta: isChineseSite ? "预约咨询" : "Book a Consultation",
};

export const workPageCopy = {
  metadataTitle: isChineseSite ? "交付案例" : "AI Workflow Delivery Methods",
  metadataDescription: isChineseSite
    ? "原点向量以AI企业提效的可复用交付模式展示社媒发布工作流、内容运营平台、数据看板、SOP 自动化和 RAG-ready 客服系统。"
    : "Origin Vector delivery patterns around AI launch pilots, reusable workflows and operating systems.",
  heroTitle: isChineseSite ? "交付案例以方法和成果呈现" : "AI Workflow Delivery Methods",
  heroDescription: isChineseSite
    ? "公开内容遵循授权和可验证原则，重点呈现可复用的运营结构、工作流设计、资产形态和复盘方法。"
    : "Public examples follow authorization and verification standards. They focus on workflow design, reusable assets, operating artifacts and review methods.",
  pilotTitle: isChineseSite ? "一个合格试点应该证明什么" : "What a typical pilot should prove",
  pilotLead: isChineseSite
    ? "AI试点不只是做一个演示，而是要产出可用资产，并能复盘它是否真的改善了工作。"
    : "A good AI workflow pilot should create a usable asset and a way to review whether the asset actually improves work.",
  deliverablesTitle: isChineseSite ? "案例重点看交付物，而不是 Logo。" : "The useful proof is the operating artifact.",
  deliverablesLead: isChineseSite
    ? "公开案例优先展示问题、流程、知识资产、原型和复盘方式。客户名称和内部数据只在获得授权后公开。"
    : "Public work focuses on the problem, workflow design, reusable assets, prototype behavior and review method. Names and internal data stay private unless approved.",
  pilotQuestions: isChineseSite
    ? [
        "团队是否能复用同一套流程，而不是每次重新写一遍？",
        "知识库、SOP 或内容系统是否能安全更新，并保持输出质量？",
        "结果是否能通过采纳、质量、效率或业务信号复盘？",
        "试点是否能迁移到下一个岗位、团队或业务单元？",
      ]
    : [
        "Can the team reuse the same workflow without the founder or consultant rewriting every step?",
        "Can the knowledge base, SOP or content system be updated safely without losing answer quality?",
        "Can the output be reviewed through adoption, quality, response efficiency or business signals?",
        "Can the pilot become a template for the next role, team or business unit?",
      ],
  conservativeTitle: isChineseSite ? "案例披露坚持可验证原则。" : "Public claims stay evidence-based.",
  conservativeLead: isChineseSite
    ? "原点向量不发布虚假客户 Logo、虚构转化数据或未经验证的结果。客户名称、内部数据和效果指标仅在获得授权并完成复核后公开。"
    : "Origin Vector does not publish client logos, conversion numbers or performance claims without authorization and verification. Client names, internal data and outcome metrics are disclosed only after approval and review.",
  cta: isChineseSite ? "沟通一个试点" : "Contact for a scoped pilot",
};

export const aboutPageCopy = {
  metadataTitle: isChineseSite ? "关于原点向量 - AI提效服务商" : "Company",
  metadataDescription: isChineseSite
    ? "关于原点向量的方法、服务方向与交付方式。"
    : "Origin Vector's approach, service directions and delivery method.",
  heroKicker: isChineseSite ? "关于我们" : "About Us",
  heroTitle: isChineseSite ? "从业务问题与交付边界开始" : "Start with business problems and delivery boundaries",
  heroDescription: isChineseSite
    ? "我们围绕业务问题、资料结构和交付边界，组织 AI 与数字化工作。"
    : "We organize AI and digital work around business problems, material structure and delivery boundaries.",
  heroImageAlt: isChineseSite ? "原点向量公司运营视觉" : "Origin Vector company operating visual",
  heroProof: isChineseSite
    ? [
        { title: "服务真实场景", text: "关注真正推动业务的事情，而不是表面效果。", icon: Target },
        { title: "技术主导交付", text: "诊断+Agent开发。\n小周期迭代。", icon: UsersRound },
        { title: "验收边界", text: "范围、事实与验收方式需先确认。", icon: ShieldCheck },
      ]
    : [
        { title: "Built for Real Operations", text: "We focus on what actually moves the business, not what only looks impressive.", icon: Target },
        { title: "AI Implementation-Led Delivery", text: "From diagnosis to execution, delivery is led by AI implementation and operating expertise.", icon: UsersRound },
        { title: "Acceptance boundaries", text: "Scope, facts and acceptance method require confirmation first.", icon: ShieldCheck },
      ],
  whatWeDo: isChineseSite
    ? [
        { title: "咨询诊断", icon: Workflow },
        { title: "营销运营", icon: Megaphone },
        { title: "组织提效", icon: LineChart },
        { title: "品牌管理", icon: DatabaseZap },
      ]
    : [
        { title: "AI Workflow Automation", icon: Workflow },
        { title: "AI-Integrated Marketing Operations", icon: Megaphone },
        { title: "Role Productivity", icon: LineChart },
        { title: "RAG-Ready Brand Knowledge", icon: DatabaseZap },
      ],
  whoWeAre: isChineseSite
    ? [
        { title: "AI提效服务商", icon: Bot },
        { title: "AI智能体服务商", icon: Workflow },
        { title: "AI工作流优化商", icon: DatabaseZap },
        { title: "战略咨询顾问", icon: LineChart },
      ]
    : [
        { title: "AI Productivity Partner", icon: Bot },
        { title: "AI Agent & Workflow Partner", icon: Workflow },
        { title: "AI Workflow Implementation", icon: DatabaseZap },
        { title: "AI Strategy & Operations Consultant", icon: LineChart },
      ],
  companyTitle: isChineseSite ? "公司定位" : "Company",
  companyLead: isChineseSite
    ? "以清晰的业务问题、范围和交付物组织服务。"
    : "Services organized around clear business problems, scope and deliverables.",
  companyBody: isChineseSite
    ? "公司帮助企业把产品资料、客户问题、销售客服知识、运营 SOP、内容资产和经营复盘流程，组织成可复用、可衡量、可迭代的AI提效系统。"
    : "The company helps businesses organize product materials, customer questions, sales and support knowledge, SOPs, content assets and review data into workflows that can be reused, measured and improved.",
  companyTiles: isChineseSite ? ["咨询诊断", "营销运营", "组织提效", "品牌管理"] : ["AI Workflow Automation", "AI-Integrated Marketing Operations", "Role Productivity", "RAG-Ready Brand Knowledge"],
  founderLabel: isChineseSite ? "创始人" : "Founder",
  founderName: isChineseSite ? "赵若淇 Roxy Chao" : "Roxy Chao",
  founderSub: isChineseSite ? "原点向量创始人及法人" : "Founder and legal representative",
  founderBody: isChineseSite
    ? "原点向量以业务问题、流程、资料与验收边界来组织 AI 与数字化项目。具体个人履历和可公开项目经验以核验材料与授权范围为准。"
    : "Origin Vector organizes AI and digital work around business problems, workflows, materials and acceptance boundaries. Individual credentials and public project experience follow verified materials and authorization.",
  whoTitle: isChineseSite ? "我们是谁" : "Who we are",
  whoLead: isChineseSite
    ? "本页介绍我们的方法、服务方向与公开内容边界。"
    : "This page introduces our approach, service directions and public-content boundary.",
  doTitle: isChineseSite ? "我们做什么" : "What we do",
  doLead: isChineseSite
    ? "我们把产品资料、客户问题、销售客服知识、SOP、内容资产和复盘数据，转化为可复用的业务系统，并连接AI工作流、看板和知识资产，让团队可以持续衡量和优化每个流程。"
    : "We turn product materials, customer questions, sales and support knowledge, SOPs, content assets and review data into reusable operating systems. Our work connects AI workflows, dashboards and knowledge assets so teams can measure, review and improve each process.",
  founderAlt: isChineseSite ? "Roxy Chao 创始人资料卡" : "Roxy Chao founder profile card",
  expertiseTitle: isChineseSite ? "我们的经验来自哪里" : "Where our expertise comes from",
  expertiseGridColumns: "lg:grid-cols-8",
  expertise: isChineseSite
    ? [
        { title: "平台运营", icon: UsersRound },
        { title: "电商与数字业务", icon: BriefcaseBusiness },
        { title: "医疗健康与器械", icon: ShieldCheck },
        { title: "美业与消费品牌", icon: Target },
        { title: "内容与知识运营", icon: DatabaseZap },
        { title: "商业数据分析", icon: LineChart },
        { title: "PMO 与交付管理", icon: Workflow },
        { title: "AI智能体与工作流", icon: Bot },
      ]
    : [
        { title: "Platform Operations", icon: UsersRound },
        { title: "E-commerce & Digital Business", icon: BriefcaseBusiness },
        { title: "Healthcare & Medical Devices", icon: ShieldCheck },
        { title: "Beauty & Consumer Brands", icon: Target },
        { title: "Content & Knowledge Operations", icon: DatabaseZap },
        { title: "Business Data Analysis", icon: LineChart },
        { title: "PMO & Delivery Management", icon: Workflow },
        { title: "AI Agents & Workflow Design", icon: Bot },
      ],
  workTitle: isChineseSite ? "我们如何工作" : "How we work",
  ctaTitle: isChineseSite ? "现在开始，免费诊断。" : "Start with a free diagnosis.",
  ctaButton: isChineseSite ? "预约咨询" : "Book a Consultation",
  principles: isChineseSite
    ? [
        { title: "结果优先", text: "先定结果，再选AI工具。" },
        { title: "高度适配", text: "按流程、数据和团队定制。" },
        { title: "可迭代", text: "用反馈和指标持续优化。" },
      ]
    : [
        { title: "Outcome-first", text: "Define results before choosing AI tools." },
        { title: "Highly adapted", text: "Build around workflow, data and team context." },
        { title: "Iterative", text: "Use feedback and metrics to keep improving." },
      ],
};

export const contactPageCopy = {
  metadataTitle: isChineseSite ? "联系状态（待确认）" : "Contact Status (Pending Confirmation)",
  metadataDescription: isChineseSite
    ? "联系渠道、负责人和隐私授权待业务 Owner 确认。"
    : "The contact channel, responsible owner and privacy authorization are pending Business Owner confirmation.",
  kicker: isChineseSite ? "联系状态" : "CONTACT STATUS",
  heroTitle: isChineseSite ? "联系渠道待业务 Owner 确认" : "Contact channel pending Business Owner confirmation",
  heroDescription: isChineseSite
    ? "本预览不提供表单提交、预约成功提示或未确认的联系渠道。"
    : "This preview provides no form submission, booking confirmation or unconfirmed contact channel.",
  proof: isChineseSite
    ? [
        { title: "渠道待确认", text: "邮箱、电话、企业微信和负责人待确认。", icon: CalendarDays },
        { title: "范围待确认", text: "咨询、诊断与后续项目范围需书面确认。", icon: Target },
        { title: "隐私待确认", text: "隐私主体与数据处理流程待法律责任人确认。", icon: LockKeyhole },
      ]
    : [
        { title: "Channel pending", text: "Email, phone, WeChat and owner are pending confirmation.", icon: CalendarDays },
        { title: "Scope pending", text: "Consultation, assessment and subsequent scope require written confirmation.", icon: Target },
        { title: "Privacy pending", text: "The privacy entity and data process are pending legal-owner confirmation.", icon: LockKeyhole },
      ],
  contactPanelTitle: isChineseSite ? "联系渠道状态" : "Contact-channel status",
  contactPanelLead: isChineseSite
    ? "待确认后才会显示真实可用渠道。"
    : "A real channel will be shown only after confirmation.",
  emailChannel: {
    title: isChineseSite ? "邮件咨询" : "Email",
    text: isChineseSite ? "复制官方客服邮箱后，在常用邮箱中发送咨询背景。" : "Copy our email and send context from your preferred mail app.",
    cta: isChineseSite ? "复制邮箱" : "Copy email",
    copiedText: isChineseSite ? "已复制邮箱" : "Email copied",
    errorText: isChineseSite ? "复制失败，请长按重试。" : "Copy failed. Please try again.",
  },
  partnerPrefix: isChineseSite ? "已经是合作伙伴？" : "Already an active client?",
  partnerLink: isChineseSite ? "进入合作商后台" : "Go to Client Portal",
  topicsTitle: isChineseSite ? "可以先聊这些方向" : "Topics we can explore",
  topicsLead: isChineseSite ? "告诉我们你的目标和挑战。常见可沟通方向包括：" : "Tell us about your goals and challenges. Common areas we can discuss include:",
  topics: [
    { title: isChineseSite ? "AI策略与诊断" : "AI Strategy & Diagnosis", text: isChineseSite ? "评估运营现状，梳理机会并形成路线图。" : "Assess current operations, map opportunities and define a practical roadmap.", icon: Target },
    { title: isChineseSite ? "AI智能体与工作流" : "AI Agents & Workflows", text: isChineseSite ? "设计并开发适合业务的智能体和工作流。" : "Design and build lightweight agents and workflows that fit your business.", icon: Workflow },
    { title: isChineseSite ? "知识与数据" : "Knowledge & Data", text: isChineseSite ? "整理资料、沉淀知识资产并支持安全复用。" : "Organize materials, build reusable knowledge assets and enable secure reuse.", icon: DatabaseZap },
    { title: isChineseSite ? "营销与增长" : "Marketing & Growth", text: isChineseSite ? "AI整合营销、内容系统和增长运营。" : "AI-integrated marketing, content systems and growth operations.", icon: Megaphone },
    { title: isChineseSite ? "客服与销售" : "Support & Sales", text: isChineseSite ? "把AI应用于客服、销售承接和体验优化。" : "Use AI to improve support answers, sales handoff and customer experience.", icon: Headphones },
    ...(isChineseSite ? [{ title: "员工提效", text: "提升岗位效率、协作质量和执行稳定性。", icon: UsersRound }] : []),
  ],
  topicGridColumns: isChineseSite ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-5",
  wechat: {
    title: isChineseSite ? "微信咨询" : "WeChat",
    text: isChineseSite ? "扫码添加。" : "Scan to add.",
    displayName: isChineseSite ? "官方客服" : "Official service",
    handle: "kiwibaby666",
    qrImage: "/contact/origin-vector-wechat-official-service.jpg",
    qrAlt: isChineseSite ? "原点向量微信咨询二维码" : "Origin Vector WeChat QR code",
  },
  detailsTitle: isChineseSite ? "联系方式" : "Contact",
  emailLabel: isChineseSite ? "邮箱" : "Email",
  locationLabel: isChineseSite ? "所在地" : "Location",
  focusLabel: isChineseSite ? "业务方向" : "Business focus",
  focusText: isChineseSite ? "AI工作流自动化、内容运营、经营咨询和企业AI落地。" : "Founder-led AI productivity implementation, content operations, RAG-ready support MVPs and PMO review systems.",
  emailCta: isChineseSite ? "发送咨询需求" : "Send Consultation Request",
  contextTitle: isChineseSite ? "第一次沟通建议说明" : "Useful context for the first conversation",
  contextItems: isChineseSite
    ? [
        "你希望优先改善哪个团队或业务流程。",
        "目前已有的资料：产品文档、FAQ、聊天记录、看板、SOP 或内容资产。",
        "是否涉及第三方平台，例如 Meta、LinkedIn、社媒发布工具或内部系统。",
        "什么结果对你有价值：效率、内容可见性、回答质量、看板清晰度、团队采纳或转化线索。",
      ]
    : [
        "Which workflow or team you want to improve first.",
        "What materials already exist: product documents, FAQs, chat logs, dashboards, SOPs or content assets.",
        "Whether third-party platforms are involved, such as Meta, LinkedIn, social publishing tools or internal systems.",
        "What would count as a useful result: efficiency, content visibility, answer quality, dashboard clarity, adoption or conversion signals.",
      ],
  nextTitle: isChineseSite ? "第一次沟通之后" : "How the first engagement starts",
  nextSteps: isChineseSite
    ? [
        ["01", "确认问题", "先确认目标团队、当前资料、关键阻碍和有价值的业务结果。"],
        ["02", "选择入口", "根据成熟度选择 3-7 天诊断、2-6 周试点或 MVP。"],
        ["03", "交付复盘", "每个项目都以可用交付物、验收清单和下一步建议收尾。"],
      ]
    : [
        ["01", "Frame the problem", "Clarify the team, workflow, existing materials, blocker and useful business outcome."],
        ["02", "Choose the entry point", "Select a 3-7 day diagnosis, a 2-6 week pilot or a focused MVP based on readiness."],
        ["03", "Deliver and review", "Close each engagement with usable artifacts, acceptance checks and the next recommended step."],
      ],
};

export const ctaCopy = {
  title: isChineseSite ? "从业务问题开始了解交付方式" : "Start with the business problem and delivery approach.",
  lead: isChineseSite
    ? "通过范围、原型、测试记录和验收清单理解项目如何推进。"
    : "See how scope, prototypes, test records and acceptance checklists shape a project.",
  button: isChineseSite ? "查看交付方式" : "Explore delivery",
};

export const apiPlatformPageCopy = {
  metadataTitle: isChineseSite ? "多模型 API 接入平台" : "Multi-Model API Platform",
  metadataDescription: isChineseSite
    ? "通过 OVOPS API 统一接入多种 AI 模型，管理 API Key、调用用量和费用，适用于原型验证、企业工具、智能体与自动化工作流。"
    : "Connect to multiple AI models through OVOPS API, manage project keys and usage, and support prototypes, internal tools, agents and production workflows through an OpenAI-compatible gateway.",
  pageName: isChineseSite ? "API接入平台" : "API Platform",
  heroKicker: "OVOPS API · BETA",
  heroTitle: isChineseSite ? "集成多种大模型，统一接口，稳定高效。" : "OpenAI-compatible access for business AI systems",
  heroLead: isChineseSite
    ? "面向开发者、AI 应用团队和企业内部项目，通过统一入口管理 API Key、模型调用、用量与费用，减少重复对接。"
    : "Use one managed endpoint for model access, project keys, usage visibility and controlled rollout across prototypes, internal tools and agent workflows.",
  primaryCta: isChineseSite ? "进入 API 平台" : "Open API Platform",
  secondaryCta: isChineseSite ? "查看接入方式" : "See Quick Start",
  heroNote: isChineseSite ? "可用模型、接口能力与价格以平台实时页面为准。" : "Available models, interfaces and pricing are subject to the live platform.",
  codeWindowTitle: isChineseSite ? "Python SDK：OpenAI-compatible /v1/chat/completions" : "Python SDK: OpenAI-compatible /v1/chat/completions",
  codeWindowLanguage: "Python SDK",
  valueKicker: "WHY OVOPS API",
  valueTitle: isChineseSite ? "少做重复接入，更快完成验证" : "A cleaner path for sustained AI usage",
  valueLead: isChineseSite
    ? "面向长期合作伙伴提供稳定的模型接口服务，统一接入、用量可见，并在持续调用场景下保持更有竞争力的价格。"
    : "For teams standardizing AI workloads, OVOPS API provides a stable gateway, project-level control and usage transparency without tying every workflow to a separate provider account.",
  benefits: isChineseSite
    ? [
        ["统一接入", "用一个入口接入当前可用模型。"],
        ["密钥管理", "按项目创建 Key，降低混用风险。"],
        ["用量可见", "查看调用记录、Token 与余额。"],
        ["模型灵活选择", "按任务、成本与效果选择模型。"],
      ]
    : [
        ["Unified access", "Use one gateway for available models."],
        ["Project-level keys", "Issue separate keys for each project or client."],
        ["Usage visibility", "Track requests, tokens and balance."],
        ["Model flexibility", "Pick models by task, cost and quality."],
      ],
  quickStartKicker: "QUICK START",
  quickStartTitle: isChineseSite ? "三步完成首次调用" : "Make your first call in three steps",
  quickStartLead: isChineseSite ? "先跑通最小闭环，再逐步扩展到正式业务。" : "Validate the connection, usage logs and cost path before scaling traffic.",
  steps: isChineseSite
    ? [
      ["注册并进入控制台", "登录 models.ovops.com，查看模型、接口和价格。"],
      ["创建 API Key", "按项目创建独立 Key，避免多系统混用。"],
      ["接入并测试", "用控制台模型 ID，完成兼容接口测试。"],
    ]
    : [
      ["Review the platform", "Review models, interfaces and pricing in the console."],
      ["Create a project key", "Create one key per project or workflow."],
      ["Run a test request", "Test chat completions with a console model ID."],
    ],
  codeTitle: isChineseSite ? "Python SDK：/v1/chat/completions" : "Python SDK: /v1/chat/completions",
  codeNote: isChineseSite
    ? "Endpoint：POST https://models.ovops.com/v1/chat/completions；Key 使用 ORIGIN_VECTOR_API_KEY；model 填控制台模型 ID。"
    : "Endpoint: POST https://models.ovops.com/v1/chat/completions. Use ORIGIN_VECTOR_API_KEY and a console model ID.",
  faqKicker: "FAQ",
  faqTitle: isChineseSite ? "常见问题" : "Frequently Asked Questions",
  faqs: isChineseSite
    ? [
        ["支持哪些模型？", "平台可用模型会动态调整，请在模型列表中查看当前状态、接口类型和价格。"],
        ["如何计费？", "按平台展示的模型价格和实际调用量计费；充值、余额和消费明细以控制台为准。"],
        ["能否接入现有 SDK？", "可以使用 OpenAI-compatible 客户端和 OVOPS Base URL。上线前请按平台文档验证模型参数差异。"],
        ["是否适合生产环境？", "建议先做小流量验证，并为超时、失败重试、限额和上游变化设计降级方案。企业生产场景可联系原点向量评估。"],
        ["企业客户如何合作？", "可通过官网联系我们，沟通对公付款、额度、项目接入和业务工作流方案。"],
        ["充值前需要注意什么？", "先用小额完成注册、创建密钥、首次调用、日志查看和余额扣减的完整测试，再决定是否扩大使用。"],
      ]
    : [
        ["Which models are available?", "The model catalog may change. Check the live model list for current status, interface type and pricing."],
        ["How is usage billed?", "Billing follows the model price shown by the platform and actual usage. Balance and spend details are displayed in the console."],
        ["Can I use an existing SDK?", "Yes. Use OpenAI-compatible clients with the OVOPS base URL, then validate model-specific parameters before launch."],
        ["Is it ready for production?", "Start with controlled traffic, monitor logs and design fallbacks for timeouts, rate limits and upstream changes."],
        ["How can enterprise customers work with you?", "Contact us to discuss company billing, quota planning, project integration and workflow rollout."],
        ["What should I check before topping up?", "Use a small amount to verify registration, key creation, the first request, logs and balance deduction before increasing usage."],
      ],
};

export const clientPortalCopy = {
  metadataTitle: isChineseSite ? "客户工作区（待确认）" : "Client Workspace (Pending Confirmation)",
  metadataDescription: isChineseSite
    ? "客户工作区的认证、权限和数据责任待确认。"
    : "Client-workspace authentication, permissions and data responsibility are pending confirmation.",
  title: isChineseSite ? "客户工作区（待确认）" : "Client Workspace (Pending Confirmation)",
  lead: isChineseSite
    ? "合作品牌可通过专属账号进入已分配的项目工作区、数据看板或交付系统。"
    : "Active clients can use this page to access assigned project workspaces, dashboards or delivery systems.",
  visualTitle: isChineseSite ? "专属合作商工作区" : "Dedicated client workspace",
  visualText: isChineseSite
    ? "品牌项目、交付素材、数据看板和系统入口集中管理。"
    : "Project systems, delivery assets, dashboards and secure workspace entrances in one place.",
  accountLabel: isChineseSite ? "品牌 / 工作区" : "Brand / Workspace",
  accountPlaceholder: isChineseSite ? "用户名/品牌名" : "Username / brand name",
  passwordLabel: isChineseSite ? "密码" : "Password",
  passwordPlaceholder: isChineseSite ? "输入密码" : "Enter password",
  invalidWorkspace: isChineseSite
    ? "请输入有效的品牌或工作区名称，仅支持小写字母、数字和连字符。"
    : "Enter a valid workspace name using lowercase letters, numbers and hyphens.",
  missingPassword: isChineseSite ? "请输入密码。" : "Enter your password.",
  button: isChineseSite ? "打开工作区" : "Open Workspace",
  contact: isChineseSite ? "联系我们" : "Contact us",
};

export const legalLinks = isChineseSite
  ? [
      { href: "/privacy", label: "隐私政策" },
      { href: "/data-deletion", label: "数据删除" },
      { href: "/terms", label: "服务条款" },
    ]
  : [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/data-deletion", label: "Data Deletion" },
      { href: "/terms", label: "Terms" },
    ];
