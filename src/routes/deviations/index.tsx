import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/pqi/PageHeader";
import { DeviationTable } from "@/components/pqi/DeviationTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS, DEVIATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/deviations/")({
  head: () => ({
    meta: [
      { title: "Deviation Management | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Track, investigate and resolve manufacturing deviations with risk, status and area filters.",
      },
      { property: "og:title", content: "Deviation Management" },
      {
        property: "og:description",
        content: "Track, investigate and resolve manufacturing deviations.",
      },
    ],
  }),
  component: DeviationsPage,
});

const ALL = "all";

function DeviationsPage() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [area, setArea] = useState(ALL);
  const [date, setDate] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEVIATIONS.filter((d) => {
      if (q && !`${d.id} ${d.description} ${d.equipment} ${d.batch}`.toLowerCase().includes(q))
        return false;
      if (risk !== ALL && d.risk !== risk) return false;
      if (status !== ALL && d.status !== status) return false;
      if (area !== ALL && d.area !== area) return false;
      if (date && new Date(d.created).getTime() < new Date(date).getTime()) return false;
      return true;
    });
  }, [query, risk, status, area, date]);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Deviation Management"
        subtitle="Track, investigate and resolve manufacturing deviations."
        actions={
          <Button asChild size="lg">
            <Link to="/deviations/new">+ Create Deviation</Link>
          </Button>
        }
      />

      <div className="surface-card grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ID, description, equipment…"
            className="pl-9"
          />
        </div>
        <Select value={risk} onValueChange={setRisk}>
          <SelectTrigger>
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All risk levels</SelectItem>
            {["Low", "Medium", "High", "Critical"].map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {["Open", "Under Investigation", "AI Review", "QA Review", "Closed"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger>
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All areas</SelectItem>
            {AREAS.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {DEVIATIONS.length} deviations
      </p>

      <DeviationTable deviations={filtered} />
    </div>
  );
}
