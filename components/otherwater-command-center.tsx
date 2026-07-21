"use client";

import type { ComponentProps, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  CircleDashed,
  Clock3,
  DatabaseZap,
  Download,
  ExternalLink,
  FileUp,
  Filter,
  Info,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MessageSquareText,
  PanelRightOpen,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
  X,
} from "lucide-react";
import {
  actions,
  dataSources,
  deliverables,
  evidence,
  geoStageSnapshot,
  metrics,
  modules,
  project,
  type AcceptanceStatus,
  type ActionItem,
  type ActionStatus,
  type DataSource,
  type DataStatus,
  type Deliverable,
  type EvidenceItem,
  type Metric,
  type ModuleStatus,
  type ModuleSummary,
  type PublicVisibilityStatus,
  type PublishApiStatus,
} from "@/lib/otherwater-command-center-data";

type DrawerState =
  | { kind: "metric"; id: string }
  | { kind: "module"; id: string }
  | { kind: "action"; id: string }
  | { kind: "source"; id: string }
  | { kind: "evidence"; id: string }
  | { kind: "deliverable"; id: string };

type DateRangeKey = "7d" | "30d" | "stage";
type ModuleFilter = "all" | "attention" | "waiting";
type SourceFilter = "all" | DataSource["scope"];

const dateRanges: Array<{ key: DateRangeKey; label: string }> = [
  { key: "7d", label: "7 天" },
  { key: "30d", label: "30 天" },
  { key: "stage", label: "本阶段" },
];

const navItems = [
  { label: "总览", icon: LayoutDashboard },
  { label: "GEO快照", icon: BarChart3 },
  { label: "业务模块", icon: SlidersHorizontal },
  { label: "行动队列", icon: ClipboardIcon },
  { label: "交付与验收", icon: ShieldCheck },
  { label: "数据与证据", icon: DatabaseZap },
  { label: "权限与区域", icon: LockKeyhole },
];

function ClipboardIcon(props: ComponentProps<typeof MessageSquareText>) {
  return <MessageSquareText {...props} />;
}

const moduleStatusMeta: Record<ModuleStatus, { label: string; className: string }> = {
  healthy: { label: "正常", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  attention: { label: "需关注", className: "border-amber-200 bg-amber-50 text-amber-800" },
  blocked: { label: "阻塞", className: "border-red-200 bg-red-50 text-red-700" },
  not_started: { label: "尚未启动", className: "border-slate-200 bg-slate-100 text-slate-700" },
  completed: { label: "已完成", className: "border-cyan-200 bg-cyan-50 text-cyan-700" },
  not_applicable: { label: "不适用", className: "border-slate-200 bg-slate-50 text-slate-500" },
};

const dataStatusMeta: Record<DataStatus, { label: string; className: string; icon: typeof Check }> = {
  confirmed: { label: "已确认", className: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: Check },
  pending_import: { label: "待导入", className: "border-amber-200 bg-amber-50 text-amber-800", icon: UploadCloud },
  not_started: { label: "尚未启动", className: "border-slate-200 bg-slate-100 text-slate-700", icon: CircleDashed },
  blocked: { label: "阻塞", className: "border-red-200 bg-red-50 text-red-700", icon: AlertTriangle },
  not_applicable: { label: "不适用", className: "border-slate-200 bg-slate-50 text-slate-500", icon: CircleDashed },
  channel_error: { label: "通道错误 / 不可测", className: "border-violet-200 bg-violet-50 text-violet-700", icon: CircleAlert },
  manual_review: { label: "待人工确认", className: "border-orange-200 bg-orange-50 text-orange-800", icon: Info },
};

const actionStatusText: Record<ActionStatus, string> = {
  open: "打开",
  waiting_client: "待客户处理",
  waiting_internal: "交付处理中",
  in_progress: "进行中",
  done: "已完成",
  cancelled: "已取消",
};

const acceptanceStatusText: Record<AcceptanceStatus, string> = {
  draft: "草稿",
  submitted: "已提交",
  waiting_client: "待确认",
  approved: "已确认",
  revision_requested: "待调整",
  superseded: "已被替代",
};

const apiStatusText: Record<PublishApiStatus, string> = {
  queued: "排队中",
  published: "API 成功",
  failed: "API 失败",
  unknown: "未知",
};

const visibilityStatusText: Record<PublicVisibilityStatus, string> = {
  verified_visible: "公开可见",
  not_visible: "公开不可见",
  pending_manual_review: "待人工确认",
  not_checked: "未检查",
};

const scopeText: Record<DataSource["scope"], string> = {
  official_site: "客户官网",
  external_campaign_site: "外部活动站",
  owned_subdomain: "自有子域名",
  social_platform: "社媒平台",
  ai_support: "AI 客服",
  offline: "线下",
  third_party: "第三方平台",
};

const sourceTypeText: Record<DataSource["sourceType"], string> = {
  api: "API",
  csv: "CSV",
  screenshot: "截图",
  manual: "人工确认",
  url: "公开 URL",
  qa: "QA 回归",
};

const mainModuleIds = ["geo", "ai_support", "social", "video_ugc"];

function byId<T extends { id: string }>(items: T[], id?: string) {
  return items.find((item) => item.id === id);
}

function metricValue(metric: Metric) {
  if (metric.dataStatus === "pending_import") return "待后台导入";
  if (metric.dataStatus === "channel_error") return "不可测";
  if (metric.dataStatus === "not_started") return metric.value ?? "尚未启动";
  if (typeof metric.numerator === "number" && typeof metric.denominator === "number") {
    return `${metric.numerator}/${metric.denominator}`;
  }
  if (metric.value === null) return "待确认";
  return `${metric.value}${metric.unit ?? ""}`;
}

function progress(metric: Metric) {
  if (typeof metric.numerator !== "number" || typeof metric.denominator !== "number" || metric.denominator <= 0) return null;
  return Math.min(100, Math.round((metric.numerator / metric.denominator) * 100));
}

function StatusBadge({ status, type = "data" }: { status: DataStatus | ModuleStatus; type?: "data" | "module" }) {
  if (type === "module") {
    const meta = moduleStatusMeta[status as ModuleStatus];
    return <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${meta.className}`}>{meta.label}</span>;
  }

  const meta = dataStatusMeta[status as DataStatus];
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold ${meta.className}`}>
      <Icon aria-hidden="true" size={12} />
      {meta.label}
    </span>
  );
}

function Panel({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`min-w-0 max-w-full rounded-lg border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)] ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  action,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
      <div className="min-w-0">
        <h2 className="text-base font-bold leading-6 text-slate-950">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function OtherWaterCommandCenter() {
  const [dateRange, setDateRange] = useState<DateRangeKey>("stage");
  const [drawer, setDrawer] = useState<DrawerState | null>(null);
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [actionOverrides, setActionOverrides] = useState<Record<string, ActionStatus>>({});
  const [deliverableOverrides, setDeliverableOverrides] = useState<Record<string, AcceptanceStatus>>({});

  useEffect(() => {
    function scrollToHash() {
      const rawHash = window.location.hash.slice(1);
      if (!rawHash) return;

      const id = decodeURIComponent(rawHash);
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }

    scrollToHash();
    const timers = [100, 400, 900].map((delay) => window.setTimeout(scrollToHash, delay));
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  const hydratedActions = useMemo(
    () => actions.map((action) => ({ ...action, status: actionOverrides[action.id] ?? action.status })),
    [actionOverrides],
  );

  const hydratedDeliverables = useMemo(
    () => deliverables.map((deliverable) => ({ ...deliverable, acceptanceStatus: deliverableOverrides[deliverable.id] ?? deliverable.acceptanceStatus })),
    [deliverableOverrides],
  );

  const pinnedMetrics = project ? metrics.filter((metric) => ["geo_public_uplift", "geo_generic_brand_hits", "ai_regression_historical", "social_public_verified", "social_impressions", "video_status"].includes(metric.id)) : [];
  const clientActions = hydratedActions.filter((action) => action.requestedFromRole === "client" && action.status !== "done").slice(0, 3);
  const mainModules = modules.filter((module) => mainModuleIds.includes(module.id));
  const filteredModules = mainModules.filter((module) => {
    if (moduleFilter === "all") return true;
    if (moduleFilter === "attention") return ["attention", "blocked"].includes(module.status);
    return Boolean(module.nextActionId);
  });
  const filteredSources = dataSources.filter((source) => sourceFilter === "all" || source.scope === sourceFilter);
  const sourceSummary = {
    confirmed: dataSources.filter((source) => source.status === "confirmed").length,
    pending: dataSources.filter((source) => source.status === "pending_import").length,
    issue: dataSources.filter((source) => ["manual_review", "channel_error", "blocked"].includes(source.status)).length,
  };

  function updateAction(id: string, status: ActionStatus) {
    setActionOverrides((current) => ({ ...current, [id]: status }));
    setToast(`行动状态已更新为：${actionStatusText[status]}`);
  }

  function updateDeliverable(id: string, status: AcceptanceStatus) {
    setDeliverableOverrides((current) => ({ ...current, [id]: status }));
    setToast(`交付物状态已更新为：${acceptanceStatusText[status]}`);
  }

  function exportSnapshot() {
    setToast("已准备当前快照，可使用浏览器打印或另存为 PDF。");
    window.print();
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        <div className="min-w-0 flex-1 lg:pl-[248px]">
          <Topbar
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onExport={exportSnapshot}
            onOpenMobileNav={() => setMobileNavOpen(true)}
            pendingCount={clientActions.length}
            sourceIssueCount={sourceSummary.pending + sourceSummary.issue}
          />

          <main className="mx-auto grid max-w-[1440px] gap-5 px-4 py-5 sm:px-5 lg:px-6">
            {toast ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <span>{toast}</span>
                <button type="button" className="rounded-md p-1 hover:bg-emerald-100" onClick={() => setToast("")} aria-label="关闭提示">
                  <X aria-hidden="true" size={16} />
                </button>
              </div>
            ) : null}

            <ProjectSummary onOpenModule={(id) => setDrawer({ kind: "module", id })} />

            <div className="lg:hidden">
              <ClientActionPanel actions={clientActions} onOpen={(id) => setDrawer({ kind: "action", id })} />
            </div>

            <KpiGrid metrics={pinnedMetrics} onOpen={(id) => setDrawer({ kind: "metric", id })} />

            <div className="grid gap-5 lg:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]">
              <TrendPanel onOpenMetric={(id) => setDrawer({ kind: "metric", id })} />
              <div className="hidden lg:block">
                <ClientActionPanel actions={clientActions} onOpen={(id) => setDrawer({ kind: "action", id })} />
              </div>
            </div>

            <GeoStageSnapshotPanel />

            <ModuleGrid
              modules={filteredModules}
              filter={moduleFilter}
              onFilterChange={setModuleFilter}
              onOpen={(id) => setDrawer({ kind: "module", id })}
            />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,8fr)_minmax(320px,4fr)]">
              <ActionQueue
                actions={hydratedActions}
                onOpen={(id) => setDrawer({ kind: "action", id })}
                onStatusChange={updateAction}
              />
              <div className="grid gap-5">
                <DataGapPanel onOpenSource={(id) => setDrawer({ kind: "source", id })} />
                <EvidencePreview onOpen={(id) => setDrawer({ kind: "evidence", id })} />
              </div>
            </div>

            <DataSourcePanel
              sources={filteredSources}
              filter={sourceFilter}
              onFilterChange={setSourceFilter}
              onOpen={(id) => setDrawer({ kind: "source", id })}
              summary={sourceSummary}
            />

            <DeliverablesPanel
              deliverables={hydratedDeliverables}
              onOpen={(id) => setDrawer({ kind: "deliverable", id })}
              onUpdate={updateDeliverable}
            />

            <SupportingModuleStrip modules={modules.filter((module) => !mainModuleIds.includes(module.id))} onOpen={(id) => setDrawer({ kind: "module", id })} />
          </main>
        </div>
      </div>

      <DetailDrawer
        drawer={drawer}
        onClose={() => setDrawer(null)}
        actions={hydratedActions}
        deliverables={hydratedDeliverables}
        uploadedFiles={uploadedFiles}
        onFileSelect={(actionId, fileName) => setUploadedFiles((current) => ({ ...current, [actionId]: fileName }))}
        onActionStatusChange={updateAction}
        onDeliverableStatusChange={updateDeliverable}
      />
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[248px] border-r border-slate-200 bg-[#0E2D2D] text-white lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="关闭导航" className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
          <aside className="relative h-full w-[86vw] max-w-[310px] border-r border-slate-200 bg-[#0E2D2D] text-white">
            <div className="flex justify-end p-3">
              <button type="button" className="rounded-md p-2 hover:bg-white/10" onClick={onClose} aria-label="关闭导航">
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      ) : null}
    </>
  );
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#20B486] text-sm font-bold text-white">OV</div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-5">OVOPS</p>
            <p className="text-xs leading-5 text-teal-100">Client Command Center</p>
          </div>
        </div>
        <button type="button" className="mt-5 flex w-full items-center justify-between gap-3 rounded-lg border border-white/[0.12] bg-white/[0.08] px-3 py-3 text-left">
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{project.tenantName}</span>
            <span className="block truncate text-xs text-teal-100">第二期增长项目</span>
          </span>
          <ChevronRight aria-hidden="true" size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="客户看板导航">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={index === 0 ? "#" : `#${item.label}`}
              className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition hover:bg-white/10 ${
                index === 0 ? "bg-white text-[#0E2D2D]" : "text-teal-50"
              }`}
            >
              <Icon aria-hidden="true" size={17} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-xs leading-5 text-teal-100">权限区域</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-white">海外客户 · 新加坡服务器</p>
        <p className="mt-2 text-xs leading-5 text-teal-100">新用户 / 新租户 / 新域名均需书面确认。</p>
      </div>
    </div>
  );
}

function Topbar({
  dateRange,
  onDateRangeChange,
  onOpenMobileNav,
  onExport,
  pendingCount,
  sourceIssueCount,
}: {
  dateRange: DateRangeKey;
  onDateRangeChange: (range: DateRangeKey) => void;
  onOpenMobileNav: () => void;
  onExport: () => void;
  pendingCount: number;
  sourceIssueCount: number;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-[64px] min-w-0 items-center justify-between gap-3 px-4 sm:px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" className="rounded-md border border-slate-200 p-2 text-slate-700 lg:hidden" onClick={onOpenMobileNav} aria-label="打开导航">
            <Menu aria-hidden="true" size={20} />
          </button>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-bold text-slate-950">{project.name}</p>
            <p className="truncate text-xs text-slate-500">统计窗口：{project.currentWindow}</p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-1 md:flex">
            {dateRanges.map((range) => (
              <button
                key={range.key}
                type="button"
                onClick={() => onDateRangeChange(range.key)}
                className={`min-h-8 rounded-md px-3 text-xs font-semibold transition ${
                  dateRange === range.key ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 xl:flex">
            <Clock3 aria-hidden="true" size={14} />
            {sourceIssueCount} 个数据源待更新/核验
          </div>

          <button type="button" onClick={onExport} className="hidden min-h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex">
            <Download aria-hidden="true" size={15} />
            导出快照
          </button>

          <button type="button" className="relative grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" aria-label="待处理通知">
            <Bell aria-hidden="true" size={16} />
            {pendingCount ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">{pendingCount}</span> : null}
          </button>

          <div className="grid h-9 w-9 place-items-center rounded-md bg-[#0E2D2D] text-xs font-bold text-white">OW</div>
        </div>
      </div>
    </header>
  );
}

function ProjectSummary({ onOpenModule }: { onOpenModule: (id: string) => void }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,9fr)_minmax(280px,3fr)]">
      <Panel className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="break-words text-sm font-semibold leading-6 text-[#147D64]">{project.campaign}</p>
            <h1 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-950 sm:text-[28px]">{project.name}</h1>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{project.headline}</p>
          </div>
          <StatusBadge status="attention" type="module" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-teal-100 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <SummaryFact label="当前阶段" value={project.phase} />
          <SummaryFact label="项目负责人" value={project.owner} />
          <SummaryFact label="最近更新" value={project.lastUpdatedAt} />
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-950">健康 / 进度</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">按里程碑计算，不使用主观百分比。</p>
          </div>
          <button type="button" onClick={() => onOpenModule("deliverables")} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="查看交付详情">
            <PanelRightOpen aria-hidden="true" size={16} />
          </button>
        </div>
        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <span className="text-3xl font-bold text-slate-950">{project.milestone.completed}/{project.milestone.total}</span>
            <span className="text-xs font-semibold text-amber-700">需关注</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-[#20B486]" style={{ width: `${Math.round((project.milestone.completed / project.milestone.total) * 100)}%` }} />
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-500">下一里程碑</p>
          <p className="mt-1 text-sm font-bold leading-5 text-slate-900">{project.milestone.next}</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays aria-hidden="true" size={14} />
            {project.milestone.dueAt}
          </p>
        </div>
      </Panel>
    </div>
  );
}

function SummaryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function KpiGrid({ metrics: items, onOpen }: { metrics: Metric[]; onOpen: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {items.map((metric) => {
        const pct = progress(metric);
        return (
          <button
            key={metric.id}
            type="button"
            data-testid={`kpi-${metric.id}`}
            onClick={() => onOpen(metric.id)}
            className="min-h-[178px] rounded-lg border border-slate-200 bg-white p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition hover:border-teal-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex min-w-0 items-start justify-between gap-2">
              <p className="min-w-0 text-sm font-bold leading-5 text-slate-900">{metric.shortLabel}</p>
              <StatusBadge status={metric.dataStatus} />
            </div>
            <p className="mt-4 text-[28px] font-bold leading-tight text-slate-950">{metricValue(metric)}</p>
            {pct !== null ? (
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-[#20B486]" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-slate-500">分母 {metric.denominator} · {pct}%</p>
              </div>
            ) : (
              <p className="mt-3 min-h-9 text-xs leading-5 text-slate-500">{metric.notes}</p>
            )}
            <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
              {metric.sourceId ? byId(dataSources, metric.sourceId)?.name : "来源待绑定"} · {metric.lastCheckedAt ?? "待核验"}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function TrendPanel({ onOpenMetric }: { onOpenMetric: (id: string) => void }) {
  return (
    <Panel>
      <SectionHeader title="核心趋势 / 目标进度" subtitle="按 6/22 完整 200 题复测展示；搜索可见性与 AI 答案引擎采纳分开判断。" />
      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-slate-950">GEO 200 题变化分布</p>
            <button type="button" onClick={() => onOpenMetric("geo_public_uplift")} className="text-xs font-semibold text-teal-700 hover:text-teal-900">
              查看口径
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            <StackedBar label="公开搜索" segments={[{ label: "提升", value: 44, className: "bg-emerald-500" }, { label: "持平", value: 135, className: "bg-slate-300" }, { label: "下降", value: 19, className: "bg-amber-500" }, { label: "不可判读", value: 2, className: "bg-violet-400" }]} total={200} />
            <StackedBar label="GPT/API 回答" segments={[{ label: "提升", value: 28, className: "bg-emerald-500" }, { label: "持平", value: 168, className: "bg-slate-300" }, { label: "下降", value: 2, className: "bg-amber-500" }, { label: "不可判读", value: 2, className: "bg-violet-400" }]} total={200} />
            <StackedBar label="Gemini 回答" segments={[{ label: "提升", value: 15, className: "bg-emerald-500" }, { label: "持平", value: 163, className: "bg-slate-300" }, { label: "下降", value: 20, className: "bg-amber-500" }, { label: "不可判读", value: 2, className: "bg-violet-400" }]} total={200} />
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-sm text-blue-800">
              Gemini 回答：200/200 已采集，错误 0；通道可判读，但品牌、产品与 TDS1 采纳仍需继续加强。
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-950">阶段目标进度</p>
          <div className="mt-4 grid gap-3">
            {[
              ["GEO 200 题快照", "已确认", "confirmed"],
              ["官网公开同步", "待人工确认", "manual_review"],
              ["AI 客服新 1000", "交付处理中", "pending_import"],
              ["社媒后台数据", "待客户导入", "pending_import"],
            ].map(([label, value, status]) => (
              <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                <span className="text-sm font-semibold text-slate-800">{label}</span>
                <StatusBadge status={status as DataStatus} />
                <span className="sr-only">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function GeoStageSnapshotPanel() {
  const maxExposureValue = 40;

  return (
    <Panel id="GEO快照">
      <SectionHeader
        title={geoStageSnapshot.title}
        subtitle={`${geoStageSnapshot.windowLabel} · ${geoStageSnapshot.conclusion}`}
        action={
          <a href="/geo-phase-2-snapshot/" className="inline-flex min-h-8 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            临时公开页
            <ExternalLink aria-hidden="true" size={13} />
          </a>
        }
      />

      <div className="grid min-w-0 max-w-full gap-5 p-4 sm:p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {geoStageSnapshot.completion.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-500">{item.label}</p>
              <p className="mt-1 text-lg font-bold leading-6 text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          {geoStageSnapshot.channelGroups.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-base font-bold text-slate-950">{item.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(300px,5fr)]">
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-950">核心曝光变化（按渠道）</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">单位：200题中被捕捉/提及的题数；数值越高代表该主题在该渠道中越容易被看见。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {geoStageSnapshot.exposureSeries.map((series) => (
                  <span key={series.key} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600">
                    <span className={`h-2.5 w-2.5 rounded-sm ${series.className}`} />
                    {series.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {geoStageSnapshot.exposureTimelines.map((timeline) => (
                <ExposureBarChartCard key={timeline.channel} timeline={timeline} maxValue={maxExposureValue} />
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">6/22 跨渠道快照</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {geoStageSnapshot.crossChannelSnapshot.map((row) => (
                  <div key={row.label} className="rounded-md border border-slate-200 bg-white px-3 py-3">
                    <p className="text-sm font-bold text-slate-950">{row.label}</p>
                    <div className="mt-2 grid gap-1 text-xs leading-5 text-slate-600">
                      <span>公开搜索：<b className="text-slate-950">{row.publicSearch}/200</b></span>
                      <span>GPT/API 回答：<b className="text-slate-950">{row.gptApi}/200</b></span>
                      <span>Gemini 回答：<b className="text-slate-950">{row.gemini200}/200</b></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-5">
            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold text-slate-950">题目变化分布</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">同题结果按提升 / 持平 / 下降 / 不可判读分布。</p>
              <div className="mt-4 grid gap-3">
                {geoStageSnapshot.movement.map((item) => (
                  <StackedBar key={item.label} label={item.label} segments={item.segments} total={item.total} />
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-950">竞品同屏压力</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center lg:grid-cols-4">
                <CompetitorPressureFact label="6/19 基线" value={geoStageSnapshot.competitorPressure.baseline} />
                <CompetitorPressureFact label="公开搜索" value={geoStageSnapshot.competitorPressure.publicSearch} />
                <CompetitorPressureFact label="GPT/API 回答" value={geoStageSnapshot.competitorPressure.gptApi} />
                <CompetitorPressureFact label="Gemini 回答" value={geoStageSnapshot.competitorPressure.gemini200} />
              </div>
              <p className="mt-4 text-xs leading-5 text-amber-900">{geoStageSnapshot.competitorPressure.note}</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-950">Intent bucket heatmap</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">突出品牌导航、小厨房、租房 / 免安装改善；竞品替代、泛需求、TDS1 与 AI 客服入口仍需补强。</p>
          </div>
          <div className="min-w-0 max-w-full overflow-x-auto">
            <table className="min-w-[920px] w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
                  <th className="border-b border-slate-200 px-4 py-3">意图桶</th>
                  <th className="border-b border-slate-200 px-4 py-3">公开搜索 OtherWater</th>
                  <th className="border-b border-slate-200 px-4 py-3">GPT/API 回答 OtherWater</th>
                  <th className="border-b border-slate-200 px-4 py-3">Gemini 回答 OtherWater</th>
                  <th className="border-b border-slate-200 px-4 py-3">状态</th>
                  <th className="border-b border-slate-200 px-4 py-3">下一步含义</th>
                </tr>
              </thead>
              <tbody>
                {geoStageSnapshot.intentBuckets.map((bucket) => (
                  <tr key={bucket.label} className="align-top hover:bg-slate-50">
                    <td className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-950">{bucket.label}</td>
                    <td className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-800">{bucket.publicSearch}</td>
                    <td className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-800">{bucket.gptApi}</td>
                    <td className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-800">{bucket.gemini200}</td>
                    <td className="border-b border-slate-100 px-4 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${intentPostureClass(bucket.posture)}`}>{bucket.posture}</span>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-3 text-xs leading-5 text-slate-600">{bucket.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-900">
          方法限制：{geoStageSnapshot.methodLimit} 同题结果足以说明公开可见性与答案引擎实体关联的阶段性变化，但后续仍需要同通道复测确认长期趋势。
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-3">
          {geoStageSnapshot.keyFindings.map((finding) => (
            <div key={finding} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-700">
              {finding}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function CompetitorPressureFact({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-white/70 px-3 py-3">
      <p className="text-xs font-semibold text-amber-800">{label}</p>
      <p className="mt-1 text-2xl font-bold text-amber-950">{value}</p>
      <p className="mt-1 text-[11px] leading-4 text-amber-700">同屏 / 同答题数</p>
    </div>
  );
}

type ExposureTimeline = (typeof geoStageSnapshot.exposureTimelines)[number];
type ExposureSeriesKey = (typeof geoStageSnapshot.exposureSeries)[number]["key"];

function ExposureBarChartCard({ timeline, maxValue }: { timeline: ExposureTimeline; maxValue: number }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-950">{timeline.channel}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{timeline.caption}</p>
        </div>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
          条形图
        </span>
      </div>

      <p className="mt-3 rounded-md border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-semibold leading-5 text-teal-800">{timeline.insight}</p>

      <div className="mt-4 grid min-w-0 grid-cols-[30px_minmax(0,1fr)] gap-2">
        <div className="grid h-[196px] grid-rows-[auto_1fr_auto] justify-items-end text-[10px] font-semibold leading-none text-slate-400">
          <span>{maxValue}</span>
          <span className="self-center">{maxValue / 2}</span>
          <span>0</span>
        </div>

        <div className="min-w-0">
          <div className="relative h-[196px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-3 pb-3 pt-4">
            <div className="pointer-events-none absolute inset-x-3 top-4 border-t border-slate-200" />
            <div className="pointer-events-none absolute inset-x-3 top-1/2 border-t border-dashed border-slate-200" />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 border-t border-slate-300" />
            <div className={`relative z-10 grid h-full min-w-0 items-end gap-4 ${timeline.dates.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {timeline.dates.map((date) => (
                <div key={date.label} className="grid h-full min-w-0 grid-cols-4 items-end gap-1.5 sm:gap-2">
                  {geoStageSnapshot.exposureSeries.map((series) => {
                    const value = date.values[series.key as ExposureSeriesKey];
                    return (
                      <div key={series.key} className="flex h-full min-w-0 flex-col items-center justify-end">
                        <span className="mb-1 text-[10px] font-bold leading-none text-slate-700">{value}</span>
                        <div className="flex h-[150px] w-full items-end justify-center">
                          <div
                            className={`${series.className} w-full max-w-8 rounded-t-sm shadow-sm`}
                            style={{ height: `${Math.max(4, (value / maxValue) * 100)}%` }}
                            title={`${timeline.channel} ${date.label} ${series.label}：${value}/200`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-2 grid min-w-0 gap-4 ${timeline.dates.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {timeline.dates.map((date) => (
              <div key={date.label} className="min-w-0">
                <p className="text-center text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-500">{date.label}</p>
                <div className="mt-1 hidden grid-cols-4 gap-1.5 sm:grid sm:gap-2">
                  {geoStageSnapshot.exposureSeries.map((series) => (
                    <span key={series.key} className="truncate text-center text-[10px] font-semibold leading-4 text-slate-500">
                      {series.shortLabel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">{timeline.note}</p>
    </div>
  );
}

function intentPostureClass(posture: string) {
  if (posture === "Improved" || posture === "改善") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (posture.includes("gain") || posture === "Early lift" || posture.includes("公开搜索改善") || posture === "早期改善") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (posture === "Mixed" || posture === "混合") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-100 text-slate-700";
}

function StackedBar({ label, segments, total }: { label: string; segments: ReadonlyArray<{ label: string; value: number; className: string }>; total: number }) {
  return (
    <div>
      <div className="mb-2 grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-3">
        <p className="text-xs font-semibold text-slate-600">{label}</p>
        <p className="text-xs leading-5 text-slate-500 sm:text-right">{segments.map((segment) => `${segment.label} ${segment.value}`).join(" / ")}</p>
      </div>
      <div className="flex h-8 overflow-hidden rounded-md bg-slate-100">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={`${segment.className} grid place-items-center text-[11px] font-bold text-white`}
            style={{ width: `${(segment.value / total) * 100}%` }}
            title={`${segment.label}: ${segment.value}`}
          >
            {segment.value > 3 ? segment.value : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientActionPanel({ actions: items, onOpen }: { actions: ActionItem[]; onOpen: (id: string) => void }) {
  return (
    <Panel className="h-full">
      <SectionHeader title="需要客户处理" subtitle="最多显示 3 条最高优先级事项。" />
      <div className="grid gap-3 p-4 sm:p-5">
        {items.map((action) => (
          <button
            key={action.id}
            type="button"
            data-testid={`client-action-${action.id}`}
            onClick={() => onOpen(action.id)}
            className="rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-teal-200 hover:bg-teal-50/30"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">{action.priority}</span>
              <span className="text-xs font-semibold text-slate-500">{action.dueAt ?? "无截止"}</span>
            </div>
            <p className="mt-3 text-sm font-bold leading-5 text-slate-950">{action.title}</p>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{action.blockerReason ?? action.description}</p>
            <span className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-md bg-[#0E2D2D] px-3 text-xs font-bold text-white">
              {action.type === "upload" ? "去上传" : action.type === "approval" ? "去确认" : "查看并处理"}
              <ChevronRight aria-hidden="true" size={14} />
            </span>
          </button>
        ))}
        <button type="button" onClick={() => onOpen(actions[0].id)} className="min-h-10 rounded-md border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          查看全部行动
        </button>
      </div>
    </Panel>
  );
}

function ModuleGrid({
  modules: items,
  filter,
  onFilterChange,
  onOpen,
}: {
  modules: ModuleSummary[];
  filter: ModuleFilter;
  onFilterChange: (filter: ModuleFilter) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <Panel id="业务模块">
      <SectionHeader
        title="4 个主模块"
        subtitle="总览卡最多 1 个主指标 + 3 个辅助指标，详情进入抽屉。"
        action={
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              ["all", "全部"],
              ["attention", "需关注"],
              ["waiting", "有动作"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => onFilterChange(key as ModuleFilter)}
                className={`min-h-8 rounded-md px-3 text-xs font-semibold ${filter === key ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-4">
        {items.map((module) => (
          <ModuleCard key={module.id} module={module} onOpen={onOpen} />
        ))}
      </div>
    </Panel>
  );
}

function ModuleCard({ module, onOpen }: { module: ModuleSummary; onOpen: (id: string) => void }) {
  const Icon = module.icon;
  const primaryMetric = byId(metrics, module.primaryMetricId);
  const nextAction = byId(actions, module.nextActionId);

  return (
    <button type="button" onClick={() => onOpen(module.id)} className="flex min-h-[300px] flex-col rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-teal-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal-50 text-teal-700">
          <Icon aria-hidden="true" size={20} />
        </span>
        <StatusBadge status={module.status} type="module" />
      </div>
      <h3 className="mt-4 text-base font-bold leading-6 text-slate-950">{module.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{module.headline}</p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold text-slate-500">主指标</p>
        <p className="mt-1 text-xl font-bold text-slate-950">{primaryMetric ? metricValue(primaryMetric) : "状态摘要"}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{primaryMetric?.shortLabel ?? module.stats[0]?.value}</p>
      </div>

      <div className="mt-4 grid gap-2">
        {module.stats.slice(0, 3).map((stat) => (
          <div key={stat.label} className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">{stat.label}</span>
            <span className="font-semibold text-slate-800">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <p className="line-clamp-2 text-xs leading-5 text-amber-700">数据缺口：{module.dataGap}</p>
        <p className="mt-2 line-clamp-1 text-xs font-semibold text-slate-600">下一步：{nextAction?.title ?? "下一次复盘日期待确认"}</p>
        <p className="mt-2 text-xs text-slate-400">{module.lastCheckedAt ?? "待核验"} · 证据 {module.evidenceIds.length} 项</p>
      </div>
    </button>
  );
}

function ActionQueue({
  actions: items,
  onOpen,
  onStatusChange,
}: {
  actions: ActionItem[];
  onOpen: (id: string) => void;
  onStatusChange: (id: string, status: ActionStatus) => void;
}) {
  return (
    <Panel id="行动队列">
      <SectionHeader title="行动队列" subtitle="默认以可排序表格呈现；移动端为局部滚动，不造成页面横向溢出。" />
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
              <th className="border-b border-slate-200 px-4 py-3">事项</th>
              <th className="border-b border-slate-200 px-4 py-3">模块</th>
              <th className="border-b border-slate-200 px-4 py-3">优先级</th>
              <th className="border-b border-slate-200 px-4 py-3">状态</th>
              <th className="border-b border-slate-200 px-4 py-3">负责人</th>
              <th className="border-b border-slate-200 px-4 py-3">截止</th>
            </tr>
          </thead>
          <tbody>
            {items.map((action) => (
              <tr key={action.id} className="align-top hover:bg-slate-50">
                <td className="border-b border-slate-100 px-4 py-3">
                <button type="button" data-testid={`queue-action-${action.id}`} onClick={() => onOpen(action.id)} className="text-left font-semibold leading-5 text-slate-950 hover:text-teal-700">
                    {action.title}
                  </button>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-500">{action.completionCriteria}</p>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-600">{byId(modules, action.moduleId)?.name ?? "项目总览"}</td>
                <td className="border-b border-slate-100 px-4 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{action.priority}</span>
                </td>
                <td className="border-b border-slate-100 px-4 py-3">
                  <select
                    value={action.status}
                    onChange={(event) => onStatusChange(action.id, event.target.value as ActionStatus)}
                    className="min-h-9 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700"
                    aria-label={`${action.title} 状态`}
                  >
                    {Object.entries(actionStatusText).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-xs leading-5 text-slate-600">{action.assignee}</td>
                <td className="border-b border-slate-100 px-4 py-3 text-xs text-slate-600">{action.dueAt ?? "无"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function DataGapPanel({ onOpenSource }: { onOpenSource: (id: string) => void }) {
  const gaps = dataSources.filter((source) => ["pending_import", "manual_review", "channel_error", "blocked"].includes(source.status)).slice(0, 4);
  return (
    <Panel>
      <SectionHeader title="数据缺口" subtitle="缺失数据作为业务状态呈现，不补 0。" />
      <div className="grid gap-3 p-4">
        {gaps.map((source) => (
          <button key={source.id} type="button" onClick={() => onOpenSource(source.id)} className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-left hover:bg-slate-50">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold leading-5 text-slate-950">{source.name}</p>
              <StatusBadge status={source.status} />
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{source.note}</p>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function EvidencePreview({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <Panel id="数据与证据">
      <SectionHeader title="证据入口" subtitle="总览只显示最近证据，完整明细进入抽屉。" />
      <div className="grid gap-3 p-4">
        {evidence.slice(0, 5).map((item) => (
          <button key={item.id} type="button" onClick={() => onOpen(item.id)} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-3 text-left hover:bg-slate-50">
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-950">{item.title}</span>
              <span className="mt-1 block text-xs text-slate-500">{item.type} · {item.lastVerifiedAt ?? item.createdAt}</span>
            </span>
            <ChevronRight aria-hidden="true" size={16} className="shrink-0 text-slate-400" />
          </button>
        ))}
      </div>
    </Panel>
  );
}

function DataSourcePanel({
  sources,
  filter,
  onFilterChange,
  onOpen,
  summary,
}: {
  sources: DataSource[];
  filter: SourceFilter;
  onFilterChange: (filter: SourceFilter) => void;
  onOpen: (id: string) => void;
  summary: { confirmed: number; pending: number; issue: number };
}) {
  const filters: Array<{ key: SourceFilter; label: string }> = [
    { key: "all", label: "全部" },
    { key: "official_site", label: "官网" },
    { key: "external_campaign_site", label: "外部站" },
    { key: "social_platform", label: "社媒" },
    { key: "third_party", label: "第三方" },
  ];

  return (
    <Panel>
      <SectionHeader
        title="数据源状态"
        subtitle={`已确认 ${summary.confirmed} · 待导入 ${summary.pending} · 待核验/异常 ${summary.issue}`}
        action={
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-1">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onFilterChange(item.key)}
                className={`min-h-8 shrink-0 rounded-md px-3 text-xs font-semibold ${filter === item.key ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {sources.map((source) => (
          <button key={source.id} type="button" onClick={() => onOpen(source.id)} className="rounded-lg border border-slate-200 bg-white p-4 text-left hover:border-teal-200">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">{source.name}</p>
                <p className="mt-1 text-xs text-slate-500">{scopeText[source.scope]} · {sourceTypeText[source.sourceType]}</p>
              </div>
              <StatusBadge status={source.status} />
            </div>
            <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">{source.note}</p>
            {source.apiStatus || source.publicVisibility ? (
              <div className="mt-3 grid gap-2 text-xs text-slate-600">
                {source.apiStatus ? <span>API：{apiStatusText[source.apiStatus]}</span> : null}
                {source.publicVisibility ? <span>公开可见：{visibilityStatusText[source.publicVisibility]}</span> : null}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function DeliverablesPanel({
  deliverables: items,
  onOpen,
  onUpdate,
}: {
  deliverables: Deliverable[];
  onOpen: (id: string) => void;
  onUpdate: (id: string, status: AcceptanceStatus) => void;
}) {
  return (
    <Panel id="交付与验收">
      <SectionHeader title="交付确认与正式版规划" subtitle="当前为演示版本，用于汇总交付物、验收依据、数据来源和下一阶段正式版规划。" />
      <div className="grid gap-3 p-4 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold leading-5 text-slate-950">{item.title}</p>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">{acceptanceStatusText[item.acceptanceStatus]}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{item.acceptanceCriteria}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => onOpen(item.id)} className="min-h-8 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                查看
              </button>
              <button type="button" onClick={() => onUpdate(item.id, "approved")} className="min-h-8 rounded-md bg-[#0E2D2D] px-3 text-xs font-semibold text-white">
                确认完成
              </button>
              <button type="button" onClick={() => onUpdate(item.id, "revision_requested")} className="min-h-8 rounded-md border border-amber-200 bg-amber-50 px-3 text-xs font-semibold text-amber-800">
                提交调整意见
              </button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SupportingModuleStrip({ modules: items, onOpen }: { modules: ModuleSummary[]; onOpen: (id: string) => void }) {
  return (
    <Panel>
      <SectionHeader title="支撑模块状态条" subtitle="官网、数据导入、交付确认和权限区域只显示摘要，避免挤占首屏。" />
      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((module) => {
          const Icon = module.icon;
          return (
            <button key={module.id} type="button" onClick={() => onOpen(module.id)} className="flex min-h-24 items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left hover:bg-slate-50">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-700">
                <Icon aria-hidden="true" size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-950">{module.name}</span>
                <span className="mt-2 block line-clamp-2 text-xs leading-5 text-slate-500">{module.headline}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

function DetailDrawer({
  drawer,
  onClose,
  actions: hydratedActions,
  deliverables: hydratedDeliverables,
  uploadedFiles,
  onFileSelect,
  onActionStatusChange,
  onDeliverableStatusChange,
}: {
  drawer: DrawerState | null;
  onClose: () => void;
  actions: ActionItem[];
  deliverables: Deliverable[];
  uploadedFiles: Record<string, string>;
  onFileSelect: (actionId: string, fileName: string) => void;
  onActionStatusChange: (id: string, status: ActionStatus) => void;
  onDeliverableStatusChange: (id: string, status: AcceptanceStatus) => void;
}) {
  if (!drawer) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-slate-950/[0.42]" onClick={onClose} aria-label="关闭详情" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col bg-white shadow-[-24px_0_60px_rgba(15,23,42,0.18)] sm:rounded-l-lg">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-teal-700">详情抽屉</p>
            <h2 className="mt-1 text-lg font-bold leading-6 text-slate-950">{drawerTitle(drawer)}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="关闭">
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {drawer.kind === "metric" ? <MetricDrawer metric={byId(metrics, drawer.id)} /> : null}
          {drawer.kind === "module" ? <ModuleDrawer module={byId(modules, drawer.id)} /> : null}
          {drawer.kind === "action" ? (
            <ActionDrawer
              action={byId(hydratedActions, drawer.id)}
              uploadedFile={uploadedFiles[drawer.id]}
              onFileSelect={onFileSelect}
              onStatusChange={onActionStatusChange}
            />
          ) : null}
          {drawer.kind === "source" ? <SourceDrawer source={byId(dataSources, drawer.id)} /> : null}
          {drawer.kind === "evidence" ? <EvidenceDrawer item={byId(evidence, drawer.id)} /> : null}
          {drawer.kind === "deliverable" ? (
            <DeliverableDrawer item={byId(hydratedDeliverables, drawer.id)} onUpdate={onDeliverableStatusChange} />
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function drawerTitle(drawer: DrawerState) {
  if (drawer.kind === "metric") return byId(metrics, drawer.id)?.name ?? "指标详情";
  if (drawer.kind === "module") return byId(modules, drawer.id)?.name ?? "模块详情";
  if (drawer.kind === "action") return byId(actions, drawer.id)?.title ?? "行动详情";
  if (drawer.kind === "source") return byId(dataSources, drawer.id)?.name ?? "数据源详情";
  if (drawer.kind === "evidence") return byId(evidence, drawer.id)?.title ?? "证据详情";
  return byId(deliverables, drawer.id)?.title ?? "交付详情";
}

function MetricDrawer({ metric }: { metric?: Metric }) {
  if (!metric) return <EmptyDrawer />;
  const source = byId(dataSources, metric.sourceId);
  const pct = progress(metric);
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-500">当前值</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{metricValue(metric)}</p>
          </div>
          <StatusBadge status={metric.dataStatus} />
        </div>
        {pct !== null ? (
          <div className="mt-4">
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-[#20B486]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ) : null}
      </DrawerCard>
      <DefinitionList
        items={[
          ["分子 / 分母", typeof metric.numerator === "number" && typeof metric.denominator === "number" ? `${metric.numerator} / ${metric.denominator}` : "不计算比例"],
          ["数据源", source?.name ?? "待绑定"],
          ["统计窗口", metric.periodStart && metric.periodEnd ? `${metric.periodStart} - ${metric.periodEnd}` : "无时间维度"],
          ["最后核验", metric.lastCheckedAt ?? "待核验"],
          ["备注", metric.notes ?? "无"],
        ]}
      />
      <RelatedEvidence ids={metric.evidenceIds} />
    </div>
  );
}

function ModuleDrawer({ module }: { module?: ModuleSummary }) {
  if (!module) return <EmptyDrawer />;
  const nextAction = byId(actions, module.nextActionId);
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-950">{module.headline}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{module.owner} · {module.lastCheckedAt}</p>
          </div>
          <StatusBadge status={module.status} type="module" />
        </div>
      </DrawerCard>
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">核心数据</p>
        <div className="mt-3 grid gap-2">
          {module.stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between gap-3 border-b border-slate-100 py-2 last:border-b-0">
              <span className="text-sm text-slate-500">{stat.label}</span>
              <span className="text-right text-sm font-semibold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </div>
      </DrawerCard>
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">数据缺口 / 下一步</p>
        <p className="mt-3 text-sm leading-6 text-amber-800">{module.dataGap}</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">下一步：{nextAction?.title ?? "等待下一次交付复盘"}</p>
      </DrawerCard>
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">详情</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
          {module.details.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DrawerCard>
      <RelatedEvidence ids={module.evidenceIds} />
    </div>
  );
}

function ActionDrawer({
  action,
  uploadedFile,
  onFileSelect,
  onStatusChange,
}: {
  action?: ActionItem;
  uploadedFile?: string;
  onFileSelect: (actionId: string, fileName: string) => void;
  onStatusChange: (id: string, status: ActionStatus) => void;
}) {
  if (!action) return <EmptyDrawer />;
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-950">{action.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
          </div>
          <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">{action.priority}</span>
        </div>
      </DrawerCard>
      <DefinitionList
        items={[
          ["类型", action.type],
          ["状态", actionStatusText[action.status]],
          ["负责人", action.assignee],
          ["截止时间", action.dueAt ?? "无"],
          ["阻塞原因", action.blockerReason ?? "无"],
          ["完成标准", action.completionCriteria],
        ]}
      />
      {action.type === "upload" ? (
        <DrawerCard>
          <p className="text-sm font-bold text-slate-950">上传资料</p>
          <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center hover:border-teal-300">
            <FileUp aria-hidden="true" size={24} className="text-teal-700" />
            <span className="text-sm font-semibold text-slate-700">{uploadedFile ?? "选择 CSV、截图或报告文件"}</span>
            <span className="text-xs text-slate-500">本地原型仅记录文件名，不上传到服务器。</span>
            <input
              type="file"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onFileSelect(action.id, file.name);
              }}
            />
          </label>
        </DrawerCard>
      ) : null}
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">处理结果</p>
        <textarea className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50" placeholder="填写备注、驳回原因或人工核验说明" />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => onStatusChange(action.id, "done")} className="min-h-9 rounded-md bg-[#0E2D2D] px-3 text-sm font-semibold text-white">
            标记完成
          </button>
          <button type="button" onClick={() => onStatusChange(action.id, "in_progress")} className="min-h-9 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700">
            转为处理中
          </button>
          <button type="button" onClick={() => onStatusChange(action.id, "waiting_internal")} className="min-h-9 rounded-md border border-amber-200 bg-amber-50 px-3 text-sm font-semibold text-amber-800">
            转交付处理中
          </button>
        </div>
      </DrawerCard>
      <RelatedEvidence ids={action.evidenceIds} />
    </div>
  );
}

function SourceDrawer({ source }: { source?: DataSource }) {
  if (!source) return <EmptyDrawer />;
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-950">{source.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{source.note}</p>
          </div>
          <StatusBadge status={source.status} />
        </div>
      </DrawerCard>
      <DefinitionList
        items={[
          ["范围", scopeText[source.scope]],
          ["接入方式", sourceTypeText[source.sourceType]],
          ["统计窗口", source.periodStart && source.periodEnd ? `${source.periodStart} - ${source.periodEnd}` : "无"],
          ["最后导入", source.lastImportedAt ?? "待导入"],
          ["最后核验", source.lastCheckedAt ?? "待核验"],
          ["负责人", source.owner],
          ["缺失字段", source.missingFields.length ? source.missingFields.join("、") : "无"],
        ]}
      />
      {source.apiStatus || source.publicVisibility ? (
        <DrawerCard>
          <p className="text-sm font-bold text-slate-950">发布真实性拆分</p>
          <div className="mt-3 grid gap-2 text-sm">
            <p>API 发布：{source.apiStatus ? apiStatusText[source.apiStatus] : "未记录"}</p>
            <p>公开可见：{source.publicVisibility ? visibilityStatusText[source.publicVisibility] : "未记录"}</p>
          </div>
        </DrawerCard>
      ) : null}
    </div>
  );
}

function EvidenceDrawer({ item }: { item?: EvidenceItem }) {
  if (!item) return <EmptyDrawer />;
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">{item.title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.source}</p>
      </DrawerCard>
      <DefinitionList
        items={[
          ["类型", item.type],
          ["所属模块", byId(modules, item.moduleId)?.name ?? "项目总览"],
          ["创建时间", item.createdAt],
          ["最后核验", item.lastVerifiedAt ?? "未核验"],
          ["可见范围", item.visibility === "client" ? "客户可见" : "运营记录"],
          ["验证状态", item.verificationStatus],
        ]}
      />
      <a href={item.href} className="inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        打开证据入口
        <ExternalLink aria-hidden="true" size={15} />
      </a>
    </div>
  );
}

function DeliverableDrawer({ item, onUpdate }: { item?: Deliverable; onUpdate: (id: string, status: AcceptanceStatus) => void }) {
  if (!item) return <EmptyDrawer />;
  return (
    <div className="grid gap-4">
      <DrawerCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-950">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.acceptanceCriteria}</p>
          </div>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">{acceptanceStatusText[item.acceptanceStatus]}</span>
        </div>
      </DrawerCard>
      <DefinitionList
        items={[
          ["版本", item.version],
          ["提交时间", item.submittedAt ?? "待提交"],
          ["反馈截止", item.feedbackDueAt ?? "无"],
          ["修改轮次", String(item.revisionCount)],
          ["范围边界", item.scopeBoundary],
        ]}
      />
      <DrawerCard>
        <p className="text-sm font-bold text-slate-950">确认意见</p>
        <textarea className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50" placeholder="填写确认意见、调整建议或正式版补充要求" />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => onUpdate(item.id, "approved")} className="min-h-9 rounded-md bg-[#0E2D2D] px-3 text-sm font-semibold text-white">
            确认完成
          </button>
          <button type="button" onClick={() => onUpdate(item.id, "revision_requested")} className="min-h-9 rounded-md border border-amber-200 bg-amber-50 px-3 text-sm font-semibold text-amber-800">
            提交调整意见
          </button>
        </div>
      </DrawerCard>
      <RelatedEvidence ids={item.evidenceIds} />
    </div>
  );
}

function RelatedEvidence({ ids }: { ids: string[] }) {
  const items = ids.map((id) => byId(evidence, id)).filter(Boolean) as EvidenceItem[];
  return (
    <DrawerCard>
      <p className="text-sm font-bold text-slate-950">关联证据</p>
      <div className="mt-3 grid gap-2">
        {items.length ? items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-xs text-slate-500">{item.type} · {item.lastVerifiedAt ?? item.createdAt}</p>
          </div>
        )) : <p className="text-sm text-slate-500">暂无关联证据。</p>}
      </div>
    </DrawerCard>
  );
}

function DefinitionList({ items }: { items: Array<[string, string]> }) {
  return (
    <DrawerCard>
      <dl className="grid gap-3">
        {items.map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
            <dt className="text-xs font-semibold text-slate-500">{label}</dt>
            <dd className="text-sm leading-6 text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
    </DrawerCard>
  );
}

function DrawerCard({ children }: { children: ReactNode }) {
  return <section className="rounded-lg border border-slate-200 bg-white p-4">{children}</section>;
}

function EmptyDrawer() {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">未找到对应记录。</div>;
}
