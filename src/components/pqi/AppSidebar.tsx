import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TriangleAlert,
  GitPullRequestArrow,
  Bot,
  Sparkles,
  Settings,
  FlaskConical,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/deviations", label: "Deviations", icon: TriangleAlert, exact: false },
  { to: "/change-controls", label: "Change Controls", icon: GitPullRequestArrow, exact: false },
  { to: "/investigations", label: "Investigations", icon: Bot, exact: false },
  { to: "/insights", label: "AI Insights", icon: Sparkles, exact: false },
] as const;

const linkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <FlaskConical className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">Pharma Quality</p>
          <p className="text-xs text-muted-foreground">Intelligence Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact ?? false }}
            className={linkClass}
            activeProps={{
              className:
                "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-[inset_2px_0_0_0_var(--sidebar-primary)]",
            }}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-accent-foreground">
            QM
          </span>
          <div className="leading-tight">
            <p className="text-sm font-medium">QA Manager</p>
            <p className="text-xs text-muted-foreground">Quality Assurance</p>
          </div>
        </div>
        <Link
          to="/settings"
          className={linkClass}
          activeProps={{
            className: "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
          }}
        >
          <Settings className="size-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 lg:hidden">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.exact ?? false }}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap text-sidebar-foreground/80"
          activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
        >
          <item.icon className="size-3.5" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}
