# OVOPS 官网 V2｜第一轮只读审计

## 结论与边界

本轮为 P0-P2 规划草案，**不是上线、内容核验、技术验收或客户承诺**。现有站点已经是 Next App Router 静态导出，且有中英两套域名与基本 SEO 设施；V2 的首要问题是把“能力展示”收束为一条可采购、可验证、可转化的 B2B 销售链路，并完整表达企业 AI 应用与数字化系统落地服务，而不是收窄成抽象 AI 服务。

证据根目录：`app/`、`components/`、`lib/`、`public/llms.txt`、`README.md`、`package.json`、`next.config.mjs`。本次没有运行构建、访问服务器、部署或改代码。

## 现状盘点

| 面向 | 已有事实 | 审计判断 | V2 处理 |
| --- | --- | --- | --- |
| 首页 | Hero → 四类能力 → 创始人 → VectorOps 图 → CTA | 视觉完整，但缺少“对象/问题/购买方式/证据”的连续解释 | 重组为销售链路，保留深色 Hero、能力卡与 CTA 带 |
| 服务 | 痛点、服务矩阵、六步交付、CTA | 服务内容相对完整，但范围、先决条件、案例证据与 CTA 分层不足 | 留为核心转化页，拆成可采购服务及其交付边界 |
| 案例 | `/work` 与匿名案例/交付模式 | 当前更像方法展示，不能被表述为已验证客户成果 | 改为“交付模式与案例库”；每项标 `live / in-development / pilot / demo / concept` |
| 关于 | 公司与创始人叙事 | 有未核验履历/量化表述风险 | 仅保留可提供证据的身份、经历和团队信息 |
| API 平台 | `/api-platform` 指向 `models.ovops.com`，含接入和 FAQ | 外部能力、可用模型、价格、SLA、账号体系均未在本轮核实 | 保留为独立产品入口，所有能力标“待确认” |
| 客户后台 | `/portal` 有登录表单，提交到 `https://ovops.com/api/portal-login` | 当前静态源码中未见该后端/API 的认证、安全与失败路径证据 | 仅展示获邀访问说明；未核验前不作为导航一级入口 |
| 公共信息 | `/privacy`、`/terms`、`/data-deletion` | 合规页存在于 sitemap/数据中；内容和适用性未在本轮验证 | 继续保留，Phase 4 复核法务文本 |

## 技术与搜索事实

- `next.config.mjs` 使用 `output: "export"` 与 `trailingSlash: true`；V2 不应改变 App Router/静态导出前提。
- `lib/site-data.ts` 以 `NEXT_PUBLIC_SITE_LOCALE` 控制 `ovops.com`（英文）和 `www.ovops.com`（中文）；`lib/seo-data.ts` 已为页面生成 canonical 与 `zh-CN/en/x-default` alternates。
- `app/layout.tsx` 有 Organization、WebSite、Service JSON-LD；页面有 Breadcrumb JSON-LD；`app/sitemap.ts`、`app/robots.ts`、`public/llms.txt` 已存在。
- 现有 sitemap 未列 `/portal`，但主导航包含它；索引策略与导航策略不一致，V2 应明确其公开/私有边界。
- README 明确旧 `roxychao.com` 仅可重定向、`postiz.roxychao.com` 必须保持独立；V2 不得把 Postiz 纳入官网。

## 可复用与重构

**保留：** `SiteHeader`、`SiteFooter`、`CtaBand`、`ShowcaseCarousel`、JSON-LD/metadata helpers、语言切换、服务数据驱动结构、现有公共合规路由。

**重构：** 首页区块顺序、主导航、`site-data` 内容模型、六大服务的采购表达、五个首批行业的典型方案、案例分级、API/Portal 的能力声明与访问边界。

**不做：** Payload CMS、真实表单提交、真实登录、API 代理、客户数据、服务器或域名变更。

## P0-P3 风险

| 优先级 | 风险 | 处理原则 |
| --- | --- | --- |
| P0 | “上市企业/百亿级/15+年”、客户成果、数字、SLA、模型可用性未核验 | 未提供证据前全部改为“待确认”，不进入公开文案 |
| P0 | API/Portal 可能被误认为真实可用产品 | Portal 已有 POST 指向，但后端未在当前源码得到证实；不新增假登录/假提交/空链接，需真实入口、权限与支持边界后才公开承诺 |
| P1 | 中英文服务、价格/周期、案例状态可能漂移 | 用同一内容 ID、状态字段和审校流程；英文只做自然商务表达，不逐字直译 |
| P1 | `portal` 公开导航而 sitemap 不含该路由 | Phase 2 决定 index/noindex、邀请制文案与导航位置 |
| P2 | 图像 Alt 将“展示”称为“案例” | 未获授权时改为方法示意/演示画面 |
| P2 | 静态导出无法承载真实业务动作 | 所有 CTA 要么到真实可访问的联系渠道，要么不展示 |

## 待确认事实

1. 法人名称、成立日期、ICP备案信息、地址与两个联系邮箱的公开授权。
2. 创始人履历、职位称谓、任职年限、上市公司/百亿项目等表述的证据与可公开范围。
3. 各服务的真实价格机制、周期、交付物、行业限制与售后/SLA。
4. 每个案例的客户授权、名称、状态、可公开素材、指标定义与可复核结果。
5. `models.ovops.com` 的运营主体、账号开通、模型范围、计费、隐私、支持与状态页。
6. Portal 是否存在真实系统、谁可访问、数据类型、登录/隐私策略与公开索引策略。
