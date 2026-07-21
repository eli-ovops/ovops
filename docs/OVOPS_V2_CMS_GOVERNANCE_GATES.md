# OVOPS V2｜网站与未来 CMS 治理门禁

> 状态：治理记录，不是 CMS 实施方案。  
> 适用范围：OVOPS V2 当前静态官网，以及未来经业务 Owner 明确授权后可能进入的内容后台、CMS、数据迁移和持续内容运营阶段。  
> 当前结论：项目现为 Next.js 静态导出双语官网；没有权威证据证明已采用 Payload、SQLite、数据库或可运营 CMS。本文件不得被解释为已选型或已实施这些架构。

## 当前架构事实

| 事实 | 状态 | 证据 |
| --- | --- | --- |
| Next.js App Router、TypeScript、静态导出 | 已存在证据 | `package.json`、`next.config.mjs`、`docs/OVOPS_STATIC_EXPORT_DIAGNOSIS.md` |
| 中文与英文按 `NEXT_PUBLIC_SITE_LOCALE` 分别构建 | 已存在证据 | `package.json`、`lib/site-data.ts` |
| 主要 V2 内容使用同一 ID/slug 与 `LocalizedText { zh, en }` | 已存在证据 | `lib/content-data.ts` |
| 高风险业务事实使用状态和公开可见性控制 | 已存在证据 | `lib/confirmed-facts.ts`、`lib/content-policy.ts`、`lib/content-visibility.ts` |
| 当前存在真实 CMS、Payload、SQLite 或数据库 | 尚无证据 | 当前依赖、配置与 V2 审计均未证明；`docs/OVOPS_V2_AUDIT.md` 明确将 Payload 排除在本阶段之外 |
| 当前源码目录存在已确认的 `site.yaml` | 尚未实施 | 当前 source 目录未发现 `site.yaml`；其他原型目录中的文件不得替代本项目实例 |

## 五条原则逐项状态

### 1. 先定页面与数据契约，再设计后台

- 状态：**部分已有证据；CMS 阶段尚未实施**。
- 已存在：V2 已有信息架构、页面模型、双语内容类型与事实公开策略。
- 缺口：尚无正式的“页面/区块 → 内容实体 → 字段 → 校验 → 权限 → 发布状态”契约，也没有获批后台范围。
- 门禁：任何 CMS/后台设计前，必须先冻结页面清单、内容实体、字段语义、必填/可选、双语规则、发布状态、权限与前端消费关系。
- 禁止：因后台界面方便而反向创造前台不需要的字段。

### 2. 后台字段必须有明确前端消费者

- 状态：**当前不适用后台验收；规则尚未实施**。
- 已存在：当前静态内容字段在 React 页面中有实际消费者。
- 缺口：没有 CMS schema，也没有字段消费者矩阵，不能宣称满足“零 consumer 字段为零”。
- 门禁：新 schema 的每个字段必须登记至少一个明确消费者：公开页面、SEO/JSON-LD、邮件/通知、内部工作流或受控 API；消费者为零时不得进入 schema。
- 验收物：字段消费者矩阵、删除/弃用策略、未消费字段自动或人工审计结果。

### 3. 中文生产数据为权威源，英文记录 provenance 与同步状态

- 状态：**同源结构已有证据；权威源和 provenance 尚未实施**。
- 已存在：中英文共享 ID、slug、事实状态，并由 `NEXT_PUBLIC_SITE_LOCALE` 分别构建。
- 缺口：当前 `LocalizedText` 只保存 `zh/en` 文本，没有逐字段来源、翻译方式、审校人、同步状态或过期状态；代码也未强制中文为生产权威源。
- 门禁：未来内容后台必须为英文内容记录来源中文版本、翻译方式、同步/待审/已过期状态、审校人与时间；禁止英文缺失时静默回退中文，也禁止中文更新后英文继续显示为已同步。
- 建议最小状态：`source_locale`、`source_revision`、`translation_status`、`reviewed_by`、`reviewed_at`。

### 4. 代码、数据库、媒体、env、备份与 release 分开保护

- 状态：**静态代码与导出物可区分；完整保护体系待确认/尚未实施**。
- 已存在：源码与 `out/` 静态导出物分离；当前没有数据库生产适用性可评审。
- 缺口：source 目录缺少已确认 `site.yaml`；数据库、public/private 媒体、env 引用、备份、release 保留和回滚 Owner 尚未形成项目级契约。
- 门禁：进入 CMS/后台或发布治理前，必须用项目 `site.yaml` 登记站点身份、环境、域名、仓库/分支、包类型、存储引用、备份、保留、健康检查和回滚边界；不得写入 secret 值。
- 禁止：把 SQLite 当作默认生产终局；把数据库、媒体或 env 打进普通代码包；用旧数据库备份覆盖已有新写入。

### 5. 小修改先设 changed-files/业务 allowlist 与不做项

- 状态：**阶段报告中有实践证据；尚未形成持续门禁**。
- 已存在：V2 各阶段报告记录了修改文件、禁止部署、禁止虚构事实和阶段不做项。
- 缺口：没有每次任务统一登记的 changed-files allowlist、业务事实 allowlist 与版本漂移检查。
- 门禁：任何修改开始前必须写明允许修改文件/模块、允许变化的业务事实、不做项、依赖版本是否允许变化；验收时将实际 diff 与 allowlist 对照。
- 默认禁止：顺手重构、扩大页面/业务范围、升级依赖、改变静态导出/locale/域名逻辑、引入 CMS/数据库、修改服务器或发布环境。

## 最小任务门禁模板

后续网站/CMS任务单至少包含：

```text
目标：
允许修改文件/模块：
允许变化的业务事实：
前端消费者/页面：
明确不做：
依赖与版本策略：保持不变 / 已专项授权
数据与媒体影响：无 / 待专项评估
部署与 migration：禁止 / 已专项授权
验收证据：diff、lint/build、页面消费者、双语/provenance、静态/浏览器检查
```

## 适用性与触发条件

- 当前静态站内容维护：原则 1、3、5 立即适用；原则 2、4 作为数据模型和发布边界检查适用。
- 未来一般内容后台或 CMS：五条全部成为设计和实施前置门禁。
- 只有当项目权威范围明确涉及 Payload、Collection/Global、独立 Next 前端/BFF、双语 provenance、SQLite migration、public/private 媒体或 CMS 生产资产时，才同时启用 `website-delivery-sop` 与 `payload-client-website-development`，并读取命中的专项 reference。
- 本治理通知本身不触发 Payload/SQLite 选型、schema 设计、migration、媒体迁移或部署。

## 冲突与误用风险

1. 将现有 `LocalizedText` 误判为完整双语 provenance；它目前只证明同源结构，不证明翻译同步治理。
2. 将 `confirmed-facts.ts` 文件名误判为所有值已确认；当前代码明确允许 `pending`，公开仍须满足状态和授权门禁。
3. 将其他原型目录的 `site.yaml` 误用为当前 V2 source 的站点契约。
4. 因未来可能使用 CMS 而提前引入 Payload、SQLite、数据库或登录能力。
5. 把静态 build 通过、HTTP 200 或本地预览等同生产数据保护、发布完成或用户验收。

## 未完成事项

以下事项均等待业务 Owner 或后续专项授权，不在本次执行：

1. 确认是否以及何时进入 CMS/内容后台阶段。
2. 创建并由 Owner、Server Owner 核实当前 V2 的项目级 `site.yaml`。
3. 建立页面—实体—字段—消费者矩阵。
4. 确认中文权威源规则及英文翻译/同步工作流。
5. 确认 public/private 媒体、数据库、env、备份、release 与回滚 Owner。
6. 将 allowlist 模板纳入后续每一张实际执行任务单和验收报告。

