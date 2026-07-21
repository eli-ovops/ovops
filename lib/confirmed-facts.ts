import type { CaseStatus } from "@/lib/content-data";
import type { VerifiedFact } from "@/lib/content-policy";

type LocalizedValue = { zh: string; en: string };

const pending = <T>(value: T, source: string): VerifiedFact<T> => ({
  value,
  status: "pending",
  source,
  publicAllowed: false,
});

/**
 * This file is intentionally a register of verified-fact candidates, not a claim
 * that the values are confirmed. Public code may only surface `confirmed` facts.
 */
export const businessFacts = {
  brand: pending<LocalizedValue>({ zh: "原点向量", en: "Origin Vector" }, "Current site source candidate"),
  legalEntity: pending<LocalizedValue>({ zh: "原点向量（深圳）科技有限公司", en: "Origin Vector (Shenzhen) Technology Co., Ltd." }, "Current site source candidate"),
  filings: pending({ icp: "粤ICP备2026047617号", publicSecurity: "粤公网安备44030002013952号" }, "Current site source candidate"),
  contact: pending({ email: { zh: "kiwizhao@163.com", en: "kiwizhaow@gmail.com" }, wechat: "Current QR and display name in source" }, "Current site source candidate"),
  apiPlatform: pending({ url: "https://models.ovops.com/", operator: "Unknown", commercialTerms: "Unknown" }, "Current site source candidate"),
  portal: pending({ loginEndpoint: "https://ovops.com/api/portal-login", accessModel: "Unknown" }, "Current site source candidate"),
  assets: pending({ founderProfile: "Current source candidate", companyVisual: "Current source candidate", caseScreenshots: "No public authorization recorded" }, "Current site source candidate"),
  serviceCommitments: pending({ timing: "Scope assessment required", pricing: "Scope assessment required", sourceCode: "Negotiable by scope", clientServer: "Negotiable by scope", maintenance: "Defined in delivery documents" }, "Phase 2 content boundary"),
  cases: {
    "law-firm-bilingual-site": pending<{ status: CaseStatus }>({ status: "in-development" }, "Phase 2 candidate case record"),
    "nonprofit-foundation-site": pending<{ status: CaseStatus }>({ status: "in-development" }, "Phase 2 candidate case record"),
    "furniture-inventory-lookup": pending<{ status: CaseStatus }>({ status: "concept" }, "Phase 2 candidate case record"),
    "agriculture-ocr-production": pending<{ status: CaseStatus }>({ status: "pilot" }, "Phase 2 candidate case record"),
  },
} as const;
