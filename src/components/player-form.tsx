import React, { useState } from "react";
import { usePlayerStore } from "@/view-models/player-store";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";

const MAX_PLAYERS = 16;
const MIN_PLAYERS = 12;
const MIN_RATING = 1;
const MAX_RATING = 10;

export function PlayerForm() {
  const { players, addPlayer } = usePlayerStore();
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);

  const canAddMorePlayers = players.length < MAX_PLAYERS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Player name is required");
      return;
    }

    if (rating < MIN_RATING || rating > MAX_RATING) {
      setError(`Rating must be between ${MIN_RATING} and ${MAX_RATING}`);
      return;
    }

    if (!canAddMorePlayers) {
      setError(`Maximum ${MAX_PLAYERS} players allowed`);
      return;
    }

    addPlayer({
      name: name.trim(),
      rating,
    });

    // Reset form
    setName("");
    setRating(5);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Player Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          disabled={!canAddMorePlayers}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Player Rating (1-10)</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setRating((prev) => Math.max(MIN_RATING, prev - 1))}
            disabled={!canAddMorePlayers || rating <= MIN_RATING}
          >
            <MinusIcon className="size-3" />
          </Button>
          <Input
            id="rating"
            type="number"
            min={MIN_RATING}
            max={MAX_RATING}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={!canAddMorePlayers}
            className="text-center w-11"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setRating((prev) => Math.min(MAX_RATING, prev + 1))}
            disabled={!canAddMorePlayers || rating >= MAX_RATING}
          >
            <PlusIcon className="size-3" />
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      <div className="flex justify-between items-center">
        <div className="text-sm">
          Players: {players.length}/{MAX_PLAYERS}
          {players.length < MIN_PLAYERS && (
            <span className="text-amber-500 ml-2">
              (Need at least {MIN_PLAYERS})
            </span>
          )}
        </div>
        <Button type="submit" disabled={!canAddMorePlayers}>
          Add Player
        </Button>
      </div>
    </form>
  );
}
