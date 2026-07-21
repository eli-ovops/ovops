# OVOPS 静态导出资源诊断

日期：2026-07-20  
范围：仅检查 Next.js `output: "export"` 产物的本地资源加载与预览方式；未修改业务页面、文案、SEO 规则、部署或生产环境。

## 结论

`out/` 是面向 **HTTP 静态站点根目录** 的正确 Next.js 静态导出，不是可通过 Finder 双击 `file://` 离线运行的单文件包。

- `file://`：**不支持**。根路径资源会解析到 macOS 文件系统根目录，导致 CSS、JS、图片和图标失败；这就是“没有加载 UI”的根因。
- HTTP 静态预览：**通过**。中英文各导出 34 个页面；所有扫描到的本地 HTML/CSS 资源均能映射至 `out/` 内实际文件，浏览器与 HTTP 检查均无资源 404。
- 不应通过 `assetPrefix: "./"` 或修改 `basePath` 强行适配 `file://`。多层静态路由会因此把资源解析到 `out/solutions/_next/` 等错误位置，并会破坏根域名部署契约、canonical、hreflang 和静态托管路径。

## 复现

导出首页：

```text
file:///.../source/out/index.html
```

该页面中的资源引用是根路径：

```text
/_next/static/chunks/05uycvxvex_89.css
/_next/static/chunks/*.js
/favicon.png
/origin-vector-logo-en.webp
```

浏览器按 `file://` URL 标准把它们解析为：

```text
file:///_next/static/chunks/05uycvxvex_89.css
file:///favicon.png
file:///origin-vector-logo-en.webp
```

而真实资源位于：

```text
out/_next/static/chunks/05uycvxvex_89.css
out/favicon.png
out/origin-vector-logo-en.webp
```

Playwright（系统 Chrome）在最终英文构建上复现得到 13 个关键请求 `net::ERR_FILE_NOT_FOUND`、0 条 CSS 规则、0 张加载成功的图片和 13 条 console 错误；H1 的预渲染文字仍在，因此表现可能是“只有无样式文字”或近似白屏，而不是源代码没有导出 HTML。

## 假设与证伪

| 假设 | 可证伪预测 | 结果 |
| --- | --- | --- |
| A. `output: "export"` 或 `basePath` 配置错误 | 构建不生成 `out/` 或 HTTP 下 `/_next` 资源 404 | 证伪：`next.config.mjs` 已设 `output: "export"`、`trailingSlash: true`，未设不必要的 `basePath`/`assetPrefix`；HTTP 资源均为 200。 |
| B. CSS、JS、图片实际没有导出 | `out/_next/static` 或 `public` 拷贝资源缺失；全量引用扫描有缺失 | 证伪：CSS、JS 均在 `out/_next/static/`；中英文扫描均为 0 个缺失本地资源。 |
| C. `next/image` 在静态导出中请求了不可用的 `/_next/image` 优化接口 | 浏览器网络出现 `/_next/image` 请求或该路径 404 | 证伪：产物中的图片是直接静态文件路径，浏览器无 `/_next/image` 404。 |
| D. `file://` 对根路径 URL 的解析错误 | 同一 `/_next/...` URL 在 `file://` 下失败、在 HTTP 根目录下成功 | 确认：`file:///_next/...` 不存在；`http://127.0.0.1:<port>/_next/...` 返回 200。 |

## 配置审查

项目 `source/` 根目录未发现项目级 `AGENTS.md` 或 `site.yaml`；本次没有创建它们。父级目录中存在其他原型的同名文件，但不属于本项目导出契约，未采用。

`next.config.mjs` 保持正确：

```js
output: "export",
trailingSlash: true,
```

- 未配置 `basePath`：正确。当前导出预期部署于域名根目录。
- 未配置 `assetPrefix`：正确。根路径资源让静态服务器可从站点根目录稳定提供资源。
- `trailingSlash: true`：正确。导出产生目录式 `route/index.html`，可由常规静态服务器访问。
- CSS：导出到 `out/_next/static/chunks/*.css`。
- JS：导出到 `out/_next/static/chunks/*.js`。
- 图片/图标：`public/` 内容已复制到 `out/`。
- 字体：本站使用系统字体栈，未发现需要导出的 Webfont 文件或外部字体请求。

## 最小修复

修改 [package.json](../package.json)：

1. 将不适用于 `output: "export"` 的 `next start` 替换为 `npx --yes serve out`。
2. 新增同样的 `preview` 脚本。

```json
"start": "npx --yes serve out",
"preview": "npx --yes serve out"
```

没有修改 `next.config.mjs`、页面、样式、资源引用或双域名 SEO 逻辑，因为 HTTP 导出路径已正确；为 `file://` 改写它们会产生更大的部署回归风险。

## 正确本地预览方式

先构建目标语言，再从 `source/` 目录启动 HTTP 静态服务器：

```bash
npm run build:zh
npm run preview
```

或：

```bash
npm run build:en
npx serve out
```

命令会打印实际本地地址，例如 `http://localhost:3000`；若默认端口被占用，`serve` 会选择并打印可用端口。需要固定端口时使用：

```bash
npx serve --listen 4174 out
```

然后打开打印出的 `http://localhost:<port>/`。不要双击 `out/index.html`，也不要使用 `file://` 地址。

## 验证结果

### 构建与静态导出

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run build:zh` | 通过，34 页 |
| 中文导出资源扫描 | 34 个 HTML、43 个本地 HTML 引用、1 个 CSS、0 个 CSS `url()` 引用、0 个缺失 |
| `npm run build:en` | 通过，34 页 |
| 英文导出资源扫描 | 34 个 HTML、42 个本地 HTML 引用、1 个 CSS、0 个 CSS `url()` 引用、0 个缺失 |

### HTTP 路由与资源

使用 `npx serve out` / `npm run preview` 验证，以下均为 HTTP 200：

```text
/
/solutions/
/industries/manufacturing-export/
/work/law-firm-bilingual-site/
/faq/
/contact/
/_next/static/chunks/05uycvxvex_89.css
/origin-vector-logo-{locale}.webp
```

### 浏览器 QA

通过 Playwright 使用本机 Google Chrome（headless）检查 HTTP 预览：

| 页面 | 宽度 | H1 可见 | CSS 规则 | 图片损坏 | 横向溢出 | Console/HTTP 错误 |
| --- | ---: | --- | ---: | ---: | --- | --- |
| 首页 | 375 | 是 | 609 | 0 | 否 | 0 / 0 |
| 首页 | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |
| 解决方案 | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |
| 行业详情 | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |
| 案例详情 | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |
| FAQ | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |
| 联系页 | 1440 | 是 | 609 | 0 | 否 | 0 / 0 |

首页主 CTA `Explore solutions` 已测试，可从 `/` 正常进入 `/solutions/`，目标页 H1 可见，无 console 或 HTTP 错误。

## 剩余边界

1. `out/` 是 HTTP 静态托管包，不承诺 `file://` 离线双击兼容。
2. `serve` 仅用于本地预览，不是预览站或生产发布；本轮未部署、上传、push、提交或修改服务器/DNS。
3. `out/` 每次构建只保存最近一次 locale；需要验收中文和英文时分别运行 `build:zh`、`build:en`，或为每个 locale 复制到独立验收目录后再托管。
4. 如未来必须交付可双击的离线包，应另行设计为专用离线产物（相对资源路径、路由策略、无服务端/客户端导航依赖），不能把当前 SEO 静态站的 `out/` 直接当作该交付物。
