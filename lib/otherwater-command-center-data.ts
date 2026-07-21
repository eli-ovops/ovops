import {
  Bot,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  Globe2,
  LineChart,
  LockKeyhole,
  Megaphone,
  SearchCheck,
  Video,
} from "lucide-react";

export type ModuleStatus = "healthy" | "attention" | "blocked" | "not_started" | "completed" | "not_applicable";
export type DataStatus =
  | "confirmed"
  | "pending_import"
  | "not_started"
  | "blocked"
  | "not_applicable"
  | "channel_error"
  | "manual_review";
export type ActionStatus = "open" | "waiting_client" | "waiting_internal" | "in_progress" | "done" | "cancelled";
export type AcceptanceStatus = "draft" | "submitted" | "waiting_client" | "approved" | "revision_requested" | "superseded";
export type PublishApiStatus = "queued" | "published" | "failed" | "unknown";
export type PublicVisibilityStatus = "verified_visible" | "not_visible" | "pending_manual_review" | "not_checked";

export type Metric = {
  id: string;
  moduleId: string;
  name: string;
  shortLabel: string;
  value: number | string | null;
  unit?: string;
  numerator?: number | null;
  denominator?: number | null;
  target?: number | null;
  previousLabel?: string;
  dataStatus: DataStatus;
  sourceId?: string;
  periodStart?: string;
  periodEnd?: string;
  lastCheckedAt?: string;
  notes?: string;
  evidenceIds: string[];
};

export type ModuleSummary = {
  id: string;
  key:
    | "geo"
    | "website"
    | "ai_support"
    | "social"
    | "video_ugc"
    | "offline_koc"
    | "data_import"
    | "deliverables"
    | "access_region";
  name: string;
  icon: typeof SearchCheck;
  status: ModuleStatus;
  headline: string;
  owner: string;
  primaryMetricId?: string;
  supportingMetricIds: string[];
  dataGap?: string;
  nextActionId?: string;
  evidenceIds: string[];
  lastCheckedAt?: string;
  stats: Array<{ label: string; value: string; status?: DataStatus }>;
  details: string[];
};

export type DataSource = {
  id: string;
  name: string;
  sourceType: "api" | "csv" | "screenshot" | "manual" | "url" | "qa";
  scope:
    | "official_site"
    | "external_campaign_site"
    | "owned_subdomain"
    | "social_platform"
    | "ai_support"
    | "offline"
    | "third_party";
  status: DataStatus;
  periodStart?: string;
  periodEnd?: string;
  lastImportedAt?: string;
  lastCheckedAt?: string;
  owner: string;
  missingFields: string[];
  affectedMetricIds: string[];
  apiStatus?: PublishApiStatus;
  publicVisibility?: PublicVisibilityStatus;
  note: string;
};

export type ActionItem = {
  id: string;
  moduleId?: string;
  title: string;
  description: string;
  type: "approval" | "upload" | "access" | "review" | "fix" | "retest";
  priority: "P0" | "P1" | "P2";
  status: ActionStatus;
  assignee: string;
  requestedFromRole: "client" | "delivery" | "operator";
  dueAt?: string;
  blockerReason?: string;
  completionCriteria: string;
  metricIds: string[];
  evidenceIds: string[];
  commentCount: number;
};

export type EvidenceItem = {
  id: string;
  title: string;
  type: "report" | "csv" | "screenshot" | "url" | "qa" | "log" | "video";
  moduleId?: string;
  metricIds: string[];
  actionIds: string[];
  source: string;
  createdAt: string;
  lastVerifiedAt?: string;
  visibility: "client" | "internal_only";
  verificationStatus: "verified" | "unverified" | "superseded";
  href: string;
};

export type Deliverable = {
  id: string;
  moduleId: string;
  title: string;
  version: string;
  submittedAt?: string;
  acceptanceCriteria: string;
  acceptanceStatus: AcceptanceStatus;
  feedbackDueAt?: string;
  revisionCount: number;
  evidenceIds: string[];
  scopeBoundary: string;
};

export const project = {
  id: "otherwater-phase-2",
  tenantName: "OtherWater",
  name: "OtherWater 第二期增长项目",
  campaign: "How Clean Is My Water? / London Water Check Challenge",
  phase: "第二期｜冷启动增长执行",
  headline: "完整 200 题阶段复测显示公开搜索与 GPT/API 有阶段提升；Gemini 全量可判读但答案采纳仍需加强。",
  health: "attention" as const,
  owner: "Origin Vector 项目交付团队",
  clientOwner: "OtherWater 客户负责人",
  lastUpdatedAt: "2026-06-22 22:02 CST",
  currentWindow: "启动基线：2026-06-19 / 当前复测：2026-06-22",
  milestone: {
    completed: 4,
    total: 7,
    next: "AI 客服扩容确认 + 社媒后台数据导入",
    dueAt: "2026-06-24",
  },
  tags: ["GEO", "官网承接", "AI客服", "内容社媒", "短视频", "数据验收"],
};

export const geoStageSnapshot = {
  title: "GEO 可见性阶段快照",
  windowLabel: "启动基线：2026-06-19 / 当前复测：2026-06-22",
  conclusion: "品牌与产品可见性已有阶段改善；泛需求场景仍需继续强化。",
  methodLimit:
    "6/19 启动基线与 6/22 Gemini 回答复测属于同渠道可比；公开搜索与 GPT/API 回答为 6/22 同题观察，后续同渠道复测会继续追加到同一日期轴。",
  completion: [
    { label: "公开搜索", value: "200/200 已采集" },
    { label: "GPT/API 回答", value: "200/200 已采集" },
    { label: "Gemini 回答", value: "200/200 已采集" },
    { label: "Gemini 小样本补充", value: "5/5 已采集" },
    { label: "敏感扫描", value: "0 命中" },
  ],
  channelGroups: [
    {
      label: "搜索可见性",
      value: "公开搜索",
      note: "官网页面与活动内容在公开搜索结果中被捕捉的次数增加。",
    },
    {
      label: "AI 回答采纳",
      value: "GPT/API 回答 + Gemini 回答",
      note: "GPT/API 回答较基线改善；Gemini 回答通道可判读，但实体采纳仍偏弱。",
    },
  ],
  keyFindings: [
    "公开搜索与 GPT/API 回答较 6/19 启动基线有阶段改善，说明官网与内容可见性正在被部分承接。",
    "Gemini 回答不是通道失败：200/200 均可判读，但 OtherWater、Nova 100 与 TDS1 的采纳低于启动基线，活动关联略有增强。",
    "泛需求、TDS1 与 AI 客服入口仍是下一阶段重点补强方向。",
  ],
  exposureSeries: [
    { key: "otherwater", label: "OtherWater 品牌", shortLabel: "OW", className: "bg-[#0F766E]" },
    { key: "nova100", label: "Nova 100", shortLabel: "N100", className: "bg-[#2563EB]" },
    { key: "tds1", label: "TDS1", shortLabel: "TDS1", className: "bg-[#7C3AED]" },
    { key: "campaign", label: "Campaign / 活动", shortLabel: "活动", className: "bg-[#D97706]" },
  ],
  exposureTimelines: [
    {
      channel: "Gemini 回答",
      caption: "同渠道 6/19 与 6/22 可比",
      insight: "品牌与产品提及较启动基线下降，活动提及略有提升。",
      note: "这是当前唯一具备 6/19 到 6/22 同渠道日期对比的渠道。",
      dates: [
        { label: "6/19 启动基线", values: { otherwater: 18, nova100: 22, tds1: 2, campaign: 8 } },
        { label: "6/22 复测", values: { otherwater: 16, nova100: 17, tds1: 1, campaign: 9 } },
      ],
    },
    {
      channel: "公开搜索",
      caption: "6/22 同题公开可见性观察",
      insight: "当前可见性较强，但暂无 6/19 同渠道启动基线，不包装为趋势。",
      note: "公开搜索当前只展示 6/22 复测结果；后续同渠道复测会继续追加日期。",
      dates: [
        { label: "6/22 复测", values: { otherwater: 39, nova100: 37, tds1: 20, campaign: 20 } },
      ],
    },
    {
      channel: "GPT/API 回答",
      caption: "6/22 同题答案引擎观察",
      insight: "OtherWater 与 Nova 100 提及已形成可见度，但暂无 6/19 同渠道启动基线。",
      note: "GPT/API 回答当前只展示 6/22 复测结果；后续同渠道复测会继续追加日期。",
      dates: [
        { label: "6/22 复测", values: { otherwater: 27, nova100: 35, tds1: 5, campaign: 19 } },
      ],
    },
  ],
  crossChannelSnapshot: [
    { label: "OtherWater 品牌", publicSearch: 39, gptApi: 27, gemini200: 16 },
    { label: "Nova 100", publicSearch: 37, gptApi: 35, gemini200: 17 },
    { label: "TDS1", publicSearch: 20, gptApi: 5, gemini200: 1 },
    { label: "Campaign / 活动", publicSearch: 20, gptApi: 19, gemini200: 9 },
  ],
  movement: [
    {
      label: "公开搜索",
      total: 200,
      segments: [
        { label: "提升", value: 44, className: "bg-emerald-500" },
        { label: "持平", value: 135, className: "bg-slate-300" },
        { label: "下降", value: 19, className: "bg-amber-500" },
        { label: "不可判读", value: 2, className: "bg-violet-400" },
      ],
    },
    {
      label: "GPT/API 回答",
      total: 200,
      segments: [
        { label: "提升", value: 28, className: "bg-emerald-500" },
        { label: "持平", value: 168, className: "bg-slate-300" },
        { label: "下降", value: 2, className: "bg-amber-500" },
        { label: "不可判读", value: 2, className: "bg-violet-400" },
      ],
    },
    {
      label: "Gemini 回答",
      total: 200,
      segments: [
        { label: "提升", value: 15, className: "bg-emerald-500" },
        { label: "持平", value: 163, className: "bg-slate-300" },
        { label: "下降", value: 20, className: "bg-amber-500" },
        { label: "不可判读", value: 2, className: "bg-violet-400" },
      ],
    },
  ],
  competitorPressure: {
    baseline: 93,
    publicSearch: 117,
    gptApi: 74,
    gemini200: 28,
    note: "公开搜索中的竞品同屏压力仍然较强。Gemini 回答的竞品压力较低，但品牌与产品采纳仍需继续加强。",
  },
  intentBuckets: [
    { label: "品牌导航", publicSearch: "13/24", gptApi: "15/24", gemini200: "9/24", posture: "改善", note: "品牌与产品名层是当前最清晰的改善点；Gemini 回答仍需继续强化实体关联。" },
    { label: "小厨房", publicSearch: "9/27", gptApi: "0/27", gemini200: "0/27", posture: "公开搜索改善", note: "公开页面开始被看见，AI 回答中的实体连接仍偏弱。" },
    { label: "租房", publicSearch: "5/13", gptApi: "0/13", gemini200: "0/13", posture: "公开搜索改善", note: "租房与免安装场景正在进入公开搜索可见层。" },
    { label: "免安装", publicSearch: "2/6", gptApi: "0/6", gemini200: "0/6", posture: "早期改善", note: "下一阶段需要更明确的答案块与实体强化。" },
    { label: "活动/权益", publicSearch: "5/25", gptApi: "5/25", gemini200: "3/25", posture: "混合", note: "活动关联已经可见；Gemini 回答中的活动提及略高于启动基线。" },
    { label: "AI客服", publicSearch: "4/40", gptApi: "5/40", gemini200: "4/40", posture: "混合", note: "客服入口已有出现，但在 AI 回答中尚未形成主导。" },
    { label: "竞品替代", publicSearch: "0/17", gptApi: "0/17", gemini200: "0/17", posture: "较弱", note: "替代搜索意图仍有较大提升空间。" },
    { label: "非品牌高意图", publicSearch: "0/19", gptApi: "0/19", gemini200: "0/19", posture: "较弱", note: "泛需求高意图仍主要被竞品和媒体内容占据。" },
  ],
} as const;

export const metrics: Metric[] = [
  {
    id: "geo_public_uplift",
    moduleId: "geo",
    name: "GEO 公开搜索提升",
    shortLabel: "公开搜索提升",
    value: 44,
    numerator: 44,
    denominator: 200,
    dataStatus: "confirmed",
    sourceId: "geo_200q_phase_snapshot_20260622",
    periodStart: "2026-06-19",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-22 18:20 CST",
    notes: "公开搜索：提升 44 / 持平 135 / 下降 19 / 不可判读 2；同题跨通道观察，不包装为严格同平台趋势。",
    evidenceIds: ["ev_geo_200q_phase_snapshot"],
  },
  {
    id: "geo_generic_brand_hits",
    moduleId: "geo",
    name: "OtherWater 200 题公开可见",
    shortLabel: "OtherWater 可见",
    value: 39,
    numerator: 39,
    denominator: 200,
    dataStatus: "confirmed",
    sourceId: "geo_200q_phase_snapshot_20260622",
    periodStart: "2026-06-19",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-22 18:20 CST",
    notes: "OtherWater 从 6/19 启动基线 18/200，到 6/22 公开搜索 39/200；GPT/API 回答当前 27/200；Gemini 回答当前 16/200。",
    evidenceIds: ["ev_geo_200q_phase_snapshot"],
  },
  {
    id: "ai_regression_historical",
    moduleId: "ai_support",
    name: "历史说明书 1000 题回归",
    shortLabel: "AI 客服回归",
    value: 827,
    numerator: 827,
    denominator: 1000,
    dataStatus: "confirmed",
    sourceId: "ai_support_regression_prior",
    periodStart: "2026-06-21",
    periodEnd: "2026-06-21",
    lastCheckedAt: "2026-06-21 23:08 CST",
    notes: "这是旧基线正式结果；正式版交付前仍需完成扩容后最终回归与上线确认。",
    evidenceIds: ["ev_ai_prior_regression"],
  },
  {
    id: "social_public_verified",
    moduleId: "social",
    name: "平台公开发布验证",
    shortLabel: "公开发布验证",
    value: 1,
    numerator: 1,
    denominator: 3,
    dataStatus: "manual_review",
    sourceId: "social_publish_visibility",
    periodStart: "2026-06-20",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-21 23:08 CST",
    notes: "LinkedIn 已公开验证；Facebook API 返回对象但用户侧不可见；Instagram 发布失败。",
    evidenceIds: ["ev_social_publish"],
  },
  {
    id: "social_impressions",
    moduleId: "social",
    name: "全平台有效曝光",
    shortLabel: "曝光 / 互动",
    value: null,
    dataStatus: "pending_import",
    sourceId: "social_backend_exports",
    periodStart: "2026-06-18",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-22 00:51 CST",
    notes: "Meta、LinkedIn 等后台曝光、互动、点击数据尚未导入；不填 0、不计算 CTR。",
    evidenceIds: ["ev_data_gap"],
  },
  {
    id: "video_status",
    moduleId: "video_ugc",
    name: "短视频模块",
    shortLabel: "短视频 / UGC",
    value: "尚未启动",
    dataStatus: "not_started",
    sourceId: "video_ugc_plan",
    lastCheckedAt: "2026-06-22 00:51 CST",
    notes: "方向已确认：RO 废水解释、开箱、伦敦测水、租房场景、UGC 合集；首批脚本与产品标准素材待确认。",
    evidenceIds: ["ev_video_plan"],
  },
];

export const dataSources: DataSource[] = [
  {
    id: "geo_200q_phase_snapshot_20260622",
    name: "GEO 200 题完整阶段复测",
    sourceType: "manual",
    scope: "third_party",
    status: "confirmed",
    periodStart: "2026-06-19",
    periodEnd: "2026-06-22",
    lastImportedAt: "2026-06-22 21:57 CST",
    lastCheckedAt: "2026-06-22 21:57 CST",
    owner: "GEO Delivery Team",
    missingFields: [],
    affectedMetricIds: ["geo_public_uplift", "geo_generic_brand_hits"],
    note: "公开搜索 200/200 已采集；GPT/API 回答 200/200 已采集；Gemini 回答 200/200 已采集；Gemini 小样本补充 5/5 已采集；敏感扫描 0 命中。",
  },
  {
    id: "geo_public_search_20260621",
    name: "公开搜索 / GEO 复测",
    sourceType: "manual",
    scope: "third_party",
    status: "confirmed",
    periodStart: "2026-06-21",
    periodEnd: "2026-06-21",
    lastImportedAt: "2026-06-21 01:27 CST",
    lastCheckedAt: "2026-06-21 01:27 CST",
    owner: "GEO Delivery Team",
    missingFields: [],
    affectedMetricIds: ["geo_public_uplift", "geo_generic_brand_hits"],
    note: "公开搜索样本 45/45 已采集；Gemini 与 GPT/API 结果另列，不与公开搜索混算。",
  },
  {
    id: "gpt_api_retest_20260621",
    name: "GPT API 通道复测",
    sourceType: "api",
    scope: "third_party",
    status: "confirmed",
    periodStart: "2026-06-21",
    periodEnd: "2026-06-21",
    lastImportedAt: "2026-06-21 01:27 CST",
    lastCheckedAt: "2026-06-21 01:27 CST",
    owner: "GEO Delivery Team",
    missingFields: [],
    affectedMetricIds: ["geo_public_uplift"],
    note: "GPT：2 提升 / 42 持平 / 0 下降 / 1 错误；通道错误单列，不计入业务下降。",
  },
  {
    id: "gemini_channel_status",
    name: "Gemini 200 题复测",
    sourceType: "api",
    scope: "third_party",
    status: "confirmed",
    periodStart: "2026-06-22",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-22 21:57 CST",
    owner: "GEO Delivery Team",
    missingFields: [],
    affectedMetricIds: ["geo_public_uplift"],
    note: "Gemini 回答 200/200 已采集，错误 0；OtherWater 16/200，Nova 100 17/200，TDS1 1/200，Campaign / 活动 9/200。",
  },
  {
    id: "ai_support_regression_prior",
    name: "AI 客服旧基线回归",
    sourceType: "qa",
    scope: "ai_support",
    status: "confirmed",
    periodStart: "2026-06-21",
    periodEnd: "2026-06-21",
    lastImportedAt: "2026-06-21 23:08 CST",
    lastCheckedAt: "2026-06-21 23:08 CST",
    owner: "AI Support Delivery Team",
    missingFields: ["扩容后最终新 1000 回归", "生产部署确认结论"],
    affectedMetricIds: ["ai_regression_historical"],
    note: "旧 500 为 495 PASS / 0 FAIL / 5 SKIP，plus500 为 500/500 PASS；最终扩容部署仍待确认。",
  },
  {
    id: "official_site_public_sync",
    name: "OtherWater 官网 / 承接页公开同步",
    sourceType: "url",
    scope: "official_site",
    status: "manual_review",
    periodStart: "2026-06-21",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-21 23:08 CST",
    owner: "Website Operations Team",
    missingFields: ["证据页移动端视觉确认", "全站 post-write 回归"],
    affectedMetricIds: ["geo_generic_brand_hits"],
    note: "公开页面可访问与后台写入成功分开记录；证据页 CSS 写入成功，但移动端和全站回归仍待确认。",
  },
  {
    id: "external_hcmy_activity",
    name: "HCMY 外部活动站",
    sourceType: "manual",
    scope: "external_campaign_site",
    status: "pending_import",
    periodStart: "2026-06-18",
    periodEnd: "2026-06-22",
    owner: "Origin Vector 项目交付团队",
    missingFields: ["外部站访问", "活动参与", "跳转回流"],
    affectedMetricIds: [],
    note: "外部活动站不是 OtherWater 官网页面；当前按 external/manual/optional 独立统计。",
  },
  {
    id: "social_publish_visibility",
    name: "社媒 API 发布与公开可见",
    sourceType: "api",
    scope: "social_platform",
    status: "manual_review",
    periodStart: "2026-06-20",
    periodEnd: "2026-06-22",
    lastCheckedAt: "2026-06-21 23:08 CST",
    owner: "Content Operations Team",
    missingFields: ["Facebook 人工可见性确认", "Instagram 错误复核"],
    affectedMetricIds: ["social_public_verified"],
    apiStatus: "published",
    publicVisibility: "pending_manual_review",
    note: "LinkedIn verified_visible；Facebook API 成功但用户侧不可见；Instagram failed。",
  },
  {
    id: "social_backend_exports",
    name: "社媒后台曝光 / 互动导出",
    sourceType: "csv",
    scope: "social_platform",
    status: "pending_import",
    periodStart: "2026-06-18",
    periodEnd: "2026-06-22",
    owner: "客户负责人",
    missingFields: ["impressions", "reach", "likes", "comments", "shares", "saves", "link clicks", "CTR"],
    affectedMetricIds: ["social_impressions"],
    note: "未导入前曝光、互动、点击、CTR 均显示待导入，不显示 0。",
  },
  {
    id: "video_ugc_plan",
    name: "短视频 / UGC 策划记录",
    sourceType: "manual",
    scope: "third_party",
    status: "not_started",
    owner: "Video / UGC Delivery Team",
    missingFields: ["首批脚本", "产品标准素材", "公开 URL", "播放与完播数据"],
    affectedMetricIds: ["video_status"],
    note: "模块尚未启动；只显示方向和下一步，不渲染全 0 趋势。",
  },
];

export const actions: ActionItem[] = [
  {
    id: "act_social_export_upload",
    moduleId: "social",
    title: "上传社媒后台曝光与互动导出",
    description: "提供 LinkedIn / Meta 等后台在当前统计窗口内的曝光、互动、点击字段，CSV 或截图均可先进入人工核验。",
    type: "upload",
    priority: "P0",
    status: "waiting_client",
    assignee: "OtherWater 客户负责人",
    requestedFromRole: "client",
    dueAt: "2026-06-23",
    blockerReason: "未导入后台数据，社媒曝光、互动、CTR 无法计算。",
    completionCriteria: "上传包含统计窗口和平台字段的 CSV、截图或后台报告。",
    metricIds: ["social_impressions"],
    evidenceIds: ["ev_data_gap"],
    commentCount: 2,
  },
  {
    id: "act_facebook_visibility",
    moduleId: "social",
    title: "人工核验 Facebook 公开可见状态",
    description: "API 返回发布对象不等于公开页面可见，需要客户侧或运营侧补充真实可见截图或确认不可见。",
    type: "review",
    priority: "P1",
    status: "waiting_client",
    assignee: "客户 / Content Operations Team",
    requestedFromRole: "client",
    dueAt: "2026-06-23",
    blockerReason: "发布真实性 KPI 目前为 manual_review。",
    completionCriteria: "确认 Facebook 公开 URL 可见、不可见或需重新授权。",
    metricIds: ["social_public_verified"],
    evidenceIds: ["ev_social_publish"],
    commentCount: 1,
  },
  {
    id: "act_video_script_confirm",
    moduleId: "video_ugc",
    title: "确认首批 2 条短视频脚本方向",
    description: "从 RO 废水解释、开箱、伦敦测水、租房场景、UGC 合集里确认首批 2 条，并补充产品标准素材。",
    type: "approval",
    priority: "P1",
    status: "waiting_client",
    assignee: "OtherWater 客户负责人",
    requestedFromRole: "client",
    dueAt: "2026-06-24",
    completionCriteria: "确认首批脚本方向、产品画面标准和不可使用素材边界。",
    metricIds: ["video_status"],
    evidenceIds: ["ev_video_plan"],
    commentCount: 0,
  },
  {
    id: "act_ai_final_acceptance",
    moduleId: "ai_support",
    title: "完成 AI 客服扩容后新 1000 回归和上线确认",
    description: "新一轮 QA / 知识块 / 新 1000 题已进入交付确认链路，最终生产部署和线上检查完成后再更新为正式交付。",
    type: "review",
    priority: "P0",
    status: "waiting_internal",
    assignee: "AI Support Delivery Team",
    requestedFromRole: "operator",
    dueAt: "2026-06-24",
    blockerReason: "最终向量重建、新 1000 回归和生产部署确认尚未完成。",
    completionCriteria: "交付回归数、部署版本、线上检查、回滚点与正式版交付判断全部齐备。",
    metricIds: ["ai_regression_historical"],
    evidenceIds: ["ev_ai_prior_regression"],
    commentCount: 3,
  },
  {
    id: "act_website_public_sync",
    moduleId: "website",
    title: "复测官网证据页移动端和全站公开同步",
    description: "后台 CSS 写入成功不代表公开层所有页面已稳定，证据页移动端和 homepage/footer/activity/TDS/Renters 回归仍需完成。",
    type: "retest",
    priority: "P1",
    status: "waiting_internal",
    assignee: "Website Operations Team",
    requestedFromRole: "operator",
    dueAt: "2026-06-23",
    completionCriteria: "提交公开 URL、桌面/移动截图、无页面级横向溢出结论。",
    metricIds: ["geo_generic_brand_hits"],
    evidenceIds: ["ev_website_public_sync"],
    commentCount: 1,
  },
];

export const modules: ModuleSummary[] = [
  {
    id: "geo",
    key: "geo",
    name: "GEO / AEO 可见性",
    icon: SearchCheck,
    status: "attention",
    headline: "完整 200 题阶段复测显示公开搜索与 GPT/API 回答有阶段提升；Gemini 回答可判读但实体采纳偏弱。",
    owner: "GEO Delivery Team",
    primaryMetricId: "geo_public_uplift",
    supportingMetricIds: ["geo_generic_brand_hits"],
    dataGap: "6/19 基线为 Gemini API 池；6/22 公开搜索、GPT/API 回答与 Gemini 回答是同题跨通道观察，不能包装为严格同平台趋势。",
    nextActionId: "act_website_public_sync",
    evidenceIds: ["ev_geo_200q_phase_snapshot", "ev_geo_api_retest", "ev_geo_public_search"],
    lastCheckedAt: "2026-06-22 21:57 CST",
    stats: [
      { label: "公开搜索", value: "提升 44 / 持平 135 / 下降 19", status: "confirmed" },
      { label: "GPT/API 回答", value: "提升 28 / 持平 168 / 下降 2", status: "confirmed" },
      { label: "Gemini 回答", value: "提升 15 / 持平 163 / 下降 20", status: "confirmed" },
      { label: "采集完成度", value: "200/200 + 200/200 + 200/200", status: "confirmed" },
    ],
    details: [
      "6/19 启动基线：OtherWater 18/200，Nova 100 22/200，TDS1 2/200，Campaign / 活动 8/200。",
      "6/22 公开搜索：OtherWater 39/200，Nova 100 37/200，TDS1 20/200，Campaign / 活动 20/200。",
      "6/22 GPT/API 回答：OtherWater 27/200，Nova 100 35/200，TDS1 5/200，Campaign / 活动 19/200。",
      "6/22 Gemini 回答：OtherWater 16/200，Nova 100 17/200，TDS1 1/200，Campaign / 活动 9/200；200/200 可判读，错误 0。",
      "租房、免安装、小厨房在公开搜索有阶段改善；泛需求、TDS1 和 AI 客服入口仍是下一阶段重点。",
    ],
  },
  {
    id: "ai_support",
    key: "ai_support",
    name: "AI 客服 / RAG 承接",
    icon: Bot,
    status: "attention",
    headline: "旧基线可用；扩容后最终向量重建、新 1000 回归和生产部署仍待确认。",
    owner: "AI Support Delivery Team",
    primaryMetricId: "ai_regression_historical",
    supportingMetricIds: [],
    dataGap: "新 1000 回归和线上部署检查完成前，正式交付状态保持待确认。",
    nextActionId: "act_ai_final_acceptance",
    evidenceIds: ["ev_ai_prior_regression"],
    lastCheckedAt: "2026-06-21 23:08 CST",
    stats: [
      { label: "旧 500", value: "495 PASS / 5 SKIP", status: "confirmed" },
      { label: "plus500", value: "500/500 PASS", status: "confirmed" },
      { label: "扩容后 QA / manual", value: "982 / 1047", status: "manual_review" },
    ],
    details: [
      "历史说明书 1000：827/1000 PASS。",
      "旧 500 的 5 SKIP 为天气/离题样本，不是 TDS1 政策问题。",
      "最终向量重建、扩展新 1000 回归、生产部署与回滚点仍需在正式交付前确认。",
    ],
  },
  {
    id: "social",
    key: "social",
    name: "内容与社媒分发",
    icon: Megaphone,
    status: "blocked",
    headline: "发布系统健康与内容计划分开看；后台曝光互动缺失，发布公开可见仍需人工核验。",
    owner: "Content Operations Team",
    primaryMetricId: "social_public_verified",
    supportingMetricIds: ["social_impressions"],
    dataGap: "Meta / LinkedIn 后台导出待客户上传；API 成功与公开可见是两个字段。",
    nextActionId: "act_social_export_upload",
    evidenceIds: ["ev_social_publish", "ev_data_gap"],
    lastCheckedAt: "2026-06-21 23:08 CST",
    stats: [
      { label: "LinkedIn", value: "API 成功 / 公开可见", status: "confirmed" },
      { label: "Facebook", value: "API 成功 / 待人工", status: "manual_review" },
      { label: "Instagram", value: "blocked request", status: "blocked" },
    ],
    details: [
      "内容计划和发布系统健康分开展示，避免把发布对象返回当作公开可见。",
      "曝光、互动、点击、CTR 全部待后台导入，不展示 0。",
      "Postiz 清理排程和素材是另一个待执行队列，不在本看板自动操作。",
    ],
  },
  {
    id: "video_ugc",
    key: "video_ugc",
    name: "短视频 / UGC",
    icon: Video,
    status: "not_started",
    headline: "模块尚未启动；只保留方向、负责人和下一步，不绘制全 0 趋势。",
    owner: "Video / UGC Delivery Team",
    primaryMetricId: "video_status",
    supportingMetricIds: [],
    dataGap: "脚本、素材、公开 URL、播放量和完播率均待启动后导入。",
    nextActionId: "act_video_script_confirm",
    evidenceIds: ["ev_video_plan"],
    lastCheckedAt: "2026-06-22 00:51 CST",
    stats: [
      { label: "计划方向", value: "5 个", status: "confirmed" },
      { label: "首批脚本", value: "待确认", status: "pending_import" },
      { label: "公开视频", value: "尚未启动", status: "not_started" },
    ],
    details: [
      "已确认方向：RO 废水解释、开箱、伦敦测水、租房场景、UGC 合集。",
      "下一步：确认首批 2 条脚本与产品标准素材。",
      "播放量、完播率和 UGC 比例在平台后台导出前不显示为 0。",
    ],
  },
  {
    id: "website",
    key: "website",
    name: "官网 / 承接页",
    icon: Globe2,
    status: "attention",
    headline: "官网、外部 HCMY 活动站和第三方平台分开统计；公开同步回归未完成。",
    owner: "Website Operations Team",
    supportingMetricIds: ["geo_generic_brand_hits"],
    dataGap: "证据页移动端与多页面 post-write 公开回归仍待确认。",
    nextActionId: "act_website_public_sync",
    evidenceIds: ["ev_website_public_sync"],
    lastCheckedAt: "2026-06-21 23:08 CST",
    stats: [
      { label: "官网 public pages", value: "16/16 可访问", status: "confirmed" },
      { label: "证据页移动端", value: "待复测", status: "manual_review" },
      { label: "HCMY 外部站", value: "外部 / 待导入", status: "pending_import" },
    ],
    details: [
      "后台写入成功和公开页面真实可见必须分开。",
      "HCMY 主活动站不是官方 Shopify 页面，按 external_campaign_site 单独统计。",
      "官网承接页主要支撑 GEO、社媒、活动回流和客服入口。",
    ],
  },
  {
    id: "data_import",
    key: "data_import",
    name: "数据源与导入",
    icon: DatabaseZap,
    status: "attention",
    headline: "已确认、待导入、通道错误、人工核验分开显示，缺失数据不填 0。",
    owner: "Data Operations Team",
    supportingMetricIds: ["social_impressions"],
    dataGap: "社媒后台、HCMY 外部站、视频/UGC 均缺少导入数据。",
    evidenceIds: ["ev_data_gap"],
    lastCheckedAt: "2026-06-22 00:51 CST",
    stats: [
      { label: "已确认源", value: "3", status: "confirmed" },
      { label: "待导入", value: "3", status: "pending_import" },
      { label: "通道错误", value: "1", status: "channel_error" },
    ],
    details: [
      "每个指标必须带来源、统计窗口和最后核验时间。",
      "数据源状态影响 KPI 是否能计算比例或趋势。",
      "客户上传 CSV / 截图后先进入人工核验，不直接覆盖经营口径。",
    ],
  },
  {
    id: "deliverables",
    key: "deliverables",
    name: "交付确认",
    icon: ClipboardCheck,
    status: "attention",
    headline: "交付物按版本、验收依据、数据来源和确认状态闭环；正式版会沉淀为客户后台交付模板。",
    owner: "Origin Vector 项目交付团队",
    supportingMetricIds: [],
    dataGap: "当前演示版用于确认信息结构与交付口径；正式版将接入稳定的数据更新与客户确认流程。",
    evidenceIds: ["ev_dashboard_spec"],
    lastCheckedAt: "2026-06-22 00:51 CST",
    stats: [
      { label: "待确认", value: "2", status: "manual_review" },
      { label: "已确认", value: "1", status: "confirmed" },
      { label: "调整中", value: "0", status: "not_applicable" },
    ],
    details: [
      "客户可查看交付物、确认完成或提交调整意见。",
      "每个交付物保留版本、提交时间、确认依据和反馈窗口。",
      "正式版会沉淀为客户后台交付模板，支持后续数据来源、更新频率和确认状态持续维护。",
    ],
  },
  {
    id: "access_region",
    key: "access_region",
    name: "权限、区域与域名",
    icon: LockKeyhole,
    status: "healthy",
    headline: ".ovops 工作区只记录区域和权限规则；不自动新开用户、租户、域名或服务器。",
    owner: "Platform Operations Team",
    supportingMetricIds: [],
    dataGap: "新账号、新租户、新子域名、新服务器必须获得书面确认后执行。",
    evidenceIds: ["ev_access_rules"],
    lastCheckedAt: "2026-06-22 00:51 CST",
    stats: [
      { label: "客户类型", value: "海外", status: "confirmed" },
      { label: "默认区域", value: "新加坡", status: "confirmed" },
      { label: "新开权限", value: "需人工确认", status: "manual_review" },
    ],
    details: [
      "国外用户默认新加坡服务器，国内用户默认广州服务器，最终仍需人工确认。",
      "不允许从 OtherWater 复制权限到其他客户。",
      "密码校验必须在服务端完成，前端不保存第三方平台密码。",
    ],
  },
];

export const evidence: EvidenceItem[] = [
  {
    id: "ev_geo_200q_phase_snapshot",
    title: "GEO 200 题阶段复测快照",
    type: "report",
    moduleId: "geo",
    metricIds: ["geo_public_uplift", "geo_generic_brand_hits"],
    actionIds: [],
    source: "GEO Delivery Team",
    createdAt: "2026-06-22",
    lastVerifiedAt: "2026-06-22 21:57 CST",
    visibility: "client",
    verificationStatus: "verified",
    href: "#GEO快照",
  },
  {
    id: "ev_geo_api_retest",
    title: "GEO AI 答案引擎复测摘要",
    type: "report",
    moduleId: "geo",
    metricIds: ["geo_public_uplift"],
    actionIds: [],
    source: "GEO Delivery Team",
    createdAt: "2026-06-21",
    lastVerifiedAt: "2026-06-21 01:27 CST",
    visibility: "client",
    verificationStatus: "verified",
    href: "#geo-api-retest",
  },
  {
    id: "ev_geo_public_search",
    title: "公开搜索 45 题复测摘要",
    type: "csv",
    moduleId: "geo",
    metricIds: ["geo_generic_brand_hits"],
    actionIds: [],
    source: "公开搜索样本",
    createdAt: "2026-06-21",
    lastVerifiedAt: "2026-06-21 01:27 CST",
    visibility: "client",
    verificationStatus: "verified",
    href: "#geo-public-search",
  },
  {
    id: "ev_ai_prior_regression",
    title: "AI 客服旧基线与扩容确认记录",
    type: "qa",
    moduleId: "ai_support",
    metricIds: ["ai_regression_historical"],
    actionIds: ["act_ai_final_acceptance"],
    source: "AI Support Delivery Team",
    createdAt: "2026-06-21",
    lastVerifiedAt: "2026-06-21 23:08 CST",
    visibility: "client",
    verificationStatus: "unverified",
    href: "#ai-regression",
  },
  {
    id: "ev_social_publish",
    title: "社媒发布 API 与公开可见核验表",
    type: "report",
    moduleId: "social",
    metricIds: ["social_public_verified"],
    actionIds: ["act_facebook_visibility"],
    source: "Content Operations Team",
    createdAt: "2026-06-21",
    lastVerifiedAt: "2026-06-21 23:08 CST",
    visibility: "client",
    verificationStatus: "unverified",
    href: "#social-publish",
  },
  {
    id: "ev_data_gap",
    title: "社媒后台指标缺口清单",
    type: "csv",
    moduleId: "data_import",
    metricIds: ["social_impressions"],
    actionIds: ["act_social_export_upload"],
    source: "Data Operations Team",
    createdAt: "2026-06-22",
    lastVerifiedAt: "2026-06-22 00:51 CST",
    visibility: "client",
    verificationStatus: "verified",
    href: "#data-gap",
  },
  {
    id: "ev_video_plan",
    title: "短视频方向确认记录",
    type: "report",
    moduleId: "video_ugc",
    metricIds: ["video_status"],
    actionIds: ["act_video_script_confirm"],
    source: "Video / UGC Delivery Team",
    createdAt: "2026-06-22",
    visibility: "client",
    verificationStatus: "unverified",
    href: "#video-plan",
  },
  {
    id: "ev_website_public_sync",
    title: "官网证据页公开同步待复测记录",
    type: "screenshot",
    moduleId: "website",
    metricIds: ["geo_generic_brand_hits"],
    actionIds: ["act_website_public_sync"],
    source: "Website Operations Team",
    createdAt: "2026-06-21",
    lastVerifiedAt: "2026-06-21 23:08 CST",
    visibility: "client",
    verificationStatus: "unverified",
    href: "#website-public-sync",
  },
  {
    id: "ev_dashboard_spec",
    title: "OVOPS 客户看板演示版说明",
    type: "report",
    moduleId: "deliverables",
    metricIds: [],
    actionIds: [],
    source: "Origin Vector Delivery Team",
    createdAt: "2026-06-22",
    lastVerifiedAt: "2026-06-22 00:51 CST",
    visibility: "client",
    verificationStatus: "verified",
    href: "#dashboard-spec",
  },
  {
    id: "ev_access_rules",
    title: ".ovops 权限与区域规则",
    type: "log",
    moduleId: "access_region",
    metricIds: [],
    actionIds: [],
    source: "Platform Operations Team",
    createdAt: "2026-06-22",
    lastVerifiedAt: "2026-06-22 00:51 CST",
    visibility: "internal_only",
    verificationStatus: "verified",
    href: "#access-region",
  },
];

export const deliverables: Deliverable[] = [
  {
    id: "del_geo_retest",
    moduleId: "geo",
    title: "GEO 200 题完整阶段复测快照",
    version: "2026-06-22",
    submittedAt: "2026-06-22",
    acceptanceCriteria: "包含 6/19 启动基线、6/22 公开搜索、6/22 GPT/API 回答、6/22 Gemini 回答、变化分布、竞品压力、意图桶和敏感扫描结论。",
    acceptanceStatus: "approved",
    revisionCount: 0,
    evidenceIds: ["ev_geo_200q_phase_snapshot", "ev_geo_api_retest", "ev_geo_public_search"],
    scopeBoundary: "6/19 基线与 6/22 当前通道为同题跨通道观察，不等同于严格同平台趋势、广告或销售转化承诺。",
  },
  {
    id: "del_dashboard_v01",
    moduleId: "deliverables",
    title: "OVOPS Client Command Center demo",
    version: "0.1",
    submittedAt: "2026-06-22",
    acceptanceCriteria: "客户能看到项目判断、核心 KPI、待确认事项、主模块、行动队列、数据缺口、证据和数据源状态。",
    acceptanceStatus: "waiting_client",
    feedbackDueAt: "2026-06-24",
    revisionCount: 0,
    evidenceIds: ["ev_dashboard_spec"],
    scopeBoundary: "当前为演示版本；Phase 2 将交付正式版，并沉淀为客户后台交付模板。",
  },
  {
    id: "del_ai_support_acceptance",
    moduleId: "ai_support",
    title: "AI 客服扩容正式版交付确认",
    version: "pending",
    acceptanceCriteria: "最终回归、线上部署检查、回滚点和正式版交付判断全部齐备。",
    acceptanceStatus: "submitted",
    feedbackDueAt: "2026-06-24",
    revisionCount: 0,
    evidenceIds: ["ev_ai_prior_regression"],
    scopeBoundary: "最终回归和线上确认完成前，不展示为正式版部署完成。",
  },
];
