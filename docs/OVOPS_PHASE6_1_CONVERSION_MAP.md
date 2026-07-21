# OVOPS Phase 6.1｜Conversion Architecture & Information Flow

> **PLANNING_ONLY · INTERNAL REVIEW · 非实施授权**  
> 日期：2026-07-20。此文件定义未来的站内信息流与转化门禁，不代表当前已经部署 Analytics、表单、预约、下载、CRM、Portal 或 Contact 渠道。

## 0. 转化定义与 CTA 总原则

在当前事实状态下，“转化”只能是访客从模糊问题进入更具体的站内理解：**Awareness → Understanding → Evaluation → Trust → Action/Stop**。Action 不是提交表单；当联系渠道未确认时，正确 Action 是继续浏览、查看交付方式或明确停止评估。

- `CURRENT_REAL`：站内真实浏览 CTA。
- `PLANNED_GATED`：仅在渠道、资产、隐私、Owner、成功/失败状态确认后启用。
- `HIDDEN_UNTIL_CONFIRMED`：联系、报价、下载、预约、账号/API/Portal 写入及其所有成功状态。
- 每个主要区块最多 1 主 CTA + 1 次 CTA；次 CTA 必须是不同的信息意图，不能重复把用户推向未激活联系。

## 1. 首页模块 Conversion Map

| 首页模块 | 存在理由 / 阶段 | 客户问题与所需证据 | 主 / 次 CTA | 下一页面 |
|---|---|---|---|---|
| 首屏问题定位 | Awareness | “我是不是需要先换工具？”；证据是可讨论问题、非范围与无承诺语言 | 主：`CURRENT_REAL` 查看能力；次：查看典型场景 | Capability / Scenario |
| 三轴入口 | Awareness → Understanding | “按能力、行业还是场景找？”；证据是当前 8 域、8 行业、S01–S29 映射 | 主：按业务能力；次：按行业或场景 | Capability / Industry / Scenario |
| 常见问题 | Awareness | “这类问题是否普遍且可说明？”；证据是问题陈述，不是客户结果 | 主：查看场景；次：FAQ | Scenario / FAQ |
| 能力地图 | Understanding → Evaluation | “哪些能力相关、应从哪里开始？”；证据是 maturity、相邻关系、非范围 | 主：当前核心能力；次：交付方式 | Capability / Delivery |
| 行业组合 | Understanding | “我的行业可能优先看哪些问题？”；证据是 `CURRENT_VIEW`/`GENERAL_COMBINATION` 标签和风险边界 | 主：当前行业页；次：全部行业 | Industry |
| 典型路径 | Evaluation | “公开信息→客户协同→知识→服务→复盘如何关联？”；证据是 Solution Graph，不是集成承诺 | 主：相关场景；次：方法/交付方式 | Scenario / Delivery |
| 方法与信任 | Trust | “如何避免范围失控、资料误用？”；证据是范围、原型、测试、验收与风险边界 | 主：交付方式；次：FAQ/About | Delivery / FAQ / About |
| Concept Work | Trust | “没有案例时如何理解形态？”；证据是 `Typical Scenario / Concept Demo` 明示 | 主：典型场景；次：能力页 | Work / Scenario / Capability |
| Action 区 | Action | “下一步能做什么？”；证据是实际渠道状态 | 当前仅：查看场景/交付方式；未来范围沟通为 `PLANNED_GATED` | Scenario / Delivery；联系未确认时不去 Contact |

## 2. 页面类型流与边界

| 页面类型 | 上游入口 | 主要工作 | 下游 / 相关项 | CTA 门禁 |
|---|---|---|---|---|
| Home | 直接、搜索、分享 | 按问题分流，不做产品清单 | Capability、Industry、Scenario、FAQ、Delivery | 仅 `CURRENT_REAL` 浏览 CTA |
| Capability | Home、Scenario、Industry、Insight | 解释能力、maturity、非范围、相关问题 | Scenario、Industry、Delivery、FAQ | 单一主 CTA 为相关场景或交付方式 |
| Industry | Home、Capability、搜索 | 以组合与风险解释适配，不写行业经验 | Capability、Scenario、FAQ | 候选行业不出现联系 CTA |
| Scenario | Home、Capability、Industry | 解释具体问题、相邻能力、资料/风险 | Capability、Industry、Delivery、FAQ | 先浏览；范围沟通仅 `PLANNED_GATED` |
| Insight（仅规划） | Capability、Scenario、搜索 | 回答一个可验证问题，不能做内容农场 | 相应 Capability/Scenario | 路由与事实审核前不链接、不进 sitemap |
| Work / Concept | Home、Capability | 展示概念结构，不冒充客户项目 | Scenario、Delivery、FAQ | 必有“非客户实绩”标签；不引导提交 |
| Delivery Process | 全站 | 解释问题梳理、范围、原型、测试、验收 | FAQ、About、相关 Scenario | Action 仅计划态；没有渠道时不放联系按钮 |
| FAQ | 全站 | 处理风险、边界、术语与不适配 | Capability、Scenario、Delivery | 真实站内链接；无下载/预约承诺 |
| About | Trust | 说明方法与边界，不写团队/资质/规模候选值 | Delivery、FAQ | 不放未确认联系信息 |
| API / Portal | 次级 | 保持产品/账号边界，不把未实现能力变入口 | Not Found 或 noindex 现状 | 不展示试用、登录、写接口或申请入口 |
| Contact | 不作为可用转化页 | 当前联系事实未确认 | 应从公开导航/CTA 隐藏；现有 Not Found 边界 | `HIDDEN_UNTIL_CONFIRMED` |

## 3. 分阶段 CTA 策略

| 阶段 | 目标 | 允许 CTA | 禁止 CTA |
|---|---|---|---|
| Awareness | 找到问题入口 | 查看能力、行业、场景、FAQ | “立即咨询”“免费诊断”“获取报价” |
| Understanding | 对照问题、行业与风险 | 查看相关项、交付方式、FAQ | 下载清单、收集邮箱、表单提交 |
| Evaluation | 比较能力边界与相邻路径 | 查看典型路径、Concept Work、Delivery | “申请 Demo”“开始试用”“连接系统” |
| Trust | 验证方法、边界与资料要求 | About、FAQ、Delivery、相关 Scenario | 客户 Logo/成果、SLA、认证、预约承诺 |
| Action | 合法进入下一步或停止 | 当前：继续浏览；未来：已确认范围沟通 | 伪表单、伪成功、未授权二维码/邮箱、隐形数据收集 |

## 4. 内链规则

1. **每页一个上游解释。** Capability/Industry/Scenario 必须可回到其总览或 Home，避免孤页。
2. **每页一个下游问题。** Capability 至少指向 2 个真实 Scenario；Scenario 至少指向 1 个 Capability 与 1 个相关 Industry 或 Delivery。
3. **相关项不循环。** A→B→A 只能作为面包屑或一条相关链接；正文 CTA 应推动理解深化（问题→能力→场景→方法），不在两页间反复跳转。
4. **未上线 Insight 不链接。** 规划 slug 只留在内部规划，不能生成死链、sitemap 项或占位卡片。
5. **Concept 不替代证据。** Work 页只连 Scenario/Delivery/FAQ，不应成为“案例”终点。
6. **CTA 克制。** 每个首屏或主要区块至多主/次 2 个；末尾允许一个与当前意图不同的真实站内 CTA。

## 5. Homepage Conversion Map（概念流）

```text
搜索/直接访问
  → 首页：问题定位
  → 三轴分流：能力 | 行业 | 场景
  → 问题理解：风险、资料、相邻能力
  → 评估：典型路径、Concept Demo、非范围
  → 信任：方法、FAQ、Delivery、About
  → Action：当前继续浏览；未来已确认范围沟通
  → Stop：资料/权限/适配/渠道不满足时，不收集数据、不假装可联系
```

## 6. 全站 Information Flow

```text
Home
 ├─ Capability (8-domain future map; current 7 solution routes)
 │   ├─ Scenario (S01–S29 problem entries)
 │   ├─ Industry (combination/risk views)
 │   ├─ FAQ / Delivery
 │   └─ Insight (planning only; no route until approved)
 ├─ Industry → Capability + Scenario + FAQ
 ├─ Scenario → Capability + Industry + Delivery + FAQ
 ├─ Work/Concept → Scenario + Delivery (never customer-proof)
 ├─ Delivery → FAQ + related Scenario
 └─ About → Delivery + FAQ

Portal/API/Contact: secondary boundary; no active lead/credential/write path until Owner confirmation.
```

## 7. 概念性、隐私友好的转化衡量框架

**这不是已部署 Analytics。** 在未确认隐私主体、Cookie、工具、保留期、数据处理与 Owner 前，不采集个人信息或把行为跟踪写为既有能力。

| 可讨论的非个人化信号 | 说明 | 未来启用门禁 |
|---|---|---|
| 匿名页面路径深度 | 能力→场景→交付方式的内容理解路径 | 合法工具、最小化、隐私说明、保留期、Owner |
| 匿名内容完成信号 | FAQ 展开、滚动到方法/风险区（仅作概念） | 不使用指纹或跨站追踪；需技术/隐私审查 |
| 站内 CTA 去向 | 真实内部链接是否帮助访客继续理解 | 只计聚合指标；不得记录联系意图为个人档案 |
| 内容缺口反馈 | 未来受控、明确同意的反馈机制 | 明确目的、字段、失败/删除路径与响应 Owner |

## 8. 移动端、空状态与失败路径

- **移动端：** 三轴与八域使用折叠分组；路径图改为单列步骤；CTA 保持每区 1–2 个，避免粘性联系按钮。
- **空状态：** 没有相应行业材料、Insight、下载资产或联系渠道时，显示“当前未提供此公开资产”，并给一个真实站内替代路径（FAQ/Scenario/Delivery），不显示空卡或 fake CTA。
- **失败路径：** 路由不存在进入 Not Found；资料/权限/安全未满足时说明“需要专项确认”，回到 Delivery 或停止评估；表单/预约若未来失败必须提供明确失败反馈，不得静默丢失。

## 9. Conversion 风险登记与 Activation Gates

| 风险 | 影响 | 门禁 / Owner |
|---|---|---|
| 未确认联系方式 | 伪转化、无响应 | 渠道、公开许可、责任人、失败反馈确认前隐藏 |
| 资料下载无版权/版本 | 错误资产或侵权 | 文件、版本、Owner、版权、隐私、撤回策略 |
| 表单无隐私/后端 | 个人数据风险、伪成功 | 目的、字段、同意、存储、保留、删除、反滥用、成功/失败、Owner |
| 行业/案例过度表达 | 误导与信任损失 | `CURRENT_VIEW`/`GENERAL_COMBINATION`/`FUTURE_CANDIDATE` 标签与事实审校 |
| 复杂路径导致循环 | 跳出、理解下降 | 上游/下游/相关项规则与 CTA 数量上限 |
| Analytics 先于隐私 | 未授权追踪 | 隐私主体、工具、最小化与保留策略确认前不部署 |
| Portal/API 误导 | 暗示可用账号/写接口 | 维持 noindex/Not Found；身份、权限、系统、Owner 确认后再设计 |

## 本次范围

仅新增本规划文档；不实施页面、导航、SEO、表单、Analytics、下载、Contact、Portal/API 或任何代码变更；无需 npm build。
