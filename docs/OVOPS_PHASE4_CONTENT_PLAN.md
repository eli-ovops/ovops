# OVOPS Phase 4｜受控内容、SEO/GEO 与扩展规划

**规划状态：** `PLANNING_ONLY`（不是公开文案、产品目录、发布清单或开发任务）  
**规划日期：** 2026-07-20  
**范围：** 内容模型、Owner 审核包与未来实施顺序；本文件不改变当前站点、数据、索引、部署或任何公开声明。

## 0. 事实基线、角色与状态机

### 0.1 已核对的权威输入

- `docs/OVOPS_V2_PHASE3_CONTENT_REPORT.md`：当前仅 `CONTENT_READY_FOR_OWNER_REVIEW=true`；`PREVIEW_PACKAGE_READY=false`、`PREVIEW_DEPLOY_AUTHORIZED=false`、`PREVIEW_DEPLOYED=false`。
- `docs/OVOPS_V2_BUSINESS_FACTS.md`、`OVOPS_V2_CLAIMS_AUDIT.md`、`OVOPS_V2_CONTENT_GAPS.md`、`OVOPS_V2_ASSET_REQUIREMENTS.md`、`OVOPS_V2_AUDIT.md`、`OVOPS_V2_API_PLATFORM_FACTS.md`、`OVOPS_V2_PORTAL_FACTS.md`：可公开 `CONFIRMED` 业务事实为 **0**；客户、Logo、截图、合同、金额、量化结果、评价、账号和基础设施细节均不可公开。
- 当前 `lib/content-data.ts`、`lib/confirmed-facts.ts`、`lib/content-policy.ts`、`lib/content-visibility.ts`：候选事实必须通过 `confirmed && publicAllowed` 才能公开；现有 4 项仅是 pending 候选状态，不是可验证案例。
- 网站交付 SOP：DS-002B V2.4，SHA-256 `d197b9f3334a19ddd37db2db2972379142038b1c59d02b01f5cdee00f32c4cf2`；本规划对应 P3/P6/P17 的准备，不构成 P6 质量通过、P8 发布或 P19 最终验收。

### 0.2 Phase 4 目标与非目标

| 项目 | 定义 |
| --- | --- |
| 目标 | 建立可审计的服务深化、行业、案例候选、FAQ、Insights、SEO/GEO 和实施批次，使 Owner 可逐条确认而非一次性放开内容。 |
| 非目标 | 不写最终文章/FAQ正文，不新增页面、案例数据、图像或产品；不承诺价格、周期、源码、私有部署、上线、模型、SLA、结果或行业经验。 |
| 事实授权 | 每条对外事实必须有 `factId`、原始来源与日期、公开范围、具名 Business Owner、确认日期、复审/到期日；客户相关项另须客户书面授权与脱敏复核。 |
| 素材授权 | 每个素材须有资产 ID、来源/权利、用途、期限、中文/英文 alt、脱敏记录与 Owner 批准。无授权只可使用中性占位，不能进公开仓库或页面。 |
| 内容 Owner | Business Owner 负责事实/服务/行业/CTA；Client Owner 负责客户项目与素材；Legal/Privacy Owner 负责主体与数据说明；Technical Owner 负责实际能力、部署/API/Portal；Editor 只在以上确认后编辑。 |

### 0.3 四态分离（不可跳过）

| 状态 | 可做 | 不可做 | 进入下一态的证据 |
| --- | --- | --- | --- |
| `PLANNING_ONLY` | ID、结构、问题库、候选标题、内链设计 | 公开、索引、暗示可购买或已交付 | Owner 指定事实与范围。 |
| `OWNER_CONFIRMED` | 锁定内容 brief、写草稿、建立私有审校件 | 发布、上线、使用客户资产 | 字段完整的事实/授权/素材登记。 |
| `IMPLEMENTABLE` | 在获授权执行任务中写代码/内容、测试内部版本 | 部署、真实表单/登录/API  | 审校通过、CTA 真实、技术与法律边界已确认。 |
| `PREVIEWABLE` | 按独立授权走打包、validate、单次预览 deploy 与浏览器验收 | 正式生产、数据/migration/Portal/API 变更 | `site.yaml`、实时 guide/status、分支+40 位 SHA、唯一 deploy owner、`validation_ok` 与预览授权。 |

**总门禁：** `CONTENT_READY_FOR_OWNER_REVIEW` 不等于 `OWNER_CONFIRMED`；`OWNER_CONFIRMED` 不等于 `IMPLEMENTABLE`；任何前置准备或 HTTP/构建结果都不等于 `PREVIEWABLE` 或用户验收。

## 1. 页面范围（已有与建议分离）

| 页面/路由族 | 当前状态 | Phase 4 建议 | 发布/索引门禁 |
| --- | --- | --- | --- |
| `/`、`/solutions`、6 个 `/solutions/*` | 已有 | 深化六服务的采购边界与内链 | 服务事实、真实 CTA、双语同源。 |
| `/industries`、现有 5 个行业方向 | 已有 | 保持典型场景口径；不写实绩 | `GENERAL_CAPABILITY` 或更高的 Owner 确认。 |
| `/work`、4 个 `/work/*` | 已有 | 保持 Phase 3 保守状态；仅在授权后升级 | 客户事实+授权；否则降为情景/概念。 |
| `/insights` | 已有占位 | 先支持前 20 个经审校内容；余下排队 | 每篇独立事实、编辑、发布日期与相关链接。 |
| `/faq`、`/delivery-process` | 已有 | 扩展为结构化问题库与八步流程 | 事实依赖和 CTA 已确认；无最终长答案前不扩量。 |
| `/why-ovops` | 建议新增 | 优势矩阵；仅展示 `CONFIRMED` 方法/证据 | 不可把 PENDING 作为卖点。 |
| `/industries/{education,healthcare,public-services,real-estate,financial-services}` | 建议新增 | 仅作为 GENERAL_CAPABILITY/DO_NOT_CLAIM 场景页 | 每页独立风险、法务和事实审批。 |
| `/products` 或产品概念入口 | 建议新增但默认不实施 | 仅当实际产品、商标/域名/定价/支持已确认 | 未建、未售、未支持即不发布。 |
| `case/industry/insight` 详情扩展 | 建议数据驱动 | 批次启用，不默认全量上线 | 单条 PublicationGate 通过。 |

**不默认新增：** 定价页、客户 Logo 墙、评价页、案例成果页、API 注册页、Portal 登录/账号页、真实表单成功页、模型列表页；均另有事实、系统和授权门禁。

## 2. 六项服务深化模板（均为 `PENDING` 规划，不是销售承诺）

共同字段：`适合企业｜客户问题｜解决方法｜候选交付物｜明确非范围｜周期/预算边界｜FAQ｜内链｜CTA`。周期、固定报价、源码归属、客户私有部署、维护 SLA、第三方/API/模型费用一律为“按范围、技术和合同确认”，不得用本表形成承诺。

| 服务 | 适合企业 / 客户问题 | 解决方法 / 候选交付物 | 非范围与周期预算边界 | FAQ / 内链 / CTA 门禁 |
| --- | --- | --- | --- | --- |
| 企业网站与数字化门户 | 需厘清公开表达、咨询入口或受邀信息入口的组织；问题是信息分散、路径不清。 | 信息架构、双语内容计划、页面/权限边界、SEO/GEO 基线、门户范围草案。 | 不含真实门户、登录、CRM、上线、合规文本或长期运维；后台/源码/部署均按范围确认。 | FAQ：网站/门户、SEO/GEO、部署；链至行业、交付流程、Insights；CTA 仅在真实联系路径确认后显示。 |
| 企业业务系统定制 | 依赖表格、重复录入、跨角色协同的团队；问题是流程/主数据/状态不可追踪。 | 流程与角色图、数据字段矩阵、原型、验收草案、看板/接口评估。 | 不含数据迁移清洗、ERP/OA/支付、第三方集成、生产系统或安全认证；周期/预算取决于流程、数据、接口和测试。 | FAQ：SaaS/定制、库存/生产/API、维护；链至制造/外贸等场景和流程文章；CTA 为范围澄清而非“立即开发”。 |
| AI 知识库与智能助手 | FAQ、产品资料、制度或话术复杂的团队；问题是检索慢、答复不一致。 | 知识来源盘点、权限矩阵、证据卡、评测集、转人工与更新规则、受控原型。 | 不承诺准确率、模型、训练、数据留存、上线或私有部署；高风险资料须专项审批。 | FAQ：知识库/网盘、模型训练、数据/保密、AI 客服；链至专业服务/制造情景和证据文章；CTA 要求资料与 Owner。 |
| AI 工作流与自动化 | 有重复录入、内容、运营或协作动作的团队；问题是人工复制、异常不可追溯。 | 当前/目标工作流图、触发/异常/人工复核设计、权限与日志要求、试点范围。 | 不含未授权系统接入、RPA/生产写入、长期监控或第三方费用；周期/报价取决于权限、异常、接口和测试。 | FAQ：自动化风险、API、维护；链至制造/外贸、零售和流程文章；CTA 前须提供系统与权限边界。 |
| AI 营销与内容运营 | 需要把官网、FAQ、内容和复盘协同的品牌；问题是内容断裂、口径不一、可见性弱。 | 采购问题库、主题集群、内容 brief、事实审校流程、内链与复测口径。 | 不保证排名、流量、增长、发文频率或渠道代运营；广告投放、KOL、版权和第三方成本另议。 | FAQ：SEO/GEO、内容审校、SEO/CRM；链至 Insights、行业页、FAQ；CTA 只有可收件人/隐私流程确认后可用。 |
| AI 诊断与实施咨询 | 管理团队尚未确定优先级、采购方式或验收法；问题是范围失控、技术选择不清。 | 访谈问题库、机会排序、风险台账、SOW/验收草案、试点或不做建议。 | 不替代法律、财务、安全、医疗或合规专业意见；不保证立项/上线；费用和周期需合同。 | FAQ：适配性、资料、周期、预算、维护；链至所有服务、交付流程和入门 Insights；CTA 是范围评估请求。 |

## 3. 案例候选库（20 项；当前公开已验证案例 = 0）

**真实性规则：**

- `VERIFIED_ANONYMIZED_CASE` 仅可用于“真实项目 + 可审计来源 + Business Owner 与客户公开授权 + 素材脱敏批准”的条目；当前为 **0/20**。
- `TYPICAL_SCENARIO` 只能描述通用采购问题、可评审方法和待确认交付；不得称客户项目、上线、结果或试点。
- `CONCEPT_MOCKUP` 只能展示显著标签“**高保真概念界面 / 非客户上线截图**”；不得使用客户 Logo、数据、姓名、指标或暗示客户身份。
- 不得以“某华东企业”“某国际律所”等模糊地理/规模/行业身份暗示真实客户。Phase 3 的 4 项保留其候选状态，但对外仍按下表的保守标签处理。

| ID / slug | 中 / 英标题 | 行业 | 问题 → 实施 → 候选交付 | 可公开结果 / 下一步 | 事实/授权/素材/状态 | 截图方案 | 关联内容 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C01 `law-firm-bilingual-site` | 律所中英文官网与后台 / Bilingual Law Firm Website & Admin | 律师/专业服务 | 双语内容与权限边界 → 盘点/IA → 内容与后台边界草案 | 无结果；等范围和授权 | `TYPICAL_SCENARIO`; Phase3 `in-development` 候选；事实/授权/素材均 PENDING | 仅中性线框或概念图 | 网站门户、知识库、专业服务、I01/I03 |
| C02 `nonprofit-foundation-site` | 公益基金会官网 / Foundation Website | 公益 | 透明度与隐私平衡 → 内容分级 → IA 草案 | 无结果；等组织授权 | `TYPICAL_SCENARIO`; Phase3 `in-development`；全 PENDING | 中性信息架构图 | 网站门户、公益、I13 |
| C03 `furniture-inventory-lookup` | 外贸家具库存查询 / Export Furniture Inventory Lookup | 外贸 | 资料/库存口径分散 → 数据评估 → 查询流程草案 | 无结果；核验数据与接口 | `TYPICAL_SCENARIO`; Phase3 `concept`；全 PENDING | 概念界面，显著标签 | 业务系统、知识库、外贸、I04/I05 |
| C04 `agriculture-ocr-production` | 农牧 OCR 录单与生产管理 / Agriculture OCR Entry & Production Management | 农牧 | 现场录入与复盘断点 → 人工复核设计 → 试点范围草案 | 无结果；等数据/权限 | `TYPICAL_SCENARIO`; Phase3 `pilot`；全 PENDING | 概念流程图，非客户截图 | 业务系统、自动化、I16 |
| C05 `manufacturing-quality-trace` | 制造质量追溯场景 / Manufacturing Quality Traceability Scenario | 制造 | 批次信息分散 → 字段/角色梳理 → 原型 brief | 无结果；需事实 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念流程图 | 业务系统、制造、I01 |
| C06 `manufacturing-maintenance-knowledge` | 设备维护知识场景 / Equipment Maintenance Knowledge Scenario | 制造 | 维修资料难检索 → 来源/权限设计 → 证据卡方案 | 无结果；需事实 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念知识结构图 | 知识库、制造、I02 |
| C07 `export-quotation-workflow` | 外贸报价协同场景 / Export Quotation Workflow Scenario | 外贸 | 报价版本不一致 → 流程/复核 → 试点定义 | 无结果；需事实 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念工作流，非客户截图 | 自动化、外贸、I06 |
| C08 `professional-client-intake` | 专业服务客户咨询场景 / Professional Services Client Intake Scenario | 专业服务 | 公开咨询与保密边界 → 字段/权限 → 门户范围草案 | 无结果；需事实 | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图**，不显示表单成功 | 网站门户、专业服务、I03 |
| C09 `education-course-knowledge` | 教育课程知识场景 / Education Course Knowledge Scenario | 教育 | 课程资料口径不一 → 知识盘点 → 教师复核规则 | 无结果；需教育/隐私审核 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念信息架构图 | 知识库、教育、I17 |
| C10 `education-enquiry-site` | 教育咨询官网场景 / Education Enquiry Website Scenario | 教育 | 课程说明与咨询路径不清 → IA → 页面 brief | 无结果；需合规/CTA | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图** | 网站门户、教育、I18 |
| C11 `retail-product-education` | 零售产品教育场景 / Retail Product Education Scenario | 零售 | 产品说明分散 → 内容模型 → FAQ 方案 | 无结果；需产品事实 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念内容卡 | 内容运营、零售、I11 |
| C12 `retail-support-triage` | 零售客服分流场景 / Retail Support Triage Scenario | 零售 | 重复咨询 → FAQ/转人工 → 评测 brief | 无结果；需数据和渠道确认 | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图** | 知识库、零售、I12 |
| C13 `healthcare-public-content` | 医疗公开内容场景 / Healthcare Public Content Scenario | 医疗 | 科普、隐私与免责界线 → 内容分级 → 审校流程 | 无结果；需医疗/法务 Owner | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念内容流程图 | 网站门户、医疗、I19 |
| C14 `healthcare-appointment-boundary` | 医疗咨询边界场景 / Healthcare Inquiry Boundary Scenario | 医疗 | 预约/咨询不可误导 → 风险审查 → 信息入口 brief | 无结果；不得接真实预约 | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图** | 网站门户、医疗、I20 |
| C15 `public-service-information` | 公共服务信息发布场景 / Public-Service Information Scenario | 政府/公共服务 | 多渠道信息不一致 → 来源治理 → 发布流程 | 无结果；需主管授权 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念信息层级图 | 内容运营、公共服务、I21 |
| C16 `public-service-knowledge` | 公共服务知识检索场景 / Public-Service Knowledge Scenario | 政府/公共服务 | 政策问答来源不明 → 证据与人工复核 → 原型 brief | 无结果；需权威来源与安全评估 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念检索界面标签 | 知识库、公共服务、I22 |
| C17 `real-estate-project-showcase` | 房地产项目展示场景 / Real Estate Project Showcase Scenario | 房地产 | 项目资料/披露口径分散 → 内容清单 → IA brief | 无结果；需项目/法务授权 | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图** | 网站门户、房地产、I23 |
| C18 `real-estate-lead-routing` | 房地产咨询分流场景 / Real Estate Inquiry Routing Scenario | 房地产 | 线索来源不清 → 字段/归属设计 → 流程草案 | 无结果；无真实线索收集 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念流程图 | 自动化、房地产、I24 |
| C19 `financial-client-portal` | 金融客户资料入口场景 / Financial Client Material Portal Scenario | 金融 | 客户资料访问边界 → 权限设计 → 非生产原型 brief | 无结果；需合规/安全批准 | `CONCEPT_MOCKUP`; 新增；全 PENDING | **高保真概念界面 / 非客户上线截图** | 网站门户、金融、I25 |
| C20 `financial-policy-knowledge` | 金融制度知识场景 / Financial Policy Knowledge Scenario | 金融 | 制度版本难追溯 → 来源/版本/复核 → 方案草案 | 无结果；需合规批准 | `TYPICAL_SCENARIO`; 新增；全 PENDING | 概念证据链图 | 知识库、金融、I26 |

**统计：** 20 候选；`VERIFIED_ANONYMIZED_CASE=0`、`TYPICAL_SCENARIO=14`、`CONCEPT_MOCKUP=6`；现有 4 项仍保留 Phase 3 的 `in-development/in-development/concept/pilot` 候选状态，均非公开已验证案例。

## 4. 行业扩展（10 项）

| 行业 / slug | 来源 | 计划口径 | 允许的场景表达 | 禁止或前置门禁 |
| --- | --- | --- | --- | --- |
| 制造 `manufacturing` | 现有 `manufacturing-export` 方向拆分候选 | `GENERAL_CAPABILITY` | 资料、批次、质量、协同的典型问题 | 不称制造客户/成果；主数据、现场与系统接口确认。 |
| 律师/专业服务 `legal-professional-services` | 现有 `professional-services` | `GENERAL_CAPABILITY` | 双语公开内容、资料权限、咨询边界 | 不暗示具体律所；案件/客户资料不可公开。 |
| 外贸 `export-trade` | 现有 `manufacturing-export` 方向拆分候选 | `GENERAL_CAPABILITY` | 产品资料、报价、库存、多语内容 | 不写真实库存/订单/客户；接口需确认。 |
| 公益 `nonprofit` | 现有 `nonprofit-foundation` | `GENERAL_CAPABILITY` | 项目透明度、隐私、公众沟通 | 不公开受益人/捐赠数据；组织授权。 |
| 零售 `retail-consumer` | 现有 | `GENERAL_CAPABILITY` | 产品教育、FAQ、内容协同 | 不写增长、客户或渠道战绩。 |
| 教育 `education` | 新增 | `GENERAL_CAPABILITY` | 课程资料、咨询内容、教师复核 | 未确认时 `DO_NOT_CLAIM`；未成年人/隐私专项审查。 |
| 医疗 `healthcare` | 新增 | `DO_NOT_CLAIM` 默认 | 公开健康内容的来源与免责流程 | 不提供诊疗建议、预约、病历或效果承诺；医疗/法务确认。 |
| 政府/公共服务 `public-services` | 新增 | `DO_NOT_CLAIM` 默认 | 权威信息治理、发布与人工复核 | 不暗示政府合作、政策解释权或数据接入。 |
| 房地产 `real-estate` | 新增 | `GENERAL_CAPABILITY` | 项目资料、披露口径、咨询分流的通用方法 | 不使用项目/销售数据、合规或交易承诺。 |
| 金融 `financial-services` | 新增 | `DO_NOT_CLAIM` 默认 | 制度资料、权限、版本与审校方法 | 不提供投资/信贷建议、合规保证或客户入口。 |

## 5. Insights 100 篇规划清单（不是文章正文）

字段：`ID｜slug｜中/英标题｜意图｜角色｜关键词/实体｜集群｜关联服务/行业/案例｜证据｜优先级`。证据代码：`E1` Owner 确认服务边界；`E2` 可公开一手资料/客户授权；`E3` 法律/隐私/技术 Owner；`E4` 编辑来源清单与复审；`E0` 通用方法论，仍需编辑审校。所有文章中英共享同一 ID、来源、状态和链接，英文为自然 B2B 编辑，不逐字翻译。

| ID | slug | 中文 / English title | 意图 / 角色 | 关键词或实体 | 集群 | 服务 / 行业 / 案例 | 证据 | P |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I01 | manufacturing-traceability-start | 制造追溯系统从哪里开始 / Where to Start with Manufacturing Traceability | 信息/运营 | 批次、字段、角色 | 制造数字化 | 业务系统/制造/C05 | E0,E1 | P1 |
| I02 | maintenance-knowledge-base | 设备维护知识库如何设计 / Designing a Maintenance Knowledge Base | 信息/维护主管 | 手册、版本、权限 | 知识库 | 知识库/制造/C06 | E0,E1 | P1 |
| I03 | law-firm-website-confidentiality | 律所网站与资料权限边界 / Law Firm Website and Confidentiality Boundaries | 风险/合伙人 | 双语、权限、保密 | 专业服务 | 网站门户/律师/C01,C08 | E0,E3 | P1 |
| I04 | inventory-lookup-prerequisites | 库存查询系统前的五项核验 / Five Checks Before Inventory Lookup | 商业调查/运营 | 主数据、接口、更新 | 外贸系统 | 业务系统/外贸/C03 | E0,E1 | P1 |
| I05 | export-data-readiness | 外贸产品资料如何做好数据准备 / Export Product Data Readiness | 信息/业务 | SKU、报价、多语 | 外贸系统 | 业务系统/外贸/C03,C07 | E0,E1 | P1 |
| I06 | quotation-workflow-control | 外贸报价协同怎样避免版本混乱 / Controlling Export Quotation Versions | 信息/销售运营 | 版本、审批、复核 | 外贸系统 | 自动化/外贸/C07 | E0,E1 | P1 |
| I07 | custom-system-vs-saas | 定制系统和 SaaS 怎么选 / Custom System vs SaaS | 比较/决策者 | 流程、权限、维护 | 采购决策 | 业务系统/全行业/— | E0,E1 | P1 |
| I08 | ai-project-scope | AI 项目范围如何防止失控 / Preventing AI Scope Drift | 风险/管理层 | 范围、验收、试点 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P1 |
| I09 | knowledge-base-vs-drive | 知识库与网盘有什么区别 / Knowledge Base vs Shared Drive | 比较/运营 | 来源、检索、权限 | 知识库 | 知识库/全行业/— | E0,E1 | P1 |
| I10 | train-a-model-or-not | 企业需要训练自己的模型吗 / Does a Company Need to Train a Model | 决策/管理层 | 模型、评测、数据 | AI 决策 | 知识库,诊断/全行业/— | E0,E1,E3 | P1 |
| I11 | retail-product-education | 零售产品教育内容如何组织 / Retail Product Education Content | 信息/品牌 | FAQ、产品事实、渠道 | 内容运营 | 内容运营/零售/C11 | E0,E1 | P1 |
| I12 | ai-support-human-handoff | AI 客服何时转人工 / When AI Support Should Hand Off | 风险/客服负责人 | 禁说项、转人工、评测 | AI 助手 | 知识库/零售/C12 | E0,E1,E3 | P1 |
| I13 | nonprofit-transparency-privacy | 公益透明度与隐私如何平衡 / Nonprofit Transparency and Privacy | 风险/公益负责人 | 受益人、授权、公开范围 | 公益网站 | 网站门户/公益/C02 | E0,E2,E3 | P1 |
| I14 | seo-geo-buyer-questions | SEO/GEO 如何围绕采购问题写作 / SEO/GEO for Buyer Questions | 信息/市场 | 搜索意图、实体、内链 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P1 |
| I15 | b2b-content-evidence-workflow | B2B 内容事实审校怎么做 / Evidence Workflow for B2B Content | 信息/编辑 | 事实、来源、Owner | 内容治理 | 内容运营/全行业/— | E0,E1 | P1 |
| I16 | agriculture-ocr-pilot | 农牧 OCR 试点如何定义边界 / Scoping an Agriculture OCR Pilot | 风险/运营 | 纸单、复核、试点 | 生产数字化 | 业务系统,自动化/农牧/C04 | E0,E1,E3 | P1 |
| I17 | education-knowledge-governance | 教育资料知识库如何治理 / Governing Educational Knowledge Bases | 信息/教育运营 | 课程、版本、权限 | 教育场景 | 知识库/教育/C09 | E0,E3 | P1 |
| I18 | education-website-inquiry | 教育官网咨询路径怎么设计 / Designing Education Website Inquiry Paths | 信息/招生运营 | 课程、CTA、隐私 | 教育场景 | 网站门户/教育/C10 | E0,E3 | P1 |
| I19 | healthcare-public-content | 医疗公开内容的安全边界 / Safe Boundaries for Healthcare Public Content | 风险/医疗运营 | 免责声明、审校、隐私 | 医疗场景 | 网站门户/医疗/C13 | E0,E3 | P1 |
| I20 | healthcare-inquiry-boundary | 医疗咨询入口不能承诺什么 / What Healthcare Inquiry Pages Must Not Promise | 风险/合规 | 预约、诊疗、隐私 | 医疗场景 | 网站门户/医疗/C14 | E0,E3 | P1 |
| I21 | public-service-content-governance | 公共服务信息如何统一口径 / Governing Public-Service Information | 信息/公共服务 | 权威来源、发布、版本 | 公共服务 | 内容运营/公共服务/C15 | E0,E3 | P2 |
| I22 | public-service-ai-review | 公共服务 AI 问答为何必须人工复核 / Why Public-Service AI Needs Human Review | 风险/负责人 | 政策、来源、复核 | 公共服务 | 知识库/公共服务/C16 | E0,E3 | P2 |
| I23 | real-estate-content-disclosure | 房地产项目内容如何做披露治理 / Governing Real-Estate Project Content | 信息/市场 | 项目资料、披露、审核 | 房地产 | 网站门户/房地产/C17 | E0,E3 | P2 |
| I24 | real-estate-lead-ownership | 房地产咨询线索如何明确归属 / Defining Real-Estate Inquiry Ownership | 信息/运营 | 线索、CRM、隐私 | 房地产 | 自动化/房地产/C18 | E0,E1,E3 | P2 |
| I25 | financial-portal-boundary | 金融资料入口的权限边界 / Permission Boundaries for Financial Portals | 风险/合规 | 权限、会话、隔离 | 金融场景 | 网站门户/金融/C19 | E0,E3 | P2 |
| I26 | financial-knowledge-versioning | 金融制度知识如何做版本治理 / Versioning Financial Knowledge | 信息/合规 | 制度、版本、审校 | 金融场景 | 知识库/金融/C20 | E0,E3 | P2 |
| I27 | website-vs-portal | 企业网站与数字化门户有什么区别 / Website vs Digital Portal | 比较/决策者 | 公开、邀请、权限 | 网站门户 | 网站门户/全行业/— | E0,E1 | P2 |
| I28 | bilingual-site-governance | 双语官网如何保持事实一致 / Keeping Bilingual Site Facts Consistent | 信息/编辑 | hreflang、事实 ID、审校 | 网站门户 | 网站门户/律师/— | E0,E1 | P2 |
| I29 | portal-noindex-decision | 受邀客户入口何时应 noindex / When an Invited Portal Should Be Noindex | 风险/技术 | noindex、登录、sitemap | 网站门户 | 网站门户/全行业/— | E0,E3 | P2 |
| I30 | b2b-website-content-model | B2B 官网内容模型怎么建 / Building a B2B Website Content Model | 信息/市场 | Service、FAQ、Case、Proof | 内容治理 | 网站门户,内容运营/全行业/— | E0,E1 | P2 |
| I31 | workflow-automation-readiness | 自动化前要核验什么 / Automation Readiness Checklist | 商业调查/运营 | 权限、异常、人工复核 | 自动化 | 自动化/全行业/— | E0,E1,E3 | P2 |
| I32 | workflow-exception-design | 自动化异常如何设计人工兜底 / Designing Human Fallbacks for Automation | 信息/运营 | 异常、日志、回退 | 自动化 | 自动化/全行业/— | E0,E1 | P2 |
| I33 | api-integration-discovery | API 对接前的发现问题清单 / API Integration Discovery Checklist | 信息/技术 | 认证、限流、版本 | 自动化 | 业务系统,自动化/全行业/— | E0,E1,E3 | P2 |
| I34 | data-migration-boundary | 数据迁移为什么应单独评估 / Why Data Migration Needs Separate Scope | 风险/决策者 | 清洗、映射、回滚 | 业务系统 | 业务系统/制造,外贸/— | E0,E1,E3 | P2 |
| I35 | roles-permissions-matrix | 项目角色权限矩阵怎么做 / Designing a Roles and Permissions Matrix | 信息/业务 | RBAC、审计、最小权限 | 业务系统 | 业务系统,门户/全行业/— | E0,E3 | P2 |
| I36 | dashboard-metrics-boundary | 数据看板先定义什么 / What to Define Before a Dashboard | 信息/管理者 | 指标、来源、口径 | 业务系统 | 业务系统/制造,零售/— | E0,E1 | P2 |
| I37 | ai-knowledge-source-register | AI 知识来源台账怎么建 / Building an AI Knowledge Source Register | 信息/知识 Owner | 来源、授权、复审 | 知识库 | 知识库/全行业/— | E0,E1,E3 | P2 |
| I38 | answer-evaluation-set | AI 问答评测集如何开始 / Starting an AI Answer Evaluation Set | 信息/运营 | 测试题、事实、拒答 | 知识库 | 知识库/全行业/— | E0,E1,E3 | P2 |
| I39 | ai-data-access | AI 项目如何定义数据访问 / Defining Data Access for AI Projects | 风险/安全 | 数据、角色、保留 | 知识库 | 知识库/全行业/— | E0,E3 | P2 |
| I40 | human-review-rules | AI 输出人工复核规则 / Human Review Rules for AI Output | 信息/业务 | 阈值、升级、记录 | 知识库,自动化 | 知识库,自动化/全行业/— | E0,E1,E3 | P2 |
| I41 | content-cluster-planning | B2B 内容主题集群怎么规划 / Planning B2B Topic Clusters | 信息/市场 | 支柱、子文、内链 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P2 |
| I42 | thin-content-prevention | 如何避免薄内容和关键词蚕食 / Avoiding Thin Content and Cannibalization | 信息/SEO | 意图、canonical、合并 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P2 |
| I43 | schema-for-b2b-content | B2B 内容适合哪些 Schema / Schema for B2B Content | 信息/技术SEO | Article、FAQ、Breadcrumb | SEO/GEO | 内容运营/全行业/— | E0,E1,E3 | P2 |
| I44 | canonical-alternates-bilingual | 双语 canonical 与 alternates 怎么配 / Bilingual Canonical and Alternates | 信息/技术SEO | canonical、hreflang、x-default | SEO/GEO | 网站门户/全行业/— | E0,E1 | P2 |
| I45 | llms-txt-facts | llms.txt 应该写什么事实 / What Facts Belong in llms.txt | 信息/编辑 | llms.txt、更新、实体 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P3 |
| I46 | faq-information-architecture | FAQ 如何服务采购决策 / FAQ Information Architecture for Buyers | 信息/市场 | FAQ、决策、内链 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P3 |
| I47 | contact-cta-readiness | B2B CTA 上线前要确认什么 / CTA Readiness Before Launch | 风险/市场 | 收件人、隐私、失败反馈 | 转化治理 | 网站门户/全行业/— | E0,E1,E3 | P3 |
| I48 | crm-lead-data-boundary | CRM 线索字段与隐私边界 / CRM Lead Fields and Privacy | 风险/运营 | CRM、保留、权限 | 转化治理 | 网站门户/全行业/— | E0,E3 | P3 |
| I49 | content-approval-raci | 内容审校 RACI 如何设定 / Setting Content Approval RACI | 信息/管理层 | Owner、编辑、法务 | 内容治理 | 内容运营/全行业/— | E0,E1 | P3 |
| I50 | asset-rights-register | 网站素材授权台账怎么维护 / Maintaining an Asset Rights Register | 信息/编辑 | 版权、alt、期限 | 内容治理 | 网站门户/全行业/— | E0,E2,E3 | P3 |
| I51 | implementation-discovery | 实施前的需求访谈框架 / Implementation Discovery Framework | 信息/管理层 | 目标、角色、风险 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P3 |
| I52 | acceptance-criteria | 如何写可验收的交付标准 / Writing Testable Acceptance Criteria | 信息/项目 Owner | 验收、范围、测试 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P3 |
| I53 | prototype-vs-production | Demo、原型与上线有什么区别 / Demo vs Prototype vs Production | 比较/决策者 | Mock、生产、验收 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P3 |
| I54 | maintenance-boundary | 网站与系统维护边界怎么写 / Defining Maintenance Boundaries | 信息/采购 | 维护、新需求、费用 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P3 |
| I55 | deployment-readiness | 上线前的受控发布清单 / Controlled Release Readiness | 信息/技术 Owner | site.yaml、SHA、验证 | 实施方法 | 网站门户,业务系统/全行业/— | E0,E3 | P3 |
| I56 | client-server-scope | 客户服务器与托管如何界定 / Defining Client Server and Hosting Scope | 信息/采购 | 服务器、责任、成本 | 实施方法 | 网站门户,业务系统/全行业/— | E0,E1,E3 | P3 |
| I57 | source-code-delivery | 源码交付应在何时约定 / When to Agree Source-Code Delivery | 商业调查/采购 | 源码、许可、维护 | 实施方法 | 诊断咨询/全行业/— | E0,E1,E3 | P3 |
| I58 | third-party-costs | 第三方与模型费用如何边界化 / Scoping Third-Party and Model Costs | 商业调查/采购 | API、模型、云服务 | 实施方法 | 全服务/全行业/— | E0,E1,E3 | P3 |
| I59 | website-seo-baseline | 官网 SEO 基线检查表 / Website SEO Baseline Checklist | 信息/市场 | title、H1、sitemap | SEO/GEO | 网站门户/全行业/— | E0,E1 | P3 |
| I60 | geo-content-baseline | GEO 内容基线检查表 / GEO Content Baseline Checklist | 信息/市场 | 实体、引用、FAQ | SEO/GEO | 内容运营/全行业/— | E0,E1 | P3 |
| I61 | manufacturing-data-owner | 制造数据 Owner 如何确定 / Defining Manufacturing Data Ownership | 信息/运营 | 数据 Owner、变更、质量 | 制造数字化 | 业务系统/制造/C05 | E0,E1 | P3 |
| I62 | manufacturing-pilot-selection | 制造数字化试点怎么选 / Selecting a Manufacturing Pilot | 决策/管理层 | 场景、风险、验收 | 制造数字化 | 诊断咨询/制造/C05,C06 | E0,E1 | P3 |
| I63 | export-multilingual-content | 外贸多语内容的事实控制 / Fact Control for Export Multilingual Content | 信息/市场 | 翻译、事实、审校 | 外贸系统 | 内容运营/外贸/C03,C07 | E0,E1 | P3 |
| I64 | export-inventory-permissions | 库存查询权限怎么设计 / Inventory Lookup Permissions | 信息/运营 | 客户、库存、角色 | 外贸系统 | 业务系统/外贸/C03 | E0,E1,E3 | P3 |
| I65 | legal-content-approval | 律所内容发布如何审校 / Reviewing Law-Firm Content for Publication | 风险/合伙人 | 律师、案件、授权 | 专业服务 | 内容运营/律师/C01,C08 | E0,E2,E3 | P3 |
| I66 | professional-services-portal | 专业服务门户为什么先做边界 / Why Professional Portals Start with Boundaries | 信息/管理者 | 邀请、权限、资料 | 专业服务 | 网站门户/律师/C08 | E0,E3 | P3 |
| I67 | retail-content-ops | 零售内容运营如何避免口径漂移 / Preventing Message Drift in Retail Content | 信息/品牌 | 产品事实、审校、复盘 | 零售内容 | 内容运营/零售/C11 | E0,E1 | P3 |
| I68 | retail-faq-maintenance | 零售 FAQ 如何持续维护 / Maintaining Retail FAQs | 信息/客服 | FAQ、版本、反馈 | 零售内容 | 内容运营,知识库/零售/C12 | E0,E1 | P3 |
| I69 | nonprofit-content-consent | 公益内容中的同意与授权 / Consent and Permission in Nonprofit Content | 风险/公益负责人 | 肖像、受益人、授权 | 公益网站 | 网站门户/公益/C02 | E0,E2,E3 | P3 |
| I70 | nonprofit-impact-claims | 公益影响力表述如何避免夸大 / Avoiding Overstated Nonprofit Impact Claims | 风险/编辑 | 指标、证据、披露 | 公益网站 | 内容运营/公益/C02 | E0,E2,E3 | P3 |
| I71 | education-content-privacy | 教育内容与学生隐私 / Educational Content and Student Privacy | 风险/教育运营 | 学生、照片、资料 | 教育场景 | 网站门户/教育/C09,C10 | E0,E3 | P3 |
| I72 | education-faq-governance | 教育 FAQ 如何做版本管理 / Versioning Education FAQs | 信息/教育运营 | 课程、费用、政策 | 教育场景 | 内容运营/教育/C09 | E0,E1,E3 | P3 |
| I73 | healthcare-disclaimer | 医疗公开内容的免责声明治理 / Governing Healthcare Disclaimers | 风险/医疗 Owner | 医疗、免责声明、审校 | 医疗场景 | 网站门户/医疗/C13,C14 | E0,E3 | P3 |
| I74 | healthcare-content-sources | 医疗内容来源如何标注 / Citing Healthcare Content Sources | 信息/编辑 | 来源、日期、审校 | 医疗场景 | 内容运营/医疗/C13 | E0,E3 | P3 |
| I75 | public-service-accessibility | 公共服务内容的可访问性 / Accessibility for Public-Service Content | 信息/公共服务 | 可访问性、语言、结构 | 公共服务 | 网站门户/公共服务/C15 | E0,E3 | P3 |
| I76 | public-service-change-log | 公共信息变更记录怎么做 / Managing Public Information Change Logs | 信息/公共服务 | 版本、来源、公告 | 公共服务 | 内容运营/公共服务/C15,C16 | E0,E3 | P3 |
| I77 | real-estate-content-approval | 房地产展示内容的审批边界 / Approval Boundaries for Real-Estate Content | 风险/市场 | 披露、图片、价格 | 房地产 | 网站门户/房地产/C17 | E0,E3 | P3 |
| I78 | real-estate-crm-readiness | 房地产 CRM 接入前的线索准备 / Lead Readiness Before Real-Estate CRM | 信息/运营 | CRM、同意、归属 | 房地产 | 自动化/房地产/C18 | E0,E1,E3 | P3 |
| I79 | financial-content-risk | 金融内容为什么需要风险审校 / Why Financial Content Needs Risk Review | 风险/合规 | 金融、声明、审校 | 金融场景 | 内容运营/金融/C19,C20 | E0,E3 | P3 |
| I80 | financial-access-control | 金融资料访问控制的起点 / Starting Financial Material Access Control | 信息/合规 | 最小权限、审计、隔离 | 金融场景 | 知识库,门户/金融/C19,C20 | E0,E3 | P3 |
| I81 | product-naming-gate | 何时可以把服务命名为产品 / When a Service Can Be Named a Product | 决策/管理层 | 产品、商标、支持 | 产品治理 | 诊断咨询/全行业/— | E0,E1,E3 | P4 |
| I82 | product-pricing-gate | 产品定价页上线前的门槛 / Gates Before a Product Pricing Page | 风险/商业 Owner | 定价、合同、支持 | 产品治理 | 诊断咨询/全行业/— | E0,E1,E3 | P4 |
| I83 | api-platform-public-readiness | API 平台何时可以公开 / When an API Platform Is Ready to Be Public | 风险/技术 Owner | API、SLA、计费 | 产品治理 | API 平台/—/— | E3 | P4 |
| I84 | portal-public-readiness | 客户工作区何时可以公开 / When a Client Portal Is Ready to Be Public | 风险/技术 Owner | 登录、会话、隔离 | 产品治理 | Portal/—/— | E3 | P4 |
| I85 | service-packaging | 服务如何从方法包装成可采购范围 / Packaging Services into Purchasable Scope | 商业调查/采购 | SOW、交付、非范围 | 产品治理 | 全服务/全行业/— | E0,E1 | P4 |
| I86 | buyer-journey-content | B2B 买方旅程如何映射内容 / Mapping Content to a B2B Buyer Journey | 信息/市场 | 认知、比较、决策 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P4 |
| I87 | internal-linking-rules | B2B 内链如何避免硬塞关键词 / Internal Linking Without Keyword Stuffing | 信息/SEO | 语义、锚文本、路径 | SEO/GEO | 内容运营/全行业/— | E0,E1 | P4 |
| I88 | content-refresh-policy | 内容何时需要复审与更新 / When Content Needs Review and Refresh | 信息/编辑 | 更新、证据、过期 | 内容治理 | 内容运营/全行业/— | E0,E1 | P4 |
| I89 | case-study-authorization | 匿名案例公开前需要什么授权 / Authorization Before Publishing an Anonymous Case | 风险/客户 Owner | 客户、脱敏、结果 | 内容治理 | 全服务/全行业/所有 C | E2,E3 | P4 |
| I90 | concept-mockup-labeling | 概念界面怎样避免被误认为客户成果 / Labeling Concept Mockups Safely | 风险/编辑 | 概念、截图、标签 | 内容治理 | 网站门户/全行业/C10,C12,C14,C17,C19 | E0,E2,E3 | P4 |
| I91 | content-localization-governance | 中英文内容如何共用事实 ID / Shared Fact IDs for Localization | 信息/编辑 | 翻译、事实、状态 | 内容治理 | 内容运营/全行业/— | E0,E1 | P4 |
| I92 | b2b-proof-hierarchy | B2B 网站的证据层级怎么排 / Building a B2B Proof Hierarchy | 信息/市场 | 事实、案例、方法 | 内容治理 | 内容运营/全行业/— | E0,E1,E2 | P4 |
| I93 | responsible-ai-marketing | AI 营销文案如何避免虚假承诺 / Avoiding False Promises in AI Marketing | 风险/市场 | ROI、准确率、保证 | 内容治理 | 内容运营/全行业/— | E0,E1,E3 | P4 |
| I94 | implementation-risk-register | 数字化项目风险台账怎么建 / Building an Implementation Risk Register | 信息/项目 Owner | 风险、Owner、退出 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P4 |
| I95 | procurement-question-library | 采购问题库如何支持销售与交付 / Using a Buyer Question Library | 信息/市场 | 采购、FAQ、Sales | 内容运营 | 内容运营,诊断/全行业/— | E0,E1 | P4 |
| I96 | site-identity-release | 网站身份与发布契约为什么重要 / Why Site Identity and Release Contracts Matter | 信息/技术 Owner | site.yaml、SHA、环境 | 实施方法 | 网站门户/全行业/— | E0,E3 | P4 |
| I97 | static-site-action-boundary | 静态站为何不应假装可提交 / Why Static Sites Must Not Fake Actions | 风险/技术 | 表单、登录、后端 | 实施方法 | 网站门户/全行业/— | E0,E3 | P4 |
| I98 | accessibility-b2b-basics | B2B 官网可访问性基础 / B2B Website Accessibility Basics | 信息/市场 | 键盘、对比、alt | SEO/GEO | 网站门户/全行业/— | E0,E1 | P4 |
| I99 | privacy-data-inventory | 内容项目如何盘点隐私数据 / Inventorying Privacy Data for Content Projects | 风险/Owner | 表单、Cookie、保留 | 实施方法 | 网站门户,内容运营/全行业/— | E0,E3 | P4 |
| I100 | choose-not-to-build | 何时应该选择暂不开发 / When Not Building Is the Right Decision | 决策/管理层 | 不做、成本、风险 | 实施方法 | 诊断咨询/全行业/— | E0,E1 | P4 |

### 5.1 前 20 篇详细 brief

| ID | 问题 / 决策 | 提纲（非正文） | 证据 | CTA | Schema / 内链 |
| --- | --- | --- | --- | --- | --- |
| I01 | 追溯先做哪里；是否可定义可验收试点 | 业务触发→最小批次字段→角色→验收→不做 | E0,E1 | 范围澄清 | `Article`,`BreadcrumbList`; 制造页、业务系统、C05、FAQ-系统01 |
| I02 | 维修知识为何找不到；是否先治理资料 | 来源→版本→权限→检索→人工更新 | E0,E1 | 资料盘点 | `Article`; 制造页、知识库、C06、FAQ-知识01 |
| I03 | 律所公开与保密如何分界 | 页面分层→资料权限→双语一致→审校→禁说项 | E0,E3 | 风险诊断 | `Article`; 专业服务、网站门户、C01/C08、FAQ-部署02 |
| I04 | 库存查询能否开始 | 主数据→更新频率→接口→权限→退出条件 | E0,E1 | 数据准备评估 | `Article`; 外贸、业务系统、C03、FAQ-系统02 |
| I05 | 外贸资料怎样可用 | SKU/属性→报价口径→多语→Owner→样本 | E0,E1 | 资料盘点 | `Article`; 外贸、业务系统、C03/C07, FAQ-内容01 |
| I06 | 报价协作怎样可控 | 版本源→审批→例外→审计→试点 | E0,E1 | 流程评估 | `Article`; 外贸、自动化、C07、FAQ-API01 |
| I07 | SaaS 与定制怎样决策 | 标准程度→流程差异→数据/权限→维护→采购表 | E0,E1 | 诊断咨询 | `Article`,`FAQPage`（仅核准 QA）; 业务系统、FAQ-系统03 |
| I08 | 如何停止 AI 项目失控 | 问题→范围→非范围→证据→验收→退出 | E0,E1 | 范围澄清 | `Article`; 诊断咨询、交付流程、FAQ-周期01 |
| I09 | 网盘不能解决什么 | 存储/来源→结构→权限→检索→更新责任 | E0,E1 | 资料盘点 | `Article`; 知识库、FAQ-知识01、I37 |
| I10 | 是否训练模型 | 任务→资料→评测→模型选择→不训练替代 | E0,E1,E3 | 风险评估 | `Article`; 知识库、诊断咨询、FAQ-模型01 |
| I11 | 产品教育怎么一致 | 产品事实→问题库→FAQ→渠道→复审 | E0,E1 | 内容范围评估 | `Article`; 零售、内容运营、C11、FAQ-SEO01 |
| I12 | 何时转人工 | 可答/不可答→证据→升级→记录→回归 | E0,E1,E3 | 资料与规则评估 | `Article`; 零售、知识库、C12、FAQ-AI02 |
| I13 | 透明与隐私怎么权衡 | 公开目的→数据分类→同意→脱敏→撤回 | E0,E2,E3 | 内容边界评估 | `Article`; 公益、网站门户、C02、FAQ-部署03 |
| I14 | SEO/GEO 怎样围绕真实问题 | 意图→实体→问题→证据→内链→复测 | E0,E1 | 内容审校 | `Article`; 内容运营、FAQ-SEO01、I41/I60 |
| I15 | 如何管理事实审校 | 事实卡→来源→Owner→双语→过期→下线 | E0,E1 | 内容治理评估 | `Article`; 内容运营、FAQ-内容02、I49/I88 |
| I16 | OCR 试点如何安全 | 单据→人工复核→失败→权限→验收→不上线 | E0,E1,E3 | 试点范围澄清 | `Article`; 农牧、业务系统/自动化、C04、FAQ-AI03 |
| I17 | 教育知识如何治理 | 资料范围→角色→版本→审校→隐私 | E0,E3 | 资料治理评估 | `Article`; 教育、知识库、C09、FAQ-知识03 |
| I18 | 教育咨询路径怎么不误导 | 课程事实→CTA→隐私→失败反馈→人工响应 | E0,E3 | 联系路径评估 | `Article`; 教育、网站门户、C10、FAQ-网站02 |
| I19 | 医疗公开内容底线 | 用途→来源→免责声明→审校→禁止诊疗 | E0,E3 | 内容风险评估 | `Article`; 医疗、网站门户、C13、FAQ-内容03 |
| I20 | 医疗入口不能说什么 | 信息/预约区分→数据最小化→人工→审查 | E0,E3 | 风险评估 | `Article`; 医疗、网站门户、C14、FAQ-网站03 |

## 6. 八步交付流程扩展（建议方法，不是固定周期或范围承诺）

| 步骤 | 客户输入 | OVOPS 动作 | 输出 | 验收 | 风险/停止条件 |
| --- | --- | --- | --- | --- | --- |
| 1. 咨询 | 目标、现状、约束、决策人 | 判断问题是否可定义，提出澄清问题 | 沟通纪要/问题清单 | 具名确认问题表述 | 不构成报价、承诺或接单。 |
| 2. 需求分析 | 流程、资料样本、角色、风险 | 盘点痛点、数据、权限和依赖 | 优先级/风险/资料缺口图 | Owner 确认优先级 | 资料不足或敏感责任不清则停止。 |
| 3. Demo | 代表资料与反馈 | 仅建立可评审 Mock/概念范围 | Demo/原型与边界说明 | 场景、非范围和成功标准确认 | Demo 不等于生产、上线或系统可用。 |
| 4. 开发 | 已确认范围、内容、测试人 | 按 SOW 实施并记录变更 | 版本、变更与测试记录 | 功能按验收项验证 | 新接口/权限/数据迁移是新范围。 |
| 5. 测试 | 测试账号/样本/验收人 | 测试功能、错误、权限和回归 | 测试清单/缺陷清单 | 约定测试通过或列明待办 | 不以删测试或假数据通过。 |
| 6. 上线 | 上线窗口、环境、培训人员 | 受控打包/验证/发布与交接 | 发布记录、回滚点、培训材料 | 用户侧浏览器检查 | 需单独授权；预览不等于生产。 |
| 7. 培训 | 使用角色、场景、问题 | 演示已交付功能与禁止操作 | 培训记录/操作说明 | 指定人员确认理解 | 不替代长期支持或业务培训。 |
| 8. 维护 | 验收人、缺陷、变更请求 | 复盘、bug 边界与变更评估 | 验收记录、维护边界、待办 | 签收或明确开放项 | 新功能、迁移、第三方费用另行评估。 |

## 7. 为什么选择 OVOPS：优势矩阵（不把待确认项写成卖点）

| 候选优势 | 当前状态 | 可以表达的最小口径 | 需要什么才可升级 |
| --- | --- | --- | --- |
| 先范围、风险与验收，再实施 | `CONFIRMED`（当前方法文档/流程） | “规划采用范围、非范围、风险与验收的受控方法。” | Owner 确认此为长期对外方法。 |
| 内容事实、授权与双语同源控制 | `CONFIRMED`（Phase 3 代码/审校记录） | “公开内容需通过事实与授权门禁。” | 公开方法说明的 Owner 批准。 |
| 服务可覆盖网站、系统、知识与自动化 | `PENDING` | 不作“全栈/一体化能力”卖点；仅列待评估服务方向。 | 每项真实交付范围与 Owner。 |
| 行业经验/深耕 | `DO_NOT_CLAIM` | 不展示“深耕/领先/行业专家”。 | 可公开项目证据与授权。 |
| 可量化 ROI/降本/增长 | `DO_NOT_CLAIM` | 不展示百分比、数量或结果。 | 指标定义、来源、客户授权、复核。 |
| 私有部署、源码交付、客户服务器 | `PENDING` | “按项目范围、技术与合同确认。” | 技术/商业/合同确认。 |
| API 平台、模型能力、SLA | `DO_NOT_CLAIM` | API 页继续 noindex、无产品承诺。 | API 事实表全部通过。 |
| 客户工作区/安全能力 | `DO_NOT_CLAIM` | Portal 继续 noindex、无登录/数据/安全承诺。 | Portal 认证、隔离、安全和可公开范围通过。 |

## 8. FAQ 规划（50 项；仅答复要点，不生成最终长答案）

| ID | 分类 / 问题 | 目标页 | 答复要点 | 事实依赖 | 内链 |
| --- | --- | --- | --- | --- |
| FAQ-预算01 | 预算 / 报价如何形成？ | FAQ,诊断 | 范围、风险、协作、维护分别评估 | 服务承诺 E1 | 诊断,I08 |
| FAQ-预算02 | 预算 / 第三方费用是否包含？ | FAQ,服务 | 云/API/模型等须单列确认 | 商业/技术 E1,E3 | I58,服务页 |
| FAQ-预算03 | 预算 / 能否先做小范围？ | FAQ,诊断 | 可先界定试点，不保证实施 | Owner E1 | I62,I100 |
| FAQ-周期01 | 周期 / 周期怎样评估？ | FAQ,流程 | 取决范围、资料、接口、测试和环境 | 服务 E1 | I08,流程 |
| FAQ-周期02 | 周期 / 为什么不能先报固定天数？ | FAQ,诊断 | 未确认依赖不可承诺 | 商业 E1 | I52 |
| FAQ-周期03 | 周期 / 变更如何影响排期？ | FAQ,流程 | 记录变更，重新评估范围/费用 | SOW E1 | I54 |
| FAQ-源码01 | 源码 / 是否交付源码？ | FAQ,服务 | 归属、许可、仓库和维护按合同 | 商业/法务 E1,E3 | I57 |
| FAQ-源码02 | 源码 / 能否在客户仓库协作？ | FAQ,服务 | 需权限、分支、审查和发布契约 | 技术 E3 | I55,I96 |
| FAQ-部署01 | 部署 / 是否可部署到客户服务器？ | FAQ,服务 | 环境、权限、运维和成本须确认 | 技术/商业 E1,E3 | I56 |
| FAQ-部署02 | 部署 / 预览与正式上线有什么区别？ | FAQ,流程 | 授权、环境、验证与验收分离 | 技术 E3 | I53,I55 |
| FAQ-部署03 | 部署 / 数据与隐私如何处理？ | FAQ,服务 | 最小数据、角色、保留、第三方先确认 | Privacy E3 | I39,I99 |
| FAQ-AI01 | AI / 需要训练自己的模型吗？ | FAQ,知识库 | 先看任务、资料、权限和评测 | 技术 E1,E3 | I10 |
| FAQ-AI02 | AI / AI 客服为何需要转人工？ | FAQ,知识库 | 禁说项、升级规则、记录与复测 | Owner/安全 E1,E3 | I12,I40 |
| FAQ-AI03 | AI / OCR 或自动化能否直接上线？ | FAQ,自动化 | 先试点、复核、异常与权限 | 技术 E1,E3 | I16,I31 |
| FAQ-模型01 | 模型 / 可以承诺哪些模型能力？ | FAQ,知识库 | 未确认模型、地区、费用不得承诺 | API/技术 E3 | I10,I83 |
| FAQ-模型02 | 模型 / 模型费用和限流如何处理？ | FAQ,服务 | 合同/平台条款与用量确认 | 技术/商业 E1,E3 | I58 |
| FAQ-服务器01 | 服务器 / 谁负责服务器和域名？ | FAQ,流程 | Owner、费用、环境和权限明示 | 商业/技术 E1,E3 | I56,I96 |
| FAQ-服务器02 | 服务器 / 上线如何回滚？ | FAQ,流程 | 受控发布、备份、回滚点按项目 | 技术 E3 | I55 |
| FAQ-维护01 | 维护 / 基础维护包括什么？ | FAQ,服务 | 已交付 bug 与说明，边界写入合同 | 商业 E1 | I54 |
| FAQ-维护02 | 维护 / 新功能如何处理？ | FAQ,服务 | 作为变更请求重新评估 | 商业 E1 | I52,I54 |
| FAQ-SEO01 | SEO/GEO / 如何衡量 SEO/GEO？ | FAQ,内容 | 索引、问题、质量、技术与复测；不保证排名 | Editor E1 | I14,I59,I60 |
| FAQ-SEO02 | SEO/GEO / 会保证流量或排名吗？ | FAQ,内容 | 不保证；仅约定工作与复测口径 | 商业 E1 | I93 |
| FAQ-SEO03 | SEO/GEO / 为什么需要持续内容更新？ | FAQ,内容 | 事实、意图、链接和复审会变化 | Editor E1 | I88 |
| FAQ-CRM01 | CRM / 能否直接接 CRM？ | FAQ,服务 | 先确认系统、字段、同意、权限和失败处理 | 技术/Privacy E3 | I48,I78 |
| FAQ-CRM02 | CRM / 线索由谁跟进？ | FAQ,联系 | 指定 Owner、渠道、响应与保留规则 | Owner/Privacy E1,E3 | I47,I48 |
| FAQ-知识01 | 知识库 / 知识库与网盘有何不同？ | FAQ,知识库 | 来源、结构、权限、检索和更新 | Owner E1 | I09 |
| FAQ-知识02 | 知识库 / 知识来源谁负责？ | FAQ,知识库 | 内容 Owner 与复审日必须存在 | Owner E1 | I37,I49 |
| FAQ-知识03 | 知识库 / 资料过期怎么办？ | FAQ,知识库 | 版本、复审、下线和回归 | Owner E1 | I88 |
| FAQ-网站01 | 网站 / 企业网站适合解决什么？ | FAQ,网站门户 | 公开信息、内容、咨询路径；实际范围确认 | 服务 E1 | I27,I30 |
| FAQ-网站02 | 网站 / 网站和门户有何区别？ | FAQ,网站门户 | 公开与邀请、权限/数据不同 | 技术 E1,E3 | I27,I29 |
| FAQ-网站03 | 网站 / 静态站能否提供真实表单或登录？ | FAQ,网站门户 | 无后端不得假装动作；另立范围 | 技术 E3 | I97 |
| FAQ-后台01 | 后台 / 是否需要后台？ | FAQ,网站门户 | 取决内容频率、角色、权限、审核 | 服务/技术 E1,E3 | I30,I35 |
| FAQ-后台02 | 后台 / 谁能编辑或发布？ | FAQ,系统 | 最小权限、角色与审计先定义 | 技术 E3 | I35 |
| FAQ-API01 | API / API 对接前需要什么？ | FAQ,自动化 | 文档、认证、限流、Owner、错误与测试 | 技术 E3 | I33 |
| FAQ-API02 | API / API 平台是否已可购买？ | FAQ,API | 当前不作购买/模型/SLA承诺 | API Owner E3 | I83 |
| FAQ-范围01 | 范围 / 什么团队适合开始？ | FAQ,诊断 | 明确问题、资料、Owner与边界 | Owner E1 | I51 |
| FAQ-范围02 | 范围 / 首次沟通要准备什么？ | FAQ,诊断 | 目标、流程、样本、角色、约束 | Owner E1 | I51 |
| FAQ-系统01 | 系统 / 如何定义一个可验收试点？ | FAQ,系统 | 问题、最小流程、数据、验收和退出 | Owner E1 | I01,I62 |
| FAQ-系统02 | 系统 / 库存生产系统如何接入？ | FAQ,系统 | 主数据、接口、频率、人工纠错 | 技术 E1,E3 | I04,I34 |
| FAQ-系统03 | 系统 / 定制系统和 SaaS 怎么选？ | FAQ,系统 | 标准需求、差异、维护与风险 | Owner E1 | I07 |
| FAQ-内容01 | 内容 / 双语内容如何避免不一致？ | FAQ,内容 | 同 ID、同证据、同状态、分别编辑 | Editor E1 | I28,I91 |
| FAQ-内容02 | 内容 / 谁审核公开内容？ | FAQ,内容 | Business/Legal/Technical Owner 按事实分工 | Owner E1,E3 | I15,I49 |
| FAQ-内容03 | 内容 / 概念图能否当案例截图？ | FAQ,案例 | 仅标概念，显著非客户上线标签 | Asset/Client E2,E3 | I90 |
| FAQ-案例01 | 案例 / 什么条件才能公开匿名案例？ | FAQ,案例 | 真实项目、来源、客户与 Owner 授权、脱敏 | Client/Legal E2,E3 | I89 |
| FAQ-案例02 | 案例 / 能否公开客户 Logo 或评价？ | FAQ,案例 | 未书面授权一律不公开 | Client/Legal E2,E3 | I89 |
| FAQ-行业01 | 行业 / 是否已深耕某个行业？ | FAQ,行业 | 当前不作深耕/领先表述；仅典型场景 | Business Owner E1 | 行业矩阵 |
| FAQ-行业02 | 行业 / 高监管行业能否直接上线？ | FAQ,行业 | 医疗/金融/公共服务默认专项审查 | Legal/Technical E3 | I19,I25 |
| FAQ-产品01 | 产品 / OV Site 等名称能否购买？ | FAQ,产品 | 未建/未定价/未支持不可发布为产品 | Business/Legal E1,E3 | I81,I82 |
| FAQ-产品02 | 产品 / Portal 是否可供客户登录？ | FAQ,Portal | 当前 noindex、无登录；等待系统事实 | Technical E3 | I84 |
| FAQ-安全01 | 安全 / 为什么不能先公开安全能力？ | FAQ,服务 | 认证、权限、日志、存储、责任和测试均须有真实证据 | Technical/Security E3 | I35,I84 |

**统计：** 50 项，覆盖预算、周期、源码、部署、AI、模型、服务器、维护、SEO/GEO、CRM、知识库、网站、后台、API，另含范围、内容、案例、行业、产品/Portal 与安全；每项仍需单独事实确认和 Editor 审核。

## 9. SEO/GEO Topic Cluster 与内容治理

| 支柱/Cluster | 子文章（规划 ID） | 服务/行业/案例/FAQ 链接 | 索引与结构化数据 |
| --- | --- | --- | --- |
| 制造与外贸数字化 | I01-I06,I61-I64 | 业务系统、自动化；制造/外贸；C03,C05-C07；FAQ-系统01-03 | `Article`+`BreadcrumbList`；仅可索引的已审文章。 |
| 知识库与可信 AI | I09,I10,I12,I37-I40 | 知识库；制造/零售/教育/金融；C06,C09,C12,C20；FAQ-知识01-03,FAQ-AI01-03 | `Article`; 不用 AI 输出或概念截图伪造证据。 |
| 网站、门户与转化治理 | I03,I13,I18-I20,I27-I30,I47-I48,I55-I56,I96-I99 | 网站门户；全部行业；C01,C02,C08,C10,C13,C14,C17,C19；FAQ-网站/后台/部署 | `Article`、`BreadcrumbList`；Portal/API 仍 noindex 且不进 sitemap。 |
| SEO/GEO 与内容治理 | I14,I15,I41-I46,I49-I50,I59-I60,I86-I93 | 内容运营；全部行业；所有 FAQ-SEO/内容/案例 | `Article`; `FAQPage` 仅在问答已确认且可公开时。 |
| 实施、采购与风险 | I07,I08,I31-I36,I51-I58,I94-I95,I100 | 诊断咨询、业务系统、自动化；所有行业；FAQ-预算/周期/源码/维护 | `Article`; 每文链接服务、行业/场景、一个真实 CTA 或隐藏 CTA。 |
| 行业受控扩展 | I16-I26,I65-I80 | 对应服务/行业/C01-C20/行业 FAQ | 高风险行业需 E3；文章可被撤回/不索引。 |

**技术与编辑规则：**

1. 公开双语页面应有单一意图、唯一 H1、对应 `canonical`、真实 `zh-CN/en/x-default` alternates、`BreadcrumbList`；不存在真实双语对应页时不互指。
2. `Article` 用于审校文章；`FAQPage` 仅用于真实可公开 FAQ；案例只有在授权且事实充足后才考虑 `CreativeWork`/`CaseStudy`，不造 Review/评分/ROI Schema。
3. 每个 URL 只服务一个主意图；新稿先对照本表与现有 URL，重叠则合并、改角度、canonical 或不发布，避免关键词蚕食。
4. 100 篇是上限规划，不是批量生产指标：缺证据、重复、薄内容、未人工审校、无真实 CTA 或无相关内链的稿件不得发布或进入 sitemap/`llms.txt`。
5. 人工审查须覆盖事实、法律/隐私、客户授权、语言强度一致性、原创性、可访问性、内部链接、Schema 与最后复审日期；MarketingForce、Vercel、Supabase、Linear、Palantir 仅可借鉴“清晰、技术可信、决策充分”的表达原则，不能克隆设计、文案或作为 OVOPS 业务事实。

## 10. OV 命名候选（命名不是产品成立）

| 名称 | 候选包装 | 当前状态 | 可公开状态 | 必须通过的门禁 |
| --- | --- | --- | --- |
| OV Site | 网站/门户服务包装 | `Proposed` | `Do Not Publish as product` | 实际范围、商标/域名、合同、交付/支持/定价 Owner。 |
| OV CRM | 客户/线索流程概念 | `Not Built` | `Do Not Publish` | 已建功能、数据责任、隐私、安全、定价与支持。 |
| OV Flow | 工作流方法或自动化概念 | `Proposed` | `Do Not Publish as product` | 区分内部方法/实际产品，技术能力与商业条款确认。 |
| OV KB | 知识库服务包装概念 | `Proposed` | `Do Not Publish as product` | 模型/数据/权限/评测/支持、商标和定价确认。 |
| OV Agent | 智能助手概念 | `Not Built` | `Do Not Publish` | 实际产品、模型来源、风险控制、支持与定价。 |
| OV Portal | 受邀入口概念 | `Existing page; Not Built product` | `Do Not Publish` | Portal 事实表：认证、会话、隔离、日志、安全、邀请与公开范围。 |
| OV Insight | 内容/诊断方法候选 | `Proposed` | 可作为内部方法名，不作可购买产品 | 商标、方法 Owner、实际交付与定价确认。 |

## 11. 组件与数据结构规划（复用现有事实控制，不先过度工程）

| 类型 | 最小字段 | 关键门禁 / 与现有复用 |
| --- | --- | --- |
| `ContentEvidence` | `id,type,sourceRef,sourceDate,publicAllowed,confirmedBy,confirmedAt,reviewAt,redactionStatus` | 对齐 `VerifiedFact` 与 `content-policy`；无 `publicAllowed` 不渲染。 |
| `PublicationGate` | `planning,ownerConfirmed,implementable,previewable,indexable,owners,blockedReasons` | 显式四态；`indexable` 需独立判定，不能由页面存在推定。 |
| `CasePlan` | `id,slug,title,industry,truthLabel,phase3Status,problem,implementation,deliverables,publicResult,nextStep,evidenceIds,clientAuthorization,assetIds,relatedIds,publicationGate` | 保留现有 `CaseStudy` 的 slug/双语/状态；无授权不得将 `truthLabel` 设为 verified。 |
| `IndustryExpansion` | `slug,title,origin,currentClaimLevel,problems,methods,risks,serviceSlugs,caseIds,evidenceIds,publicationGate` | 继承 `Industry`/`IndustryEnrichment`；新行业默认 GENERAL_CAPABILITY 或 DO_NOT_CLAIM。 |
| `InsightPlan` | `id,slug,title,searchIntent,persona,entities,cluster,serviceSlugs,industrySlugs,caseIds,evidenceIds,priority,briefStatus,publicationGate` | 不替代文章正文；复用双语 `LocalizedText` 与路由策略。 |
| `FAQPlan` | `id,category,question,targetRoute,answerPoints,evidenceIds,relatedIds,localeStatus,publicationGate` | 现有 `FAQItem` 可继续承载已批准短答；规划层不写最终答案。 |
| `ProductConcept` | `id,name,kind,productState,publicationState,scopeEvidence,commercialGate,trademarkGate,domainGate,pricingGate,supportGate` | 明确服务包装/内部方法/概念/产品，避免命名直接变成可买产品。 |
| `ServiceDetailPlan` | `serviceSlug,audience,problems,method,deliverables,exclusions,commercialBoundary,faqIds,linkIds,ctaGate` | 扩展现有 `Service` 与 `ServiceEnrichment`，不复制第二套事实真相。 |

建议仅在 Owner 通过 Batch 0 后，由执行线程评估将这些类型置于单一规划/内容数据层；显示层始终通过 `canPublishFact`/`factOrPending` 和 `PublicationGate` 过滤。不得为 100 篇规划预先造 100 个路由、页面或 Mock 数据。

## 12. 预计代码文件影响（仅列出，**不修改**）

| 候选文件/目录 | 原因 | 风险/依赖 | 后续测试 |
| --- | --- | --- | --- |
| `lib/content-data.ts` | 扩展获批准的服务/行业/FAQ/案例引用 | 双语、状态漂移；依赖 Owner 事实 | 类型检查、内容级断言。 |
| `lib/confirmed-facts.ts`、`lib/content-policy.ts`、`lib/content-visibility.ts` | 接入批准的证据与 PublicationGate | 误把候选升为 confirmed；依赖审计登记 | 单元/静态事实门禁检查。 |
| `lib/seo-data.ts`、`app/sitemap.ts`、`app/robots.ts`、`public/llms.txt` | 仅为可索引的已批准内容登记 SEO | canonical/alternates/sitemap 与 noindex 冲突 | sitemap/robots/metadata 审查。 |
| `app/solutions/**`、`app/industries/**`、`app/work/**`、`app/insights/**`、`app/faq/**` | 渲染获批的详情/资源页 | 路由爆炸、事实越界、薄内容 | build、链接、H1、JSON-LD、浏览器 QA。 |
| `components/*`（如 Service/Case/FAQ/Content 卡片） | 显示状态、概念标签与证据提示 | 标签不显著、移动端溢出 | 组件/视觉/移动端 QA。 |
| `app/why-ovops/**`、`app/products/**` | 仅在完整产品/优势门禁通过后评估 | 把 PENDING 变卖点或产品 | 审校、Schema、链接与浏览器 QA。 |
| `docs/*` | 保存事实登记、审校和发布记录 | 资料过期/非权威复制 | Owner 签核与复审日期检查。 |

本计划不触及 `app/`、`components/`、`lib/`、`public/`、`config`、`package`；无构建、QA、上传、Git、服务器、DNS、部署或生产动作。

## 13. 分批、Owner 验收与退出条件

| 批次 | 相对规模 | 允许范围 | Owner 验收 | 退出条件 |
| --- | --- | --- | --- | --- |
| Batch 0：事实、授权、命名 | 小 | `ContentEvidence`、PublicationGate、事实/素材/CTA/产品名台账；不写页 | Business/Client/Legal/Technical Owner 对每个事实和命名分类签字 | 可公开确认事实仍为 0 时，停在规划；不进入内容实施。 |
| Batch 1：六服务 + FAQ | 中 | 6 服务 detail brief、50 FAQ 逐题事实依赖和真实 CTA 评估 | 服务范围/非范围、商业边界、双语强度、CTA Owner 确认 | 任何固定周期、价格、源码/部署/维护主张未确认即保留待确认或不发布。 |
| Batch 2：门禁通过的案例/行业 | 中 | 仅通过单条 CasePlan/IndustryExpansion 的项目；可先 1 个 | 客户授权、来源、脱敏、行业口径、素材和网页索引决定 | 无客户授权的条目仍为情景/概念，不能升级为 verified case。 |
| Batch 3：前 20 Insights | 中 | 先逐篇 brief、来源、审校、内链与 Schema，再实施 | Editor + 相关事实 Owner；高风险行业另加 Legal/Technical | 任一篇缺 E1/E3、重复意图、薄内容或无 CTA/内链即不发布。 |
| Batch 4：其余 80 Insights | 大、按证据分组 | 仅从 P2/P3/P4 文章中选择成熟集群，按月/主题审校 | 集群 Owner、Editor、必要时 Legal/Client | 不因“100 篇目标”批量生成；证据不足、内容过期或互相蚕食即延后/合并/删除。 |

## 14. 验收统计与最终实施前检查

| 项目 | 规划数量 | 中英文策略 | 事实/授权/素材门禁 | 关联与优先级 |
| --- | ---: | --- | --- | --- |
| 案例候选 | **20** | 同 ID/slug、同真实性标签、中文先定问题与边界、英文自然 B2B | 0 verified；客户项目需来源+Owner+客户授权+脱敏素材 | 关联 6 服务、10 行业、100 Insights；Batch 2。 |
| 行业 | **10** | 双语同源且不将英文写得更强 | 现有 5 为 GENERAL_CAPABILITY；新增 5 默认 GENERAL_CAPABILITY 或 DO_NOT_CLAIM | 关联案例和服务；Batch 2。 |
| FAQ | **50** | 同一问题 ID，先批准要点后写短答 | 每题有事实依赖、目标路由和内链；无长答案 | 覆盖 14 类；Batch 1。 |
| Insights | **100** | 同 ID、来源、事实状态；英文不可增加承诺 | 每篇 E0-E4 证据、编辑审校、Schema/内链/更新日 | 前 **20** 有详细 brief；Batch 3/4。 |
| 六服务 | **6** | 同一字段结构，英文不强化范围或结果 | 周期、预算、源码、部署、维护/API 仍 PENDING | FAQ、行业、Insights、真实 CTA；Batch 1。 |
| 产品命名 | **7** | 名称/状态双语对齐 | 全部 Proposed/Not Built/Do Not Publish 或内部方法 | 商标、域名、实际产品、定价、支持后才可升级。 |

### Owner 需确认的最小决策包

1. 六服务的正式可售范围、非范围、责任、报价/周期表达、源码/客户部署/维护和第三方费用边界。
2. 真实联系渠道、收件 Owner、隐私提示、CRM/记录、失败反馈与 CTA 可用性。
3. 10 行业是否保留，特别是教育、医疗、公共服务、金融的监管和禁止事项。
4. 每个 Phase 3 候选项目的真实状态、可公开事实、客户/Logo/素材/指标授权；未提供即永久保持情景或概念。
5. API/Portal 的实际运营、认证、安全、数据和支持事实；未确认继续 noindex、无登录、无购买/模型承诺。
6. OV 系列命名是否只做内部方法/服务包装，及任何未来商标、域名、产品、定价和支持决策。

## 15. 本文件完成边界

- 这是单一规划文件；没有改动网站代码、内容数据、页面、素材或配置。
- 没有创建案例、行业、FAQ 最终文案或 Insights 正文，也没有将任何候选升级为事实。
- 没有运行构建/QA、提交 Git、上传、预览/生产部署、访问服务器或修改 DNS。
