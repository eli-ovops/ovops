# OVOPS Hero Copy Finalization v1

> 状态：**AWAITING_OWNER_ACCEPTANCE / NO_DEPLOY / NO_COMMIT / NO_PUSH**  
> 日期：2026-07-21

## 1. 最终中文 Hero

- **H1：**AI 正在重塑企业效率
- **Subtitle：**帮助企业将 AI 真正应用于获客、销售、运营和管理，减少重复工作，提升团队效率。

## 2. 最终英文 Hero

- **H1：**AI Is Reshaping Enterprise Efficiency
- **Subtitle：**Origin Vector helps businesses put AI to work across marketing, sales, operations, and management—reducing repetitive work and improving team efficiency.

## 3. 为什么采用这版文案

这版副标题直接说明 AI 的应用范围与预期工作改善：获客/营销、销售、运营和管理；随后以“减少重复工作、提升团队效率”收束。它与 H1 的企业效率主题一致，且不增加产品、交付结果或商业承诺。

## 4. 为什么放弃其他版本

更长、更抽象，或加入“未来能力”等表达会增加首屏理解成本。最终版本保留当前最短、最直接的业务表达，不重新展开品牌讨论。

## 5. 冻结项确认

未修改 Hero DOM 结构、布局、`className`、CSS、背景、CTA、CTA href、三大能力入口、响应式或动画。未修改 H1、kicker、组件、页面布局、导航、metadata、SEO、路由、数据模型或 Solution Matrix。

## 6. changed-files 与验证结果

### changed-files

```text
app/page.tsx
docs/OVOPS_HERO_COPY_FINAL.md
```

### 精确差异边界

`app/page.tsx` 与修改前 `/tmp` 快照的差异仅为同一 Hero `<p>` 内的两条 locale subtitle 字符串；H1 与该元素的 JSX、`className`、CTA 和能力入口字节保持不变。

### 验证

- `npm run lint`：通过。
- `npm run build:zh`：在 `/tmp` 隔离副本通过。
- `npm run build:en`：在 `/tmp` 隔离副本通过。
- 静态核对：中文/英文各只有一个首页 H1；H1 文本不变；CTA href 仍为 `/solutions` 与 `/delivery-process`；三个能力入口中英文文本不变。
- 本轮未写入 allowlist 外项目文件；仓库既有未跟踪基线未触碰。

## 7. 交付边界

未部署、未 commit、未 push；本任务未触碰企业微信。
