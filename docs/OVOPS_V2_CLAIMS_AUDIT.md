# OVOPS V2｜全站声明审校

审校基准：L1 客观事实须与业务事实一致；L2 能力描述可保留但不等于结果；L3 改为条件性目标；L4 删除/隐藏。

| 页面/位置 | 原文或类别 | Level | 处理 | 事实来源 |
| --- | --- | --- | --- |
| 首页、solutions、industries、delivery、FAQ | 服务/行业/交付方向 | L2 | 保留为“可实施方向/范围评估”；不写效果保证 | `content-data.ts`，业务事实 PENDING |
| 首页、work、case 详情 | 项目阶段、结果、客户关联 | L1/L4 | 状态统一显示“待确认”；无客户、数字、评价、成果 | CaseFactRecord PENDING |
| about | 创始人、操盘/交付经验、人物图片 | L1/L3 | 保留中性方法描述；隐藏候选人物/公司视觉 | 源码候选，素材 PENDING |
| contact/footer | 邮箱、微信、二维码、社媒、备案 | L1 | 隐藏具体值，显示待确认 | 主体/联系 PENDING |
| `/services` 历史页 | 固定天数、费用、ROI、免费诊断、增长/降本 | L3/L4 | noindex，替换为当前 `/solutions` 路径说明 | 旧源码，不作为事实 |
| API Platform | 模型、价格、注册链接、代码示例、稳定性、数据处理 | L1/L4 | noindex，替换为待确认说明；不提供外链/密钥示例 | API PENDING |
| Portal | 真实登录、项目系统、看板、报告、密码重置 | L1/L4 | 保持 noindex；移除 POST/密码收集与能力承诺 | Portal PENDING |
| privacy/terms/data-deletion | 主体、令牌、删除期限、平台授权处理 | L1/L4 | noindex 草案，改为待确认边界 | 法律主体 PENDING |
| insights | 内容方向 | L2 | 明确为待编辑/事实审校的方向，非已发布结论 | 编辑计划 |
| metadata/llms/sitemap | 法定主体、联系、API/旧服务页 | L1 | `llms.txt` 移除候选实体/邮箱；sitemap 移除 noindex 旧服务、API、法律草案 | 当前代码审校 |

## 删除或弱化的规则

- 禁止：行业/全球领先、保证增长或降本、百分比、客户/Logo、评价、上市/百亿/15+ 年、固定 SLA、稳定低价全球模型。
- 允许：以“可根据项目范围协商”“待确认”“可能/可用于”表达方案性信息。
- 中英文不得一侧出现更强事实。`Solution/Service`、`Case/Work/Project`、`Industry/Scenario`、`Delivery/Implementation` 和 CTA 采用相同强度。
