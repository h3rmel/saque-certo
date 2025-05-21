import React, { useState } from "react";
import { usePlayerStore } from "@/view-models/player-store";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_PLAYERS = 16;
const DEFAULT_RATING = 5;

export function BatchPlayerInput({ onClose }: { onClose: () => void }) {
  const { players, addPlayer } = usePlayerStore();
  const [playerList, setPlayerList] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayers = () => {
    if (!playerList.trim()) {
      setError("Please enter at least one player");
      return;
    }

    // Split text by lines
    const lines = playerList
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    // Extract player names using the format "X - Player Name"
    const playerNames = lines
      .map((line) => {
        // Match anything after the "X - " pattern
        const match = line.match(/^\d+\s*-\s*(.+)$/);
        return match ? match[1].trim() : line.trim();
      })
      .filter((name) => name);

    if (playerNames.length === 0) {
      setError("No valid player names found");
      return;
    }

    // Check if adding these players would exceed the limit
    if (players.length + playerNames.length > MAX_PLAYERS) {
      setError(
        `Can't add ${playerNames.length} players. Maximum allowed is ${MAX_PLAYERS - players.length} more.`,
      );
      return;
    }

    // Add all players with default rating
    playerNames.forEach((name) => {
      addPlayer({
        name,
        rating: DEFAULT_RATING,
      });
    });

    // Clear and close
    setPlayerList("");
    setError(null);
    onClose();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Multiple Players</h2>
      <div className="space-y-2">
        <Label htmlFor="playerList">Enter player list (one per line)</Label>
        <Textarea
          id="playerList"
          value={playerList}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPlayerList(e.target.value)
          }
          placeholder="1 - Player Name&#10;2 - Another Player&#10;3 - Yet Another"
          className="min-h-40"
        />
        <p className="text-sm text-gray-500">
          Format: "1 - Player Name" (one player per line)
        </p>
      </div>

      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddPlayers}>Add Players</Button>
      </div>
    </div>
  );
}
