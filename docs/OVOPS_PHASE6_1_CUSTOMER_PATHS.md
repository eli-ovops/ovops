# OVOPS Phase 6.1｜Customer Paths

> **PLANNING_ONLY · INTERNAL REVIEW · 非实施授权**  
> 日期：2026-07-20。以下是购买理解路径，不是客户案例、实际漏斗数据、交付承诺或当前可提交的联系流程。所有 Action 遵守 `CURRENT_REAL / PLANNED_GATED / HIDDEN_UNTIL_CONFIRMED` 门禁。

## 路径阅读规则

- `D1–D8` 对应 Phase 6 八个一级能力域；`S01–S29` 对应问题场景；maturity 沿用 Phase 6。
- `CURRENT_VIEW` 是已有行业入口；`GENERAL_COMBINATION` 和 `FUTURE_CANDIDATE` 不表示行业经验。
- “Action 成功信号”是访客完成一个**真实站内理解动作**，而不是提交、成交或项目启动。需要联系/资料处理时必须转为 `PLANNED_GATED`，条件不全即隐藏或停止。

## 24 条完整客户路径

| # / Persona / 行业状态 | 触发问题与入口 | Awareness → Understanding → Evaluation → Trust → Action | 备用路径 / 阻塞与退出 | 追溯与成功信号 |
|---|---|---|---|---|
| P01 CEO；制造与外贸 `CURRENT_VIEW` | “库存、订单和项目状态为什么各说各话？”；搜索/首页 → S13 | 识别状态不清 → 读 S13 数据来源/人工核验 → 比较 D4/D7/D8 边界 → Delivery/FAQ 了解资料与例外 → `CURRENT_REAL` 查看相关场景；未来范围沟通 `PLANNED_GATED` | 转 S14/S27；若要求实时 ERP/准确库存/系统写回，停止评估 | D4,D7,D8；S13；`ASSESSMENT_FIRST`；成功：到达场景与交付方式 |
| P02 运营负责人；物流 `GENERAL_COMBINATION` | “同一订单在不同系统状态不同”；行业组合 → S14 | 状态冲突 → 读角色/例外 → 比较流程与集成发现 → 风险/现有系统 Owner → 场景/Delivery | 转 S26；无系统 Owner 或接口权限即退出 | D4,D7,D8；S14/S26；`ASSESSMENT_FIRST` / `INTEGRATION_OR_PARTNER`；成功：理解先做发现而非集成承诺 |
| P03 销售负责人；专业服务 `CURRENT_VIEW` | “线索、客户和跟进在个人表格里”；首页 → S06 | 客户记录分散 → 阶段/交接问题 → D2 与 D6/D7 边界 → FAQ 的权限与迁移限制 → 能力/场景浏览 | 转 S07；若要求导入全部客户数据或 CRM 替换，停止/专项确认 | D2；S06/S07；`CURRENT_CORE`；成功：选择一个问题入口 |
| P04 销售+运营；制造 `CURRENT_VIEW` | “报价版本和审批总在反复”；搜索 → S08 | 报价反复 → 资料/责任/例外 → D2+D4+D7 相邻路径 → Delivery 的范围/验收 → `CURRENT_REAL` Delivery | 转 S17；若需 ERP、价格/周期承诺或生产写回，退出 | D2,D4,D7；S08；`ASSESSMENT_FIRST`；成功：到达非范围说明 |
| P05 市场负责人；零售 `CURRENT_VIEW` | “官网、FAQ 和内容各说各话”；首页 → S03 | 发现口径断裂 → 资料/审校问题 → D1+D6 与 S04 → FAQ/Concept Work → 场景/能力浏览 | 转 S04；若要求排名、流量或广告结果，退出 | D1,D6；S03/S04；`CURRENT_CORE`；成功：查看内容问题与方法 |
| P06 CEO；科技/B2B `GENERAL_COMBINATION` | “客户看不懂我们做什么”；直接访问 → S01 | 公开信息不清 → 信息架构/采购问题 → D1 与 S06 的关系 → About/Delivery 方法 → 能力/场景 | 转 S03；无业务 Owner 或要复制竞品，停止 | D1,D6；S01；`CURRENT_CORE`；成功：进入能力总览 |
| P07 客服负责人；酒店 `GENERAL_COMBINATION` | “客户问题没有合适入口”；行业组合 → S10 | 服务入口不清 → 阅读知识/转人工边界 → D3+D6 → FAQ/Delivery → `CURRENT_REAL` 场景 | 转 S11；要求全天候客服或 SLA 即退出 | D3,D6；S10/S11；`ASSESSMENT_FIRST`；成功：确认人工升级是必要条件 |
| P08 客服负责人；餐饮 `GENERAL_COMBINATION` | “同样问题反复出现，没人回流”；首页 → S12 | 反馈散失 → 反馈分类/内容关系 → D3+D1+D8 → 方法/FAQ → 仅查看相关能力 | 转 S03；无反馈 Owner 或要求自动化结果则停止 | D3,D1,D8；S12；`FUTURE_CANDIDATE`；成功：识别为未来候选，不形成承诺 |
| P09 知识负责人；教育 `CURRENT_VIEW` | “课程、FAQ 和制度没人维护”；行业页 → S21 | 资料难维护 → 来源/版本/权限 → D6 与 S22 → FAQ/Delivery → 知识能力页 | 转 S18；课程版权/学习者隐私不清即退出 | D6,D5；S21/S22/S18；`CURRENT_CORE` / `FUTURE_CANDIDATE`；成功：到达资料治理边界 |
| P10 教育机构负责人；教育 `CURRENT_VIEW` | “招生/课程入口和资料权限怎样分开？”；行业页 → S02/S05 | 入口不清 → 公开/受邀边界 → D1+D6+治理 → FAQ/Delivery → 当前只浏览 | 转 S20；学习者数据、登录或下载要求未确认即隐藏 Action | D1,D6；S02/S05/S20；`CURRENT_CORE` / `ASSESSMENT_FIRST`；成功：理解无 Contact/Portal 承诺 |
| P11 专业服务负责人；专业服务 `CURRENT_VIEW` | “双语服务与客户资料如何公开？”；行业页 → S01/S20 | 公开结构 → 来源/权限/审校 → D1+D6 → FAQ/About → 能力/交付方式 | 转 S05；案件、客户名、案例或法律结论要求即退出 | D1,D6；S01/S20/S05；`CURRENT_CORE`；成功：看到公开边界 |
| P12 IT/安全；金融 `CURRENT_VIEW` | “客户资料谁能看，如何保留？”；FAQ → S09 | 权限疑问 → 数据/角色/保留问题 → 治理与 D2 边界 → Delivery/FAQ → 停留在站内浏览 | 转 S20；任何具体安全、合规、生产连接需求均停止专项确认 | D2+治理；S09/S20；`DO_NOT_CLAIM`；成功：明确不适配/停止评估 |
| P13 财务/数据；金融 `CURRENT_VIEW` | “指标口径不同，会议无法决定”；行业页 → S27 | 口径冲突 → 来源/抽查/Owner → D8 与 S28 → FAQ/Delivery → 能力页 | 转 S29；要求预测、实时或财务结论即退出 | D8+治理；S27/S28/S29；`CURRENT_CORE` / `DO_NOT_CLAIM`；成功：理解核验先于看板 |
| P14 运营负责人；农牧 `CURRENT_VIEW` | “批次、巡检和录单不可追溯”；行业页 → S15 | 记录断层 → 表单/异常/人工核验 → D4+D7 → S16/Delivery → 场景浏览 | 转 S16；现场网络、数据来源或责任不明则停止 | D4,D7；S15/S16；`ASSESSMENT_FIRST`；成功：识别资料与人工核验前置 |
| P15 公益负责人；公益 `CURRENT_VIEW` | “项目透明度与受益人隐私如何兼顾？”；行业页 → S02/S05 | 公开需求 → 公开/受邀/隐藏边界 → D1+D6+治理 → FAQ/Delivery → 当前站内路径 | 转 S19/S25；受益人/捐赠信息未获许可即退出 | D1,D6,D7；S02/S05；`ASSESSMENT_FIRST`；成功：选择不公开敏感资料 |
| P16 项目负责人；公益 `CURRENT_VIEW` | “志愿者/项目协作靠转发和催办”；行业页 → S23/S25 | 协作断层 → 角色/例外/人工复核 → D6+D7+D5 → Delivery → 场景 | 转 S19/S24；若要账户/Portal/自动写入，隐藏并停止 | D5,D6,D7；S23/S25/S19；`ASSESSMENT_FIRST` / `FUTURE_CANDIDATE`；成功：理解协作只是评估方向 |
| P17 公共机构负责人；公共 `FUTURE_CANDIDATE` | “公开资料、服务问题与流程如何组织？”；搜索 → S05/S11 | 识别公共服务问题 → 风险/无障碍/政务数据边界 → D1+D3+D6+D7 → FAQ/Delivery → 不激活联系 | 转 S24；公共采购、政务数据或政府案例要求即明确退出 | D1,D3,D6,D7；S05/S11/S24；`FUTURE_CANDIDATE`；成功：候选标签被理解 |
| P18 HR 负责人；酒店/餐饮 `GENERAL_COMBINATION` | “新人培训全靠老师傅”；行业组合 → S18 | 培训依赖个人 → 资料/岗位/采用 → D5+D6 → S19/FAQ → 相关场景 | 转 S21；招聘、薪酬、绩效或劳动合规诉求即退出 | D5,D6；S18/S19/S21；`FUTURE_CANDIDATE`；成功：不误解为 HCM |
| P19 运营负责人；酒店 `GENERAL_COMBINATION` | “采购资料和审批脱节”；搜索 → S17 | 协同断裂 → 资料/审批/供应关系 → D4+D6+D7 → Delivery → 场景 | 转 S24/S26；PMS/采购系统接入需求未确认即停止 | D4,D6,D7；S17/S24/S26；`FUTURE_CANDIDATE` / `INTEGRATION_OR_PARTNER`；成功：了解需要系统 Owner |
| P20 医疗健康负责人；医疗 `CURRENT_VIEW` | “健康教育资料与内部流程记录怎样分开？”；行业页 → S11/S16 | 区分公开教育/内部记录 → 隐私/监管/人工复核 → D1+D6+D7 → FAQ/Delivery → 当前浏览 | 转 S20；医疗建议、患者数据、监管要求未确认即停止 | D1,D6,D7；S11/S16/S20；`ASSESSMENT_FIRST`；成功：安全/隐私未满足的负向路径被明确 |
| P21 科技/B2B 内容负责人；科技 `GENERAL_COMBINATION` | “采购问题没有可检索答案”；内容入口 → S04/S22 | 问题不可检索 → 来源/禁说/转人工 → D1+D6 → FAQ/Concept Work → 场景 | 转 S03；要求模型准确率、私有部署或自动回答承诺即退出 | D1,D6；S04/S22/S03；`CURRENT_CORE`；成功：进入知识/内容边界 |
| P22 CEO；地产/项目交付 `GENERAL_COMBINATION` | “项目状态和报价责任难对齐”；搜索 → S08/S15 | 状态不清 → 角色/例外/资料 → D2+D4+D7 → Delivery → 场景 | 转 S19；要求项目管理系统、客户数据迁移即专项/退出 | D2,D4,D7; S08/S15/S19；`ASSESSMENT_FIRST`；成功：确认先做问题梳理 |
| P23 数据负责人；零售 `CURRENT_VIEW` | “经营图表很多，但没人确认口径”；行业页 → S27/S28 | 图表困惑 → 指标/来源/复盘 → D8 → FAQ/Delivery → 能力页 | 转 S29；若要实时预测、业绩承诺或完整 BI 替换即退出 | D8；S27/S28/S29；`CURRENT_CORE` / `DO_NOT_CLAIM`；成功：看到人工核验规则 |
| P24 任何 Persona；全行业 | “我想预约诊断/提交需求/下载指南”；任意页 Action 区 | 有行动意图 → 检查渠道/隐私/Owner → 当前仅站内 Delivery/FAQ → Trust 边界 → `HIDDEN_UNTIL_CONFIRMED`，不伪装成功 | 回到相关 S-ID 或停止；联系渠道未激活、资料未获权或安全未满足即退出 | 全域；CTA `PLANNED_GATED` / `HIDDEN_UNTIL_CONFIRMED`；成功：无数据收集且用户得到真实替代路径 |

## 覆盖与一致性自检

- 能力域覆盖：D1 P05/P06，D2 P03/P04，D3 P07/P08，D4 P01/P02/P14，D5 P09/P18，D6 P09/P11/P21，D7 P02/P14/P16，D8 P01/P13/P23。
- 行业覆盖：制造、专业服务、教育、零售、公共、公益、物流、医疗、金融、农牧、酒店餐饮、科技/B2B 均已出现并标记事实等级。
- 负向路径：P12（安全/隐私未满足）、P17（公共候选/不宣称经验）、P20（医疗数据/监管）、P24（联系未激活），以及所有涉及 ERP/CRM/HCM、实时、SLA、成果或数据迁移的退出条件。
- 当前 Action 一律不代表表单或预约；所有未来联系动作均需满足 Phase 6.1 Conversion Map 的 Activation Gates。

## 本次范围

仅新增本路径规划文档；不创建页面、HTML 副本、CTA、表单、Analytics、代码或导航变更；没有构建、部署、提交或推送。
