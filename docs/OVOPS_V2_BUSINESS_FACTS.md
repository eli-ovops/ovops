# OVOPS V2｜业务事实总表

状态：**PENDING** 为默认状态。当前源码、旧官网与 Phase 2 文档仅是来源候选，不能替代业务 Owner 确认或公开授权。

## 规则

| 状态 | 含义 | 页面处理 |
| --- | --- | --- |
| `CONFIRMED` | 有确认人、来源与公开许可 | 可按确认范围公开 |
| `PENDING` | 候选值或资料缺失 | 不公开具体值；用待确认/范围评估文案 |
| `DO_NOT_PUBLISH` | 私密、未授权或禁止公开 | 隐藏，不进入 SEO/素材/案例 |

## A. 公司主体

| 字段 | 当前值/候选来源 | 状态 | 允许公开 | 确认人 |
| --- | --- | --- | --- |
| 品牌中英文名 | 源码 `site-data.ts` | PENDING | 否（仅保留站点标签供 Owner 审阅） | 待指定 |
| 中文全称/英文法定名 | 源码/`llms.txt` 候选 | PENDING | 否 | 待指定 |
| 统一信用代码、注册地、办公地址 | 未提供 | PENDING | 否 | 待指定 |
| 邮箱、电话、企业微信、负责人 | 源码邮箱/二维码候选 | PENDING | 否 | 待指定 |
| ICP、公备、备案主体 | 源码 footer 候选 | PENDING | 否 | 待指定 |
| 隐私/协议主体 | 未提供可确认文件 | PENDING | 否 | 待指定 |
| API/Portal 运营主体 | 未提供 | PENDING | 否 | 待指定 |

## B. 六项服务

所有服务的正式销售、范围/非范围、Demo、阶段实施、源码、客户服务器、维护、第三方 API/模型费、周期/价格、负责人和 CTA：**PENDING**。当前公开安全文案仅为“根据项目范围评估”；不得展示固定价格、固定周期或结果承诺。

| 服务 | 当前可保留的能力性描述 | 公开边界 |
| --- | --- | --- |
| 企业网站与数字化门户 | 信息架构、内容、咨询路径的可实施方向 | 后台/上线/维护需范围确认 |
| 企业业务系统定制 | 流程、角色、数据边界的评估与实施方向 | 系统集成、部署、源码待确认 |
| AI 知识库与智能助手 | 资料、权限、问答和人工复核方向 | 模型、准确性和数据处理待确认 |
| AI 工作流与自动化 | 重复动作与人工兜底的设计方向 | 第三方费用、异常处理待确认 |
| AI 营销与内容运营 | 官网、FAQ、内容与可见性协同方向 | 发布频率、渠道、效果待确认 |
| AI 诊断与实施咨询 | 优先级、范围、风险和验收的评估方向 | 负责人、周期、费用待确认 |

## C. 五个行业

| 行业 | 当前等级 | 公开口径 |
| --- | --- | --- |
| 专业服务与律师事务所 | `GENERAL_CAPABILITY` | 典型方案/待核实经验，不称深耕 |
| 制造业与外贸 | `GENERAL_CAPABILITY` | 典型场景/待核实经验，不称客户案例 |
| 零售与消费 | `GENERAL_CAPABILITY` | 典型场景/待核实经验 |
| 农牧与生产管理 | `GENERAL_CAPABILITY` | 典型场景/待核实经验 |
| 公益组织与基金会 | `GENERAL_CAPABILITY` | 典型场景/待核实经验 |

## D. CaseFactRecord

所有客户名、Logo、截图、业务数据、后台、合同、金额、上线/验收、量化结果、评价和流程细节均为 `DO_NOT_PUBLISH`，直至单独书面授权。

| internalName / publicTitle | publicStatus | projectStarted / contract / paid / deployed / accepted | 可公开挑战/交付/结果 | sourceMaterial / ownerConfirmation |
| --- | --- | --- | --- | --- |
| `law-firm-bilingual-site` / 律所中英文官网与后台 | PENDING（源码候选为 in-development） | 全部 PENDING | 仅通用问题方向；结果不公开 | Phase 2 候选记录 / 待确认 |
| `nonprofit-foundation-site` / 公益基金会官网 | PENDING（源码候选为 in-development） | 全部 PENDING | 仅通用问题方向；结果不公开 | Phase 2 候选记录 / 待确认 |
| `furniture-inventory-lookup` / 外贸家具库存查询 | PENDING（源码候选为 concept） | 全部 PENDING | 仅通用问题方向；结果不公开 | Phase 2 候选记录 / 待确认 |
| `agriculture-ocr-production` / 农牧 OCR 录单与生产管理 | PENDING（源码候选为 pilot） | 全部 PENDING | 仅通用问题方向；结果不公开 | Phase 2 候选记录 / 待确认 |

## Owner 确认最小字段

每条拟公开事实需：事实值、来源文件/日期、允许公开范围、确认人/日期、到期或复审日期。缺任一项即保持 PENDING。
