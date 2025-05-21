import { useState } from "react";
import { PlayerForm } from "@/components/player-form";
import { PlayerList } from "@/components/player-list";
import { TeamDisplay } from "@/components/team-display";
import { BatchPlayerInput } from "@/components/batch-player-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePlayerStore } from "@/view-models/player-store";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme/theme-toggle";

export function VolleyballSorter() {
  const { teams, canSortTeams, sortTeams } = usePlayerStore();
  const [showBatchInput, setShowBatchInput] = useState(false);

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <header
        className={cn(
          "flex items-center justify-between",
          "mt-4 mb-8",
          "border rounded-md p-4",
        )}
      >
        <h1 className="text-xl">Saque Certo</h1>
        <ThemeToggle />
      </header>

      <div className="grid gap-8">
        {!teams ? (
          <>
            {showBatchInput ? (
              <Card className="p-6">
                <BatchPlayerInput onClose={() => setShowBatchInput(false)} />
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <PlayerForm />
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowBatchInput(true)}
                      className="w-full"
                    >
                      Add Multiple Players
                    </Button>
                  </div>

                  {canSortTeams() && (
                    <div className="pt-4">
                      <Button onClick={sortTeams} className="w-full" size="lg">
                        Sort Teams
                      </Button>
                    </div>
                  )}
                </div>
                <PlayerList />
              </div>
            )}
          </>
        ) : (
          <TeamDisplay />
        )}
      </div>
    </div>
  );
}
