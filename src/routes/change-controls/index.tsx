import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/pqi/PageHeader";
import { ChangeControlTable } from "@/components/pqi/ChangeControlTable";
import { Button } from "@/components/ui/button";
import { CHANGE_CONTROLS } from "@/lib/mock-data";

export const Route = createFileRoute("/change-controls/")({
  head: () => ({
    meta: [
      { title: "Change Control Management | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Assess the potential impact of proposed manufacturing changes with AI-assisted impact assessment.",
      },
      { property: "og:title", content: "Change Control Management" },
      {
        property: "og:description",
        content: "Assess the potential impact of proposed manufacturing changes.",
      },
    ],
  }),
  component: ChangeControlsPage,
});

function ChangeControlsPage() {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Change Control Management"
        subtitle="Assess the potential impact of proposed manufacturing changes."
        actions={
          <Button size="lg" asChild>
            <Link to="/change-controls/new">+ Create Change</Link>
          </Button>
        }
      />
      <ChangeControlTable changes={CHANGE_CONTROLS} />
    </div>
  );
}
