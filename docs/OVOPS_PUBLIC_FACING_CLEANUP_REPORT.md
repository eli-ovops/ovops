# OVOPS 官网 Public-Facing Cleanup 报告

> 结论：本次仅完成本地代码与静态导出物清理，状态为 `PREVIEW_ONLY`。未部署、未推送、未创建提交，也未改动正式环境、DNS 或服务器配置。

## 范围与依据

- 清理目标：移除未核实的内部状态、Owner/PENDING 类词汇、空白联络入口和未经验证的客户实绩表述。
- 交付 SOP：`DS-002B_website_delivery_sop_v2.md`，mtime `2026-07-19T12:32:02Z`，SHA-256 `d197b9f3334a19ddd37db2db2972379142038b1c59d02b01f5cdee00f32c4cf2`。
- 未改动事实与验证来源：`lib/confirmed-facts.ts`、`lib/business-facts.ts`、`lib/content-policy.ts` 及 Phase 3 研究材料保持原样。

## 已完成的 P0

| 项目 | 处理结果 |
| --- | --- |
| 内部术语 | 页面不再展示 `Owner`、`PENDING`、`待确认`、`需核实`、`建议首批`、`查看联系状态`、`真实经验核实`、`状态待确认`、`审核` 等词。 |
| 联系入口 | 头部、页脚和 CTA 不再提供 `/contact` 链接；`/contact` 与 `/api-platform` 使用站点 Not Found，不保留占位或空表单。 |
| 案例表达 | 四个案例统一为“典型业务场景 / Typical Business Scenario”；卡片、详情、相关内容与 JSON-LD 不再把它们写成客户项目或已交付实绩。 |
| 交付流程 | 全站采用 7 步：初步沟通、业务诊断、范围确认、原型或 Demo、开发与测试、上线与培训、验收与维护；英文使用对应自然表达。 |
| 本地语言切换 | 本地 `localhost` / `127.0.0.1` 不显示会跳转至生产域名的语言链接。 |
| CTA 与链接 | CTA 改为站内 Solutions、Work 或 Delivery Process；无 `#`、空 href、`javascript:` 或失效的站内路径。 |

## 已完成的 P1

- 首页、解决方案、行业页和 About 移除夸大的承诺或未证实的身份/素材表述，改为问题、范围、资料和交付边界导向的短文案。
- Portal 改为邀请制协作入口说明并设为 `noindex`，不再有未实现登录或“待确认”状态。
- Insights 改为采购问题主题列表，英文页面已使用英文标题，不再显示内部待发布文章状态。
- 新增根目录 `PRODUCT.md` 与 Impeccable Live 配置，明确克制、可信、可读和 WCAG AA/320px 的设计约束；未重做现有设计系统。

## 主要修改面

- 内容与案例：`lib/content-data.ts`、`components/content-sections.tsx`、`app/work/page.tsx`、`components/detail-page.tsx`、`app/insights/page.tsx`。
- 导航、CTA 和品牌页：`lib/site-data.ts`、`components/site-header.tsx`、`components/site-footer.tsx`、`components/cta-band.tsx`、`app/page.tsx`、`app/about/page.tsx`、`app/services/page.tsx`、`app/industries/page.tsx`、`app/delivery-process/page.tsx`。
- 不可用入口与辅助页：`app/contact/page.tsx`、`app/api-platform/page.tsx`、`app/portal/page.tsx`、`app/privacy/page.tsx`、`app/data-deletion/page.tsx`、`app/terms/page.tsx`。

## 验证记录

| 验证 | 结果 |
| --- | --- |
| `npm run lint` | 通过。 |
| `npm run build:zh` | 通过，静态生成 34 个路由。中文构建快照：`/tmp/ovops-public-cleanup-zh-final.v7DxUV/out`。 |
| `npm run build:en` | 通过，静态生成 34 个路由；随后执行最终中文构建，当前 `out/` 为中文。 |
| 静态 HTML 扫描 | 中文和英文各 34 个 HTML：内部术语命中 0、假 href 0、`/contact` 链接 0、失配站内路由 0；7 步词组均存在。 |
| 浏览器矩阵 | 使用本机 Chrome + Playwright，在临时 HTTP 服务上完成中文 70 检查和英文 70 检查：14 个 P0 页面 × 320/375/768/1024/1440。检查 HTTP 200、横向溢出、可见内部术语、假 href 和 `/contact` 链接，均通过。 |

浏览器截图（320 与 1440 宽度的证据）保存在：

- `/tmp/ovops-public-cleanup-browser-matrix/zh`
- `/tmp/ovops-public-cleanup-browser-matrix/en`

`/contact` 与 `/api-platform` 为静态 Not Found 页面：本地静态服务仍可返回该导出页面的 HTTP 200；这不是可用的联系或 API 功能，也不构成发布或用户验收。

## 后续边界

1. 联系邮箱、表单后端、电话、办公地址、API 文档或真实客户案例在获得可公开验证的材料前，继续保持隐藏或 Not Found。
2. 新增客户 Logo、合作伙伴、团队照、认证或业务结果前，须先补充可公开使用的事实、授权与素材来源，再进行内容更新。
3. 如需预览部署，应由唯一部署 owner 按项目实时 `guide/status`、包验证和浏览器验收门禁另行执行；本报告不构成部署授权。

## 第二轮最小修正（PMO 抽查后）

- 导航将 `/work` 统一改为“典型场景 / Scenarios”；`/work` 的 Breadcrumb 改为“典型业务场景 / Typical Business Scenarios”。
- Sitemap 移除了 `/contact`，且本次实际输出不含 `/contact`、`/api-platform`、`/portal`。
- 首页改为摘要页：4 个常见问题、3 个服务方向、3 个行业场景、2 个典型业务场景；各列表均保留前往完整列表的站内链接。七步交付改为紧凑的有序时间线。
- 首页将“六类可采购服务”改为“六类服务方向 / Six service directions”；服务卡增加“业务目标 / Business goal”，并将交付物标签改为“可交付成果示例 / Example deliverables”。
- 信任区删除“支持分阶段试点、客户自有服务器部署、源码提供、维护售后”等未确认能力表述，新增只含范围说明、原型评审记录、测试与验收清单的概念文档结构示意。
- 语言入口现在只在 `ovops.com` 或 `www.ovops.com` 显示；localhost、loopback、局域网和预览主机默认隐藏。
- 首页场景卡标签改为“常见问题 / Common problem”、“方案方法 / Proposed approach”、“性质说明 / Classification”。

第二轮复验：`npm run lint`、英文构建（34 路由）和最终中文构建（34 路由）均通过。中文 `out/` 保留为最终构建，用于本地预览；第二轮静态扫描确认禁词、假链接、`/contact` 链接、未确认信任表述与 sitemap 禁止项均为 0。浏览器抽测使用本机 Chrome：中文首页在 320、375、768、1440 宽度均为 HTTP 200、无横向溢出、H1 和 CSS 正常；`/work`、`/sitemap.xml` 通过检查，首页和 Work 页面无 console error 或 HTTP 4xx 资源。语言入口在 `localhost`、`127.0.0.1`、`0.0.0.0` 和本机局域网地址均不显示。
