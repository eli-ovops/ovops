# OVOPS Homepage Hero Optimization v1 — 修改前审查

> **状态：REVIEW_ONLY / AWAITING_OWNER_CONFIRMATION / NO_CODE_CHANGE**  
> **日期：2026-07-20**  
> 本文为首页 Hero 的修改前审查与实施边界建议，不构成代码实施授权、内容已上线声明或商业承诺。

## 审查结论

当前首页 Hero 是 `app/page.tsx` 内的内联区块，而非独立的共享 Hero 组件。它的两条 CTA 已指向真实的站内路由，但现有标题在五秒内没有直接说清“AI 与企业效率”的核心价值，副标题也把多种服务方向并列，缺少面向购买者的三条业务入口。建议在 Owner 确认后，仅在首页 Hero 内重组文案、CTA 与一张**非插画式的企业数字化能力地图**；本轮没有修改任何代码、样式、数据或路由。

本审查使用既有 `website-delivery-sop` 首次完整读取记录：DS-002B SHA-256 为 `d197b9f3334a19ddd37db2db2972379142038b1c59d02b01f5cdee00f32c4cf2`，mtime 为 `2026-07-19 12:32:02 +0800`；本轮仅核对其身份并沿用记录。目标模型已指定为 GPT-5.6 Terra + medium；实际运行态未二次确认。

## 1. 当前 Hero 问题（真实实现）

### 实现定位与内容来源

| 事项 | 当前事实 | 审查结论 |
|---|---|---|
| Hero 结构 | `app/page.tsx` 的首页 JSX 内联 `<section className="home-hero text-white">`（约第 44 行起） | 首页专属；不是 `components/page-hero.tsx` 的调用方。 |
| 当前中英文文案 | 同一 JSX 中以 `isChineseSite ? ... : ...` 内联切换 | 当前生效来源是 `app/page.tsx`。 |
| 平行数据 | `lib/site-data.ts` 有较早的 `homeCopy`（含 `预约咨询` 等字段） | 当前 Hero 不消费该数据；不可误当成此次 Hero 的真实文案源，也不应顺带清理。 |
| 当前 CTA | `/solutions` 与 `/delivery-process` | 均有对应 `app/.../page.tsx`，可作为当前真实站内跳转。 |
| 视觉资源 | Hero JSX 未引用图片、视频、SVG 或外部资源 | 当前视觉主要来自 CSS 背景与排版。 |
| 样式 | `app/globals.css` 的 `.home-hero`、`.home-hero::after`，以及其响应式规则 | `.home-hero` 不只被首页使用；不能把首页特有视觉直接写入该共享类。 |

### 当前五秒理解障碍

1. 当前中文 H1 为“帮助团队看清业务，减少重复流程，建立可检索知识。”，与 AI、企业效率的关系需要读完后续句子才明确；英文也同样偏描述性。
2. 当前副标题把官网、门户、业务系统、知识、自动化、内容运营按供给侧罗列；访问者难以立即判断自己应从获客、流程还是知识问题进入。
3. Hero 没有三条业务方向的可扫描结构；紧随其后的“三种查找方式”是另一层导航，不能代替 Hero 的价值表达。
4. 当前 `.home-hero` 使用径向渐变与深色渐变背景（`app/globals.css`）；虽未使用图片，但不符合下一版“企业数字化能力地图、非抽象科技背景”的明确视觉方向。
5. Hero 高度没有明确的首屏策略：`app/page.tsx` 以 `py-16 md:py-24` 控制留白，窄屏 CSS 再压缩至 44px/36–40px；新增三方向若无约束，可能把 CTA 推出首屏。

## 2. 修改理由：五秒理解目标

目标不是把首页变成能力目录，而是在首屏依次回答四件事：

1. **这是什么：**“AI 正在重塑企业效率”。
2. **OVOPS 讨论什么：**把 AI 与数字化系统融入获客、销售、运营和管理流程。
3. **我从哪里进入：**提升获客效率、优化业务流程、释放企业知识。
4. **下一步看哪里：**查看解决方案或了解交付方式。

这是一套能力导航与范围沟通表达，不是“已经拥有一体化企业平台”或“可验证交付结果”的声明。三方向内出现的 CRM、OA、ERP 扩展、RAG 等仅可作为可讨论的业务方向；实际范围、第三方依赖与实施可行性仍需逐项确认。

## 3. 预计修改文件

### 建议修改（仅在 Owner 批准实施后）

| 文件 | 最小建议变更 | 目的 |
|---|---|---|
| `app/page.tsx` | 仅重写首页 Hero 的中英文文案、保留两条 CTA 路由、在该区块内加入三方向的语义结构 | 让首屏形成“价值—路径—行动”的顺序。 |
| `app/globals.css`（**仅在现有 utility 无法完成时**） | 仅新增首页命名空间样式，例如 `.home-hero-capability-map`；不得改动既有共享 `.home-hero`、`.button-*`、`.section-wrap` | 支持能力地图布局与响应式收拢。 |

### 只读核查、不修改

| 文件/范围 | 原因 |
|---|---|
| `lib/site-data.ts` 的 `homeCopy` | 当前并非运行中的 Hero 数据源；清理旧字段属于另一项内容治理。 |
| `components/page-hero.tsx` | 是其他页面可复用组件，首页当前未使用；不应为首页改造而牵连。 |
| `app/layout.tsx`、metadata、sitemap、导航、路由 | 本任务不授权 SEO/导航/路由变更。 |
| 既有“三种查找方式”及后续首页区块 | 不以 Hero 优化名义重排首页信息架构。 |

## 4. 修改范围

### Hero 内允许项（待批准）

- 仅替换 Hero 的 kicker、H1、副标题和两枚 CTA 的可见文字；CTA `href` 保持为已验证的站内路径。
- 在 Hero 的文本区之后加入紧凑的三方向能力地图：方向名、简短说明、能力标签；不增加新路由、产品卡、表单或联系入口。
- 以排版、连接关系、分组和低干扰色阶表现“能力地图”；不引入图片资源或新的设计系统。
- 使用首页作用域样式或现有 Tailwind utility 处理布局；桌面和移动端均须保持 CTA 可见、可点。

### 明确不做

- 不改首页其他区块，不扩展 Phase 6 的 Solution / Industry / Scenario。
- 不新增页面、导航项、菜单、图片、Mockup、组件、表单、下载资料或联系渠道。
- 不写客户案例、ROI、价格、交付周期、SLA、行业经验或“已实现”的系统能力。
- 不把“能力地图”做成机器人、大脑、光球、抽象科技背景或纯未来插画。
- 不更改全站共享按钮、容器、Hero 基础样式；不改 metadata、SEO、sitemap 或静态导出配置。

## 5. 建议的中英文 Hero 文案草稿

以下为**建议草稿，未实施**。中文主标题严格采用已定稿文本。

### 主叙事与 CTA

| 层级 | 中文 | English |
|---|---|---|
| Kicker | 企业 AI 与数字化能力 | Enterprise AI & digital capability |
| H1 | **AI 正在重塑企业效率** | **AI Is Reshaping Enterprise Efficiency** |
| 副标题 | 原点向量帮助企业将 AI 与数字化系统融入获客、销售、运营和管理流程，减少重复工作，提升组织效率，建立面向未来的数字化能力。 | Origin Vector helps businesses embed AI and digital systems across growth, sales, operations, and management—reducing repetitive work, strengthening organizational efficiency, and building digital capability for what comes next. |
| 主 CTA | 查看解决方案 | Explore solutions |
| 主 CTA href | `/solutions` | `/solutions` |
| 次 CTA | 了解交付方式 | See how delivery works |
| 次 CTA href | `/delivery-process` | `/delivery-process` |

CTA 用语不包含“立即购买”“免费试用”“马上咨询”“预约沟通”或下载承诺。`/solutions` 与 `/delivery-process` 是当前真实存在的站内页面；没有把尚未确认的联系渠道伪装为可用转化入口。

### 三个能力入口

| 方向 | 中文标题与说明 | English title and description | 事实边界 |
|---|---|---|---|
| 01 | **提升获客效率**：官网、SEO、GEO、内容运营与客户入口建设。<br>标签：品牌增长 | **Improve growth efficiency**: Websites, SEO/GEO, content operations, and clearer customer entry points.<br>Tag: Brand & growth | 是能力讨论方向，不代表既有增长产品、排名结果或获客成效。 |
| 02 | **优化业务流程**：CRM、OA、ERP 扩展、业务系统与自动化流程。<br>标签：企业运营效率 | **Improve business workflows**: CRM, OA, ERP extensions, business systems, and workflow automation.<br>Tag: Operational efficiency | 不暗示 OVOPS 自有 CRM/OA/ERP 平台，或可无条件实施第三方系统。 |
| 03 | **释放企业知识**：知识库、RAG、AI 助手与智能客服。<br>标签：企业知识管理 | **Unlock enterprise knowledge**: Knowledge bases, RAG, AI assistants, and intelligent customer support.<br>Tag: Knowledge management | 不暗示现成 RAG 产品、智能客服平台、实时数据能力或客户成果。 |

## 6. 建议的视觉结构（仅布局与信息结构）

### 桌面（建议从 1024px 起）

```text
[Kicker]
AI 正在重塑企业效率                 [企业数字化能力地图]
副标题                               01 品牌增长
[查看解决方案] [了解交付方式]        ──> 02 企业运营效率
                                     ──> 03 企业知识管理
                                     （每项含一行可讨论方向）
```

- 左侧保持阅读顺序：kicker → H1 → 副标题 → 两枚 CTA。
- 右侧/下侧为三节点“能力地图”，用清晰的标签、细连接线、对齐关系和文本层级表达，不以插画替代信息。
- 地图不展示大企业 Logo、夸张数字、产品面板、假数据或“AI 大脑”视觉隐喻。
- 如现有 `.home-hero` 渐变无法与地图共存，应由 Owner 单独确认是否替换首页专属背景；不得直接修改共享 `.home-hero`，因为该类也被解决方案与交付方式页面使用。

### 移动（320–767px）

```text
Kicker
H1
副标题
[主 CTA]
[次 CTA]
01 提升获客效率
02 优化业务流程
03 释放企业知识
```

- 先呈现标题、说明与 CTA，再呈现三方向；避免能力地图将行动入口推离首屏。
- 三方向收为纵向文本节点或简短卡片，不使用横向滚动、复杂连线、悬停交互或极小标签。
- 这只是 Hero 内的说明层，不替代、也不改写下方既有“三种查找方式”。

## 7. 响应式验收标准（实施阶段）

| 视口 | 必须验证 | 主要风险与标准 |
|---:|---|---|
| 320px | 中文与英文各一轮 | 无横向滚动/裁切；H1、CTA 与三方向不重叠；CTA 保持纵向全宽可点；英文副标题不得因长单词撑破容器。 |
| 375px | 中文与英文各一轮 | 标题不被压成难读的碎行；两枚 CTA 仍可清楚区分；三方向不出现双列硬挤。 |
| 768px | 中文与英文各一轮 | 可维持内容单列加紧凑地图，或安全进入两列；不得为并排而降低正文可读性。 |
| 1024px | 中文与英文各一轮 | 左文右图/下图关系清晰；标题、两 CTA、三节点在首个可视区域内有合理阅读路径。 |
| 1440px | 中文与英文各一轮 | 内容宽度受控，不拉成长行；地图是辅助信息而非视觉噪声；Hero 不出现巨大空白或失去 CTA 焦点。 |

共同标准：

- 不以固定 `100vh` 强行截断内容；首屏高度应允许中英文自然换行并保持 header、核心标题、说明和 CTA 的完整可见性。
- 现有规则在窄屏将 `.home-hero h1` 压至 `clamp(38px, 11.4vw, 48px)`，并将段落降至 14px；实施时须核验新英文 H1 与副标题不会造成不可接受的额外行数。
- 英文 H1 比中文长，桌面应保留较窄的可读列宽，移动端优先保留自然两至三行，而不是缩到低于可读字号。
- 键盘焦点、hover/focus 对比度与两枚 CTA 的最小点击面积不得低于现有约 44–48px 基线。

## 8. 实施阶段的最小 changed-files allowlist

### 首选最小范围

```text
app/page.tsx
```

仅当现有 utility 无法实现能力地图所需的布局时，Owner 可将范围**明确扩展**为：

```text
app/page.tsx
app/globals.css   # 只能新增 .home-hero-capability-map 等首页命名空间规则
```

不得把 `.home-hero`、`.button-primary`、`.button-secondary`、`.section-wrap` 的共享定义列入修改目标。不得修改 `lib/site-data.ts`、`components/page-hero.tsx`、导航、metadata、SEO、sitemap、路由或配置。

## 9. 风险、待确认项与停止条件

### 风险

1. `.home-hero` 是跨页面类；直接换其背景会影响 `/solutions`、`/delivery-process` 等页面，属于越出 Hero-only 范围的风险。
2. `lib/site-data.ts` 存在未被当前 Hero 使用的旧 `homeCopy`，未来若数据源重构，可能重新暴露与首页不一致的旧 CTA；这不是本轮的修改授权。
3. 三方向加入过多子能力会把首屏变成产品目录，并在英语与 320px 下导致高度失控。
4. “SEO/GEO、CRM、ERP 扩展、RAG、智能客服”等词容易被解读为已有产品或可保证交付；实施文案必须保留为能力方向与范围沟通。
5. 联系事实未确认；任何把 CTA 改为表单、预约、下载、电话或邮箱的提案均应停止。

### 待 Owner 确认

1. 是否批准使用本文的英文措辞，尤其是 `AI Is Reshaping Enterprise Efficiency` 与 `See how delivery works`。
2. 能力地图是桌面右侧辅助区，还是所有断点均放在 CTA 下方；建议采用“桌面右侧、移动 CTA 后纵向”的折中方案。
3. 是否接受仅改 `app/page.tsx` 的首选方案；若需定制地图样式，是否明确批准将 `app/globals.css` 加入实施 allowlist。
4. 是否维持当前深色渐变背景。若要更换背景，须先确认它不应影响复用 `.home-hero` 的其他页面，或批准首页专属命名空间实现。

### 停止条件

- Owner 未明确确认文案、视觉结构与 changed-files allowlist 前，不进入代码实施。
- 任何实现要求触及共享样式、全站导航、路由、SEO/metadata、联系流程、图片生产或新增组件时，停止并重新派单。
- 发现 `/solutions` 或 `/delivery-process` 不再存在、静态导出路径策略改变，或联系事实被误当成已激活时，停止 CTA 实施并重新核查。

## 10. 本轮变更与交付状态

- 本轮只新增本文档：`docs/OVOPS_HERO_REVIEW.md`。
- 未修改 `ts` / `tsx` / `css` / data / config / metadata / SEO / sitemap / 导航 / 路由。
- 未执行构建、开发服务、浏览器矩阵、部署、commit 或 push；既有本地预览未被本任务启动、停止或改动。
- 本文状态始终为：**REVIEW_ONLY / AWAITING_OWNER_CONFIRMATION / NO_CODE_CHANGE**。
