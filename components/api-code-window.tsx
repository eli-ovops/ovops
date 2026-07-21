type ApiCodeWindowProps = {
  title: string;
  subtitle: string;
  code: string;
  className?: string;
  compactSubtitle?: boolean;
};

export function ApiCodeWindow({
  title,
  subtitle,
  code,
  className = "",
  compactSubtitle = true,
}: ApiCodeWindowProps) {
  return (
    <div className={`api-code-window api-code-window-compact ${className}`.trim()}>
      <div className="api-code-toolbar">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="api-code-dot bg-[#ff5f57]" />
          <span className="api-code-dot bg-[#ffbd2e]" />
          <span className="api-code-dot bg-[#28c840]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-white">{title}</p>
          <p className={compactSubtitle ? "text-[11px] font-semibold text-vector-cyan" : "mt-1 text-xs leading-5 text-slate-300"}>
            {subtitle}
          </p>
        </div>
      </div>
      <pre aria-label={title}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
