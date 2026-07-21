import { isChineseSite } from "@/lib/site-data";
import { isConfirmedForPublicUse, pendingDisclosure, type VerifiedFact } from "@/lib/content-policy";

export const canPublishFact = <T>(fact: VerifiedFact<T>) => isConfirmedForPublicUse(fact);

export const factOrPending = <T>(fact: VerifiedFact<T>, fallback?: T) =>
  canPublishFact(fact) ? fact.value : fallback;

export const pendingFactNotice = () =>
  isChineseSite ? pendingDisclosure.zh : pendingDisclosure.en;
