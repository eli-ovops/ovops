export type FactStatus = "confirmed" | "pending" | "private" | "prohibited";

export type VerifiedFact<T> = {
  value: T;
  status: FactStatus;
  source: string;
  publicAllowed: boolean;
  confirmedBy?: string;
};

export const isConfirmedForPublicUse = <T>(fact: VerifiedFact<T>) =>
  fact.status === "confirmed" && fact.publicAllowed;

export const pendingDisclosure = {
  zh: "该信息待业务 Owner 确认后公开。",
  en: "This information is pending Business Owner confirmation before publication.",
};
