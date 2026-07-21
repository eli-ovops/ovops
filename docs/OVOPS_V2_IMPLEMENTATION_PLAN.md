# OVOPS 官网 V2｜实施计划（仅规划）

## 总体约束

保持 Next App Router、`output: "export"`、双域名与旧域重定向；不触碰 `postiz.roxychao.com`。不引入 Payload CMS；静态站不实现假提交、假登录或空链接。每一阶段以事实确认和可审查 diff 为前提。

## Phase 2｜事实冻结与 IA 确认（P0-P2）

- 建立可公开事实表：主体、服务、案例、履历、CTA、API、Portal、素材许可。
- 确认网站地图、主导航、索引策略与页面 owner；决定 Portal 是否 `noindex`。
- 验收：每一条公开声明有来源/负责人/状态；未确认项不进入文案。

## Phase 3｜内容模型与页面骨架（P2-P3）

- 在现有 `lib/site-data.ts` 的模式上建立六类 Service、五个建议首批 Industry、Case、Proof、CTA、FAQ 与七步 Delivery Process 内容结构，以及 `live/in-development/pilot/demo/concept` 枚举。
- 重排首页，创建 solutions、industries、work、insights、faq、delivery-process 的静态路由骨架；复用 Header/Footer/CTA/SEO helpers。Portal 的既有 POST 不在本阶段扩展，除非后端、认证与数据边界另行确认。
- 验收：中英路由矩阵一致；所有动作通向真实 URL 或隐藏；无客户数据、认证或假行为。

## Phase 4｜文案、SEO/GEO 与可访问性（P3/P6/P17）

- 用确认后的资料填充中文基线及商务英文版本；建立 8–12 篇洞察草稿和编辑/事实审校流程。
- 实装每页 metadata、canonical、alternates、sitemap、robots、JSON-LD、内链和 `llms.txt` 事实表。
- 验收：H1/标题/描述/结构化数据无虚构；Portal/API 的索引策略、隐私与支持说明经负责人批准。

## Phase 5｜静态质量与受控预览（P6-P8，另行授权）

- 运行 lint、type/build、静态路由/链接检查、桌面与移动浏览器 QA、中文/英文 metadata 抽查。
- 若用户另行授权预览：先核对 `site.yaml`、实时 guide/status、分支/SHA、受控发布契约和唯一 deploy owner；再按 validate → `validation_ok` → 单次 deploy → 浏览器验收执行。
- 验收：构建/链接/浏览器证据完整；预览、生产与用户验收严格分开。

## 风险与停止条件

- P0：任何客户、指标、Logo、价格、SLA、履历、API/Portal 能力未获确认，立即停止其公开实施。
- P1：双语没有同源事实/同一状态 ID，停止翻译发布。
- P1：站点身份、域名、发布器、分支/SHA 或 `site.yaml` 缺失，停止任何部署。
- P2：静态环境需要真实表单/登录/数据写入，必须转为独立产品/后端范围并重新授权。
