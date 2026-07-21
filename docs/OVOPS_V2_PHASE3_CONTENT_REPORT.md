# OVOPS V2 第三阶段：业务事实定稿与预览交付准备报告

**状态：完成本地代码、内容边界和 QA；停止于 Owner 审核门禁。**  
**日期：2026-07-20**  
**权威源码：** `官网重设计前置/安全解压交接包/原点向量官网改版交接包_2026-07-17/source`  
**目标运行态：** GPT-5.6 Terra + high 已在派单中指定；当前环境未提供运行态二次回读，未将其视作已确认。  
**SOP 身份：** DS-002B SHA-256 `d197b9f3334a19ddd37db2db2972379142038b1c59d02b01f5cdee00f32c4cf2`，mtime `2026-07-19 12:32:02`，与已读版本一致，未重复全文读取。

## 1. 发布条件结论

| 结论 | 值 | 依据 |
|---|---:|---|
| `CONTENT_READY_FOR_OWNER_REVIEW` | **true** | 敏感内容已收敛至待确认状态；全站中文/英文静态构建和内容级 QA 均通过。 |
| `PREVIEW_PACKAGE_READY` | **false** | `site.yaml` 缺失；公司主体、公开联系渠道、客户/案例授权、素材版权状态与真实线索链路均未确认。 |
| `PREVIEW_DEPLOY_AUTHORIZED` | **false** | 本轮没有部署授权。 |
| `PREVIEW_DEPLOYED` | **false** | 未上传、未部署、未修改服务器或 DNS。 |

本阶段的内容可交业务 Owner 审核，但不得据此当作可公开或可预览发布的业务确认。

## 2. 本轮代码与内容控制

### 高风险事实的同源控制

- 新增 `lib/content-policy.ts`：`FactStatus`、`VerifiedFact<T>`、公开可用判定与待确认提示。
- 新增 `lib/confirmed-facts.ts`：公司主体、联系渠道、案例公开性、服务承诺、API、Portal 和素材信息全部按 `pending` 记录；变量名使用 `businessFacts`，不把候选值命名为 confirmed。
- 新增 `lib/content-visibility.ts`：基于同一事实状态输出或隐藏高风险信息。
- `lib/site-data.ts` 与布局的组织 JSON-LD 仅在对应事实 `confirmed && publicAllowed` 时输出公司全称、地址、联系信息与备案信息；当前均不输出。

### 已删除、隐藏或弱化的声明

- 联系页不显示未确认邮箱、电话、企业微信、二维码、表单提交或预约成功；Header、首页、案例总览与交付页的主联系入口改为“查看联系状态 / View contact status”。
- API 平台改为 `noindex, nofollow` 的待确认说明；不保留模型来源、API 示例、价格、注册、SLA、限流或数据保留承诺。
- 客户工作区维持 `noindex, nofollow`、不进 sitemap、次级入口；移除实际 POST 登录、密码字段、假成功和假项目数据。
- About 的创始人/团队候选图片不再公开；旧身份、规模、履历和结果类候选声明改为中性待确认文案。
- Privacy、Terms、Data deletion 页面改为无实体承诺的 `noindex` 待确认草案；`/services` 退为指向 `/solutions` 的待确认说明并从 sitemap 移除。
- Footer、`llms.txt`、sitemap 与 JSON-LD 同步移除未经确认的法律主体、联系方式、备案和次级平台索引入口。

### 已定稿审校范围

首页、solutions 总览与 6 个详情、industries 总览与 5 个详情、work 总览与 4 个详情、delivery process、FAQ、About、Contact、API、Portal、Insights 占位、Privacy、Terms、Data deletion、Header、Footer、sitemap、robots、`llms.txt` 均完成中英文事实边界审校。只做了文字长度、状态、CTA 与合规说明所需的轻量 UI 调整，未新增页面、服务、行业、案例，也未重做布局或设计系统。

## 3. 业务事实、案例与素材

### 事实统计（以记录组计）

- **CONFIRMED：0** 个可公开业务事实组。
- **PENDING：** 8 个公司主体/联系/备案组、6 项服务销售与承诺组、5 个行业能力等级组、4 个案例事实记录、7 个 API 平台字段组、5 个 Portal 安全与运营字段组。
- **DO_NOT_PUBLISH：** 未获授权的客户名、Logo、后台截图、合同/金额、量化成果、评价、用户数据、账号/API key/token、服务器信息及未证实履历。

详情见 `OVOPS_V2_BUSINESS_FACTS.md`、`OVOPS_V2_API_PLATFORM_FACTS.md`、`OVOPS_V2_PORTAL_FACTS.md`。任何代码、旧官网文案或历史材料仅为来源候选，未被提升为已确认事实。

### 案例状态与公开限制

| 候选项目 | 当前公开状态 | 公开结论 |
|---|---|---|
| 律所中英文官网与后台 | `in-development`（业务事实仍 pending） | 不展示客户名、Logo、成果、后台或上线结论。 |
| 公益基金会官网 | `in-development`（业务事实仍 pending） | 同上。 |
| 外贸家具库存查询 | `concept`（业务事实仍 pending） | 仅作为候选方向；不称试点、上线或结果。 |
| 农牧 OCR 录单与生产管理 | `pilot`（业务事实仍 pending） | 不称已验收或已产生量化结果。 |

案例详情页面的视觉状态统一显示“状态待确认 / Status pending confirmation”，避免将代码候选状态解释为 Owner 已确认的公开事实。

### 素材与脱敏

所有新素材当前为 `PENDING_APPROVAL`。需补齐深浅中英 Logo、favicon、OG/微信分享图、各案例桌面/移动/后台/流程截图的脱敏版、团队/办公/交付过程素材及逐项授权。截图必须移除姓名、电话、邮箱、客户名称、订单、金额、业务数据、登录账号、后台域名、API key/token、服务器信息与内部备注；详见 `OVOPS_V2_ASSET_REQUIREMENTS.md`。

## 4. 联系、API 与 Portal 边界

- **联系转化：** 当前无真实表单提交、邮箱、企微、负责人、CRM、重复保护或隐私授权链路的公开确认；因此不显示成功提示，不假装可预约。具体待确认项见 `OVOPS_V2_LEAD_FLOW.md`。
- **API：** 未确认运营主体、模型/来源、格式、开通、价格/充值、限流、账单、数据保留、SLA、支持、地区、合规和宣传授权；只保留次级的待确认说明。
- **Portal：** 未发送登录请求，不暴露密码或敏感值；缺少认证、用户来源、邀请、权限、会话、跨域、日志、安全责任等确认，当前只保留无数据、无登录、noindex 的说明页。

## 5. 构建与 QA 证据

### 命令与结果

```text
npm run lint                         PASS
npm run build:zh                     PASS，34 条静态路由
npm run build:en                     PASS，34 条静态路由
```

### PMO Footer 定向退回与复验（2026-07-20）

- **退回原因：** 原英文 Contact 的 375px 证据显示 Footer 仍按横向多列压缩，`Origin Vector` 与 `AI Productivity Partner` 出现逐字符换行，Site / Compliance / Contact 状态拥挤；因此移动端 QA 不通过。
- **根因：** 旧的窄屏 Footer CSS 在 `<640px` 与中文 locale 覆盖中仍将品牌、链接和联系状态放入同一行多列，并隐藏栏目标题。
- **修复：** 仅调整 `components/site-footer.tsx`（稳定 QA 锚点）和 `app/globals.css`。在 `<768px` 统一将品牌、Site、Compliance、Contact 状态改为全宽纵向区块；恢复栏目标题，链接保持自然换行，并将品牌和英文副标题的 `word-break` / `overflow-wrap` 固定为 `normal`。未恢复任何未确认联系方式、备案或业务事实。
- **复跑：** `npm run lint`、`npm run build:zh`、`npm run build:en` 均 PASS（每个构建 34 条静态路由）。
- **专向浏览器复验：** 每个 locale 在其当前 `out/` 启动临时 HTTP 服务后，Home、Contact、Portal 均覆盖 320 / 375 / 1440。断言 HTTP 200、无 404、单一非空 H1、正确 locale canonical、无横向溢出，以及 Footer 四块移动端纵向顺序、全宽最小值、栏目标题可见、品牌 bounding box、`word-break: normal`、`overflow-wrap: normal`；英文额外断言 `AI Productivity Partner` 未逐字竖排。

| Locale | 新证据 | 结果 |
|---|---|---|
| zh | `/tmp/ovops-phase3-qa/footer-retest/zh/footer-retest-records.json` 与 9 张截图 | PASS |
| en | `/tmp/ovops-phase3-qa/footer-retest/en/footer-retest-records.json` 与 9 张截图 | PASS |

该定向返修不改变发布状态：`CONTENT_READY_FOR_OWNER_REVIEW=true`，`PREVIEW_PACKAGE_READY=false`，`PREVIEW_DEPLOY_AUTHORIZED=false`，`PREVIEW_DEPLOYED=false`。

每种 locale 均在当前 `out/` 从源码根临时启动：

```text
python3 -m http.server 4183 --directory out
```

- 中文服务 PID `91197`，根目录为本源码根 `out/`；QA 后已停止。
- 英文服务 PID `91409`，根目录为本源码根 `out/`；QA 后已停止。

### 内容级 QA

脚本：`/tmp/ovops_phase3_final_qa.py`。每次先清空对应证据目录；截图前等待字体加载和页面稳定。它不是只看 HTTP 200，而是同时断言：HTTP 200、无 `404`/`This page could not be found`、单一非空 H1、标题/H1/正文标记、正确 locale canonical、无空链接、无横向溢出；另验 Portal 无 form/password 且 noindex、API 无模型/API key 文案且 noindex、sitemap/robots 均 HTTP 200 并排除 Portal/API/旧 services/法律草案页。

| Locale | 内容记录 | 截图 | 覆盖 |
|---|---:|---:|---|
| zh | `/tmp/ovops-phase3-qa/zh-fresh/content-records.json`（35 条） | 35 张 | 首页 320/375/768/1024/1440；Contact、About、API、Portal、solution、industry、4 case、Delivery、FAQ、3 合规页的 375/1440。 |
| en | `/tmp/ovops-phase3-qa/en-fresh/content-records.json`（35 条） | 35 张 | 与中文相同覆盖。 |

人工视觉复核：`zh-fresh/zh-home-1440-fresh.png` 与 `en-fresh/en-home-1440-fresh.png`。英文 1440px Header 的 Products & Platform、语言切换和 CTA 无重叠；移动和桌面截图均为本轮新文件。全新证据共 70 张截图。

## 6. 预览部署阻塞与 Owner 下一步

1. 在源码根补齐并由 Owner/Server Owner 确认 `site.yaml` 的站点身份、预览目标、发布入口、回滚与角色边界；本轮未创建它。
2. 确认公司中文/英文全称、协议/隐私/API/Portal 主体、备案展示、可公开联系渠道及对应负责人。
3. 为六项服务确认正式销售范围、非范围、Demo/阶段实施、源码/客户服务器/维护协商边界、第三方费用承担与真实 CTA。
4. 为五行业确认可主张等级；为四案例逐项提供项目状态、客户/Logo/截图/结果的公开授权，或继续保持隐藏和保守状态。
5. 提供有权使用且已脱敏的素材，并确认真实线索接收、失败反馈、隐私授权与 CRM/跟进责任。
6. API/Portal 在真实运营、安全和合规事实确认前继续保持次级、noindex、无登录与无承诺状态。

## 7. 越界检查

- 未部署、未上传、未 push、未 PR、未 commit、未创建分支。
- 未访问服务器、未修改 DNS、未改生产。
- 未发送 Portal 登录或任何真实表单/API 请求。
- 未新增业务页面、行业、服务或案例；未将候选值提升为 `CONFIRMED`，未将案例自动改为 live。
