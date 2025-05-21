import { usePlayerStore } from "@/view-models/player-store";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

import type { Player } from "@/models/player";

const MIN_RATING = 1;
const MAX_RATING = 10;

export function PlayerList() {
  const { players, removePlayer, updatePlayerRating, clearPlayers } = usePlayerStore();
  
  // Handlers for rating adjustment
  const incrementRating = (player: Player) => {
    if (player.rating < MAX_RATING) {
      updatePlayerRating(player.id, player.rating + 1);
    }
  };

  const decrementRating = (player: Player) => {
    if (player.rating > MIN_RATING) {
      updatePlayerRating(player.id, player.rating - 1);
    }
  };

  if (players.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 border rounded-lg">
        No players added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Player List</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearPlayers}
          className="text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-1"
        >
          <TrashIcon className="size-3.5" />
          Clear All
        </Button>
      </div>

      <div className="grid gap-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <span className="font-medium">{player.name}</span>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => decrementRating(player)}
                  disabled={player.rating <= MIN_RATING}
                  className="h-7 w-7"
                >
                  <MinusIcon className="size-3" />
                </Button>
                
                <div className="flex items-center text-sm justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-full">
                  {player.rating}
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => incrementRating(player)}
                  disabled={player.rating >= MAX_RATING}
                  className="h-7 w-7"
                >
                  <PlusIcon className="size-3" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePlayer(player.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 