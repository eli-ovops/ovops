# OVOPS 三级/三轴信息架构实施报告

> 状态：`PREVIEW_ONLY`。本次只修改本地源码与静态导出物；未部署、未推送、未提交、未创建 PR，未改服务器、DNS 或生产环境。

## 实现摘要

- 网站不再以行业作为唯一主干。访客可按 **业务目标**、**行业** 或 **典型场景** 三种方式进入同一组可讨论路径。
- `/solutions` 是 7 个业务目标总览；`/industries` 是行业入口；新增 `/scenarios` 作为 8 个典型场景的总览。
- `/work` 保持概念方案示例，未被用作场景分类，也未恢复为客户案例或项目经验页。
- 保持原有海军蓝/蓝/白视觉、静态导出与双域 locale；本轮未增加图像、动画或联系入口。

## 数据模型

`lib/content-data.ts` 新增并维护：

- `BusinessGoal`：`id`、`slug`、双语标题/摘要、客户问题、成果方向、featured、关联行业/场景字段。
- `BusinessScenario`：`id`、`slug`、双语标题/摘要、客户问题、可交付成果、关联业务目标、关联行业、featured。
- `businessScenarios` 覆盖：企业官网/门户、CRM/客户管理、库存与订单查询、企业知识库、OCR/表单录入、审批流/流程自动化、内容与线索运营、数据分析/经营看板。
- 行业扩展至教育、医疗健康、金融与金融服务，并保留制造/外贸、零售/消费、专业服务、农牧、公益等入口。全部表达为典型问题、可讨论场景与适配方向。

7 个一级业务目标：

1. 企业官网与数字化门户 / Business Websites & Digital Portals
2. 企业业务系统 / Business Systems
3. 企业知识管理 / Business Knowledge Management
4. 销售与客户管理 / Sales & Customer Management
5. 内容与营销增长 / Content & Marketing Growth
6. 自动化与工作流 / Automation & Workflows
7. 数据分析与经营看板 / Data Analytics & Operating Dashboards

`diagnosis-consulting` 不再生成一级目标或详情路由；“不知道从哪里开始”统一引导至交付方式，不保留失效旧链接。

## 路由、导航与交叉链接

| 路由 | 角色 |
| --- | --- |
| `/solutions` | 按业务目标总览，链接行业与场景。 |
| `/solutions/[slug]` | 7 个业务目标详情，显示关联行业和关联场景。 |
| `/industries` | 按行业总览，链接业务目标和场景。 |
| `/industries/[slug]` | 8 个行业详情，显示典型问题、适配目标和场景。 |
| `/scenarios` | 8 个场景的总览；每项链接相关业务目标与行业。 |
| `/work` | 概念方案示例，保持非客户实绩边界。 |

桌面 Header 使用“按业务目标、按行业、典型场景”三个紧凑下拉入口，各列重点项和“查看全部”；交付方式、关于我们保留，Portal 为次级。移动端使用 3 个可展开分组，关闭菜单后恢复页面滚动。

首页增加“三种查找方式”，仅展示 4 个重点业务目标、4 个行业、4 个场景；详情列表保留在各总览页。

## SEO 与事实边界

- 新增 `/scenarios` metadata、canonical/alternates（通过现有 metadata helper）、Breadcrumb JSON-LD 与 sitemap 项。
- `public/llms.txt` 更新为三轴结构，移除联系页、内部确认状态和不适用入口。
- Sitemap 不含 `/contact`、`/api-platform`、`/portal`；Portal 继续 noindex。
- 未新增价格、周期、客户名称、Logo、量化结果、正式上线、源码或私有部署承诺。联系/API 仍无前台 CTA。

## 修改文件

- `lib/content-data.ts`
- `lib/site-data.ts`
- `components/site-header.tsx`
- `components/detail-page.tsx`
- `app/page.tsx`
- `app/solutions/page.tsx`
- `app/industries/page.tsx`
- `app/scenarios/page.tsx`（新增）
- `app/sitemap.ts`
- `public/llms.txt`

## 验证

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过。 |
| `npm run build:en` | 通过，实际静态页数 39。 |
| `npm run build:zh` | 通过，实际静态页数 39；当前 `out/` 为最终中文构建。 |
| 静态链接扫描 | 中文 39 HTML：空链接 0、`/contact`/`/api-platform` 链接 0、失配站内路径 0；sitemap 含 `/scenarios`，不含 contact/API/portal。 |
| 公共边界扫描 | 中文前台内部审核词 0；首页信任区未确认能力词 0。`AI 营销与内容运营` 仅保留在 Insights 的采购问题标题中，不作为一级分类。 |
| 浏览器 QA | 本机 Chrome + 临时 HTTP：首页 320/375/768/1024/1440，`/solutions`、销售与客户管理详情、`/industries`、医疗健康详情、`/scenarios` 均为 HTTP 200、无横向溢出。桌面 3 个下拉可打开；移动端 3 个 `details` 分组存在，菜单无横向溢出；console error 0、HTTP 4xx 资源 0。 |
| locale | 本地 `127.0.0.1` 不显示会跳转生产域名的语言入口。 |

## 剩余风险

1. 场景是导航分类与可讨论结构，不是客户项目、真实案例或承诺交付结果。
2. 新增行业仍需要未来的已确认公开材料，才能扩展为更具体的行业内容或证明。
3. 本地构建/浏览器检查不等同预览部署或用户验收；任何发布应由唯一 deploy owner 按实时发布契约另行执行。

## P1 复核修正

- 首页最终 CTA “查看典型场景 / View scenarios” 已从 `/work` 改为 `/scenarios`，避免将场景分类与 `/work` 的概念方案示例混淆。
- 复核后 `npm run lint`、`npm run build:en`（39 页）和最终 `npm run build:zh`（39 页）均通过；当前 `out/` 仍为中文构建。
