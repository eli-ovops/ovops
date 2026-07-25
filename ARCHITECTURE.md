# OVOPS Phase 4 架构边界

## 1. 当前 Public Website

当前公开网站位于仓库根目录，采用 Static HTML、CSS 与 Vanilla JavaScript。既有公开 URL、视觉层级、SEO 元数据与静态回退能力必须保留，后续演进不得以重写为由破坏已验收的静态 V1。

当前已完成的静态页面范围为：首页、Solutions 总览、6 个 Solution Detail、Industries 总览、10 个 Industry Detail 与 Delivery 页面。

Cases、About、真实 Contact 与 Lead 系统尚未实现；不得将其写成已完成能力。当前 Contact CTA 仅保留透明静态 fallback，不包含假表单、虚构联系方式或公开写入。

## 2. Phase 4 目标：渐进双平面

Phase 4 采用渐进式双平面规划：

- **Static Public Website**：继续由根目录静态源码承接公开展示、URL、视觉与静态回退。
- **Future Operations Platform**：未来候选架构为 Next.js + Payload + PostgreSQL，用于受控运营能力；本次不创建 `operations/` 目录或任何平台代码。

这不是全站重写，也不表示 Next.js、Payload、PostgreSQL、CMS、数据库或后台已经配置、部署或验收。

## 3. Future Repository Boundary（规划，非实现）

公开静态网站继续保留在仓库根目录。只有在 Phase 4.1 获得单独授权，并完成 site identity、数据库、隐私与 Owner 决策后，才建议引入独立的 `operations/` workspace。

未来公开站不得直连 CMS、数据库或管理接口。任何公开读写只能通过同源受控 BFF 或最小公开写接口；内部数据、运营备注、审计信息与私有附件不得返回给公开页面。

## 4. Git 治理

- 用户修改仅 push 到 `eli`。
- `main` 仅供 Roxy 审计合并及正式部署使用。
- 每次 release 必须绑定完整 commit SHA，并保留可比较、可回退的 Git 基线。

本文件只固定架构边界，不构成 Preview、Production、用户验收或发布授权。

## 5. 数据与安全边界

在没有后端前不得创建假表单或伪造 Lead 写入能力。Phase 4.1 的公开写入必须最小化，并先完成 PII、同意、保留、角色、审计、限流/反垃圾、备份与回滚门禁。

## 6. site.yaml 状态

`site.yaml` 当前仍为 draft/TBD，只记录待 Owner 与 Server Owner 决策项。本次不修改它，也不将 preview 或 production 写成已配置。

## 7. Phase 4.1 启动门禁与 Not Now

启动 Phase 4.1 前，必须获得独立授权，并确认站点身份、数据模型与持久化方案、隐私与同意规则、Owner/Server Owner、公开接口边界、备份/回滚与验收标准。

当前不启动：客户门户、内部交付平台、多租户、复杂 RAG、自动诊断决策或其他超出最小 Lead 闭环的能力。
