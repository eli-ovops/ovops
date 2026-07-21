"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

type EmailCopyCardProps = {
  email: string;
  title: string;
  text: string;
  cta: string;
  copiedText: string;
  errorText: string;
};

function copyWithFallback(value: string) {
  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus({ preventScroll: true });
  textarea.select();

  try {
    textarea.setSelectionRange(0, value.length);
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
    activeElement?.focus({ preventScroll: true });
  }
}

export function EmailCopyCard({ email, title, text, cta, copiedText, errorText }: EmailCopyCardProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else if (!copyWithFallback(email)) {
        throw new Error("copy failed");
      }
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const StatusIcon = status === "copied" ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex min-h-[132px] w-full items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-vector-blue hover:shadow-[0_14px_34px_rgba(22,119,255,0.12)]"
      aria-label={cta}
    >
      <span className="icon-bubble shrink-0">
        <Mail aria-hidden="true" size={22} />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-black text-navy-950">{title}</span>
        <span className="mt-1 block text-sm leading-5 text-slate-600">{text}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-vector-blue">
          {status === "copied" ? copiedText : cta}
          <StatusIcon aria-hidden="true" size={15} />
        </span>
        {status === "error" ? (
          <span className="mt-2 block text-xs font-bold text-slate-500" aria-live="polite">
            {errorText}
          </span>
        ) : null}
      </span>
    </button>
  );
}
