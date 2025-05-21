import { create } from "zustand";
import { TEAM_TYPE } from "@/models/player";
import type { Player, Team, Teams } from "@/models/player";

interface PlayerState {
  players: Player[];
  teams: Teams | null;
  addPlayer: (player: Omit<Player, "id">) => void;
  removePlayer: (id: string) => void;
  updatePlayerRating: (id: string, rating: number) => void;
  clearPlayers: () => void;
  sortTeams: () => void;
  resetTeams: () => void;
  canSortTeams: () => boolean;
}

const createTeam = (id: string): Team => ({
  id,
  players: [],
  averageRating: 0,
  totalRating: 0,
});

const calculateTeamStats = (team: Team): Team => {
  const totalRating = team.players.reduce(
    (sum, player) => sum + player.rating,
    0,
  );
  const averageRating = team.players.length
    ? totalRating / team.players.length
    : 0;

  return {
    ...team,
    totalRating,
    averageRating,
  };
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  players: [],
  teams: null,

  addPlayer: (playerData) => {
    set((state) => ({
      players: [
        ...state.players,
        {
          id: crypto.randomUUID(),
          ...playerData,
        },
      ],
    }));
  },

  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    }));
  },

  updatePlayerRating: (id, rating) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, rating } : player,
      ),
    }));
  },

  clearPlayers: () => {
    set({ players: [], teams: null });
  },

  sortTeams: () => {
    const { players } = get();

    if (players.length < 12) {
      console.error("Not enough players to create teams");
      return;
    }

    // Copy the players
    const playersCopy = [...players];

    // Create teams
    const teamA = createTeam(TEAM_TYPE.TEAM_A);
    const teamB = createTeam(TEAM_TYPE.TEAM_B);

    // Group players by rating
    const playersByRating: Record<number, Player[]> = {};

    playersCopy.forEach((player) => {
      if (!playersByRating[player.rating]) {
        playersByRating[player.rating] = [];
      }
      playersByRating[player.rating].push(player);
    });

    // Shuffle players within each rating group
    Object.values(playersByRating).forEach((group) => {
      group.sort(() => Math.random() - 0.5);
    });

    // Get ratings sorted from highest to lowest
    const ratings = Object.keys(playersByRating)
      .map(Number)
      .sort((a, b) => b - a);

    // Distribute players using a more balanced approach
    let teamASum = 0;
    let teamBSum = 0;

    // First, distribute the highest-rated players alternately
    ratings.forEach((rating) => {
      const playersWithRating = playersByRating[rating];

      while (playersWithRating.length > 0) {
        // Always give to the team with the lower total
        if (
          teamASum <= teamBSum &&
          teamA.players.length < playersCopy.length / 2
        ) {
          const player = playersWithRating.pop()!;
          teamA.players.push(player);
          teamASum += player.rating;
        } else if (teamB.players.length < playersCopy.length / 2) {
          const player = playersWithRating.pop()!;
          teamB.players.push(player);
          teamBSum += player.rating;
        } else {
          // If one team is full, add remaining players to the other team
          const player = playersWithRating.pop()!;
          if (teamA.players.length < playersCopy.length / 2) {
            teamA.players.push(player);
            teamASum += player.rating;
          } else {
            teamB.players.push(player);
            teamBSum += player.rating;
          }
        }
      }
    });

    // Calculate team stats
    const updatedTeamA = calculateTeamStats(teamA);
    const updatedTeamB = calculateTeamStats(teamB);

    console.info(updatedTeamA, updatedTeamB);

    set({
      teams: {
        [TEAM_TYPE.TEAM_A]: updatedTeamA,
        [TEAM_TYPE.TEAM_B]: updatedTeamB,
      },
    });
  },

  resetTeams: () => {
    set({ teams: null });
  },

  canSortTeams: () => {
    const { players } = get();
    return players.length >= 12 && players.length <= 16;
  },
}));
