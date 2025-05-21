import { TEAM_TYPE } from "@/models/player";
import type { Teams } from "@/models/player";
import { usePlayerStore } from "@/view-models/player-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type TeamCardProps = {
  teamType: TEAM_TYPE;
  teams: Teams;
};

function TeamCard({ teamType, teams }: TeamCardProps) {
  const team = teams[teamType];

  return (
    <Card className="overflow-hidden">
      <div className="p-4 text-center font-semibold text-lg bg-primary text-primary-foreground">
        {teamType}
      </div>
      <div className="p-4">
        <div className="mb-4 flex justify-between text-sm">
          <div>Average Rating: <span className="font-medium">{team.averageRating.toFixed(1)}</span></div>
          <div>Total Rating: <span className="font-medium">{team.totalRating}</span></div>
        </div>
        
        <div className="space-y-2">
          {team.players.map((player) => (
            <div 
              key={player.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span>{player.name}</span>
              <span className="inline-flex items-center justify-center size-6 bg-blue-100 text-blue-800 font-medium rounded-full">
                {player.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function TeamDisplay() {
  const { teams, sortTeams, resetTeams } = usePlayerStore();

  if (!teams) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Sorted Teams</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={sortTeams}>
            Shuffle Again
          </Button>
          <Button variant="ghost" onClick={resetTeams}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TeamCard teamType={TEAM_TYPE.TEAM_A} teams={teams} />
        <TeamCard teamType={TEAM_TYPE.TEAM_B} teams={teams} />
      </div>
    </div>
  );
} 