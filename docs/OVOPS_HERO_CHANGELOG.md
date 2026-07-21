# OVOPS Homepage Hero Optimization v1 — 变更记录

> **状态：IMPLEMENTED_LOCAL / AWAITING_PMO_ACCEPTANCE**  
> **日期：2026-07-20**  
> 仅实施 Owner 已批准的首页 Hero 优化；未部署、commit 或 push。

## 1. 修改内容

- 在 `app/page.tsx` 的首页 Hero 内，将中文 H1 更新为定稿文本：**AI 正在重塑企业效率**。
- 更新中英文 kicker、H1、副标题和 CTA 可见文本；英文采用已审查的商务表达：**AI Is Reshaping Enterprise Efficiency** 与 **See how delivery works**。
- 在 Hero 内以既有 Tailwind utility 和文本节点加入“企业数字化能力地图”：
  1. 提升获客效率 / Improve customer acquisition
  2. 优化业务流程 / Streamline business operations
  3. 释放企业知识 / Unlock enterprise knowledge
- 三个节点以“品牌增长 / 企业运营效率 / 企业知识管理”组织，并把 SEO/GEO、CRM/OA/ERP 扩展、RAG 等保留为低权重说明；未把它们写成现成产品或交付承诺。
- CTA 保持站内导航：`/solutions` 与 `/delivery-process`。

## 2. 未修改内容

- 未修改 `app/globals.css`、任何共享 class、组件、数据模型、导航、路由、metadata、SEO、sitemap、Phase 6 文档或其他首页区块。
- 未新增组件、页面、图片、Mockup、依赖、表单、联系入口或外部资源。
- 未执行部署、commit、push、服务器、DNS 或生产操作。

## 3. changed-files

```text
app/page.tsx
docs/OVOPS_HERO_CHANGELOG.md
```

本轮没有写入 allowlist 外的项目文件。构建副本、浏览器 QA 脚本、JSON 结果和截图均位于 `/tmp`。

## 4. 中文/英文验证

| 项目 | 中文静态导出 | 英文静态导出 |
|---|---|---|
| 命令 | `NEXT_PUBLIC_SITE_LOCALE=zh npm run build` | `NEXT_PUBLIC_SITE_LOCALE=en npm run build` |
| 结果 | 通过：39/39 静态页面生成 | 通过：39/39 静态页面生成 |
| 首页 H1 | `AI 正在重塑企业效率`，单个 H1 | `AI Is Reshaping Enterprise Efficiency`，单个 H1 |
| locale | `zh-CN` | `en` |
| 静态检查 | `npm run lint` 通过 | 同一代码基线已覆盖 |

为遵守项目写入 allowlist，以上构建在 `/tmp/ovops-hero-qa.FYeqqU/source` 的隔离副本中完成，未改写项目的 `out/` 或 `.next/`。

## 5. 五档视口实测结果

测试方式：Playwright Chromium headless（本机 Chrome channel）+ 真实 HTTP 静态预览；每页等待 `networkidle`。临时 server 通过 `with_server.py` 在 `http://127.0.0.1:4177` 运行，运行后自动停止。所有检查均为构建后的静态导出结果。

| locale | 视口（宽 × 高） | HTTP / H1 / 文案 / CTA / overflow / console | Hero box（y, 高） | CTA 在首屏 | 三方向在首屏 | 结论 |
|---|---:|---|---:|---:|---:|---|
| zh-CN | 320 × 640 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 69, 992.3 | 是 | 仅第 1 项 | **CONDITIONAL**：三方向完整内容需向下滚动。 |
| zh-CN | 375 × 667 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 69, 954.8 | 是 | 仅第 1 项 | **CONDITIONAL**：三方向完整内容需向下滚动。 |
| zh-CN | 768 × 1024 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 553.6 | 是 | 是 | PASS |
| zh-CN | 1024 × 768 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 620.0 | 是 | 是 | PASS |
| zh-CN | 1440 × 900 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 538.0 | 是 | 是 | PASS |
| en | 320 × 640 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 69, 1249.3 | 是 | 否 | **CONDITIONAL**：英文副标题与三方向完整内容需向下滚动。 |
| en | 375 × 667 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 69, 1119.1 | 是 | 否 | **CONDITIONAL**：英文副标题与三方向完整内容需向下滚动。 |
| en | 768 × 1024 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 720.6 | 是 | 是 | PASS |
| en | 1024 × 768 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 728.0 | 是 | 是 | PASS：Hero 容器下边缘约超出 37px，但 CTA 与三方向均在首屏。 |
| en | 1440 × 900 | 200 / 1 / 通过 / 通过 / 无 / 0 error | 77, 626.0 | 是 | 是 | PASS |

“可见”与“在首屏”分开记录：十组测试中，标题、副标题、三个能力入口与两枚 CTA 均在 DOM 中可见且无裁切；窄屏的条件结论仅针对首屏内是否同时容纳全部三方向，不表示页面或交互失败。

## 6. CTA 核查

| CTA | 源码 href | 静态预览解析后的 href | 结论 |
|---|---|---|---|
| 查看解决方案 / Explore solutions | `/solutions` | `/solutions/` | 通过：静态导出将目录页规范化为尾随斜杠。 |
| 了解交付方式 / See how delivery works | `/delivery-process` | `/delivery-process/` | 通过：静态导出将目录页规范化为尾随斜杠。 |

## 7. lint/build 结果

- `npm run lint`：通过，无输出错误。
- `NEXT_PUBLIC_SITE_LOCALE=zh npm run build`：通过，TypeScript 与 39 个静态页面生成通过。
- `NEXT_PUBLIC_SITE_LOCALE=en npm run build`：通过，TypeScript 与 39 个静态页面生成通过。
- 第一次隔离构建使用指向项目外的 `node_modules` 符号链接，被 Turbopack 安全拒绝；改为复制依赖到 `/tmp` 后，两种 locale 均通过。该过程未改项目文件。

## 8. 浏览器 console / overflow / H1 / 404 结果

- 10 个 locale × viewport 组合均为 HTTP 200，无 404。
- 每个组合均检测到且仅检测到 1 个 `main h1`，文本正确。
- 10 个组合均无水平溢出、无检测到的文本裁切、无浏览器 console error。
- 所有 Hero 文案、三方向标题与 CTA 均可见；两 CTA 的解析 href 与静态导出规则一致。

## 9. 已知剩余问题

1. 在 320/375 宽度下，完整副标题、两 CTA 与三方向同时占据首屏不现实；当前优先保证定位和 CTA 在首屏，三方向可向下继续阅读。此项按验收要求标记 **CONDITIONAL**，未通过隐藏内容、缩小到不可读字体或修改共享 CSS 强行处理。
2. 英文文案天然比中文长；在 320px 时 Hero 高度为 1249.3px。若 Owner 要求“所有三方向必须在 320px 首屏内”，需要新的、明确授权的移动内容优先级或首页专属样式策略，不能在本次不改 CSS 的边界内安全完成。
3. 本轮没有替换共享 `.home-hero` 深色渐变背景；Hero 内的信息结构已避免机器人、大脑、光球、图片与未来插画，但背景是否需进一步调整应另行派单，避免影响其他复用页面。

## 10. 部署状态

部署、commit 与 push 均未执行。本地项目既有的 3000 预览未由本任务启动、停止或改写。
