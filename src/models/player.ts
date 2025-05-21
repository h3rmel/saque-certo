export interface Player {
  id: string;
  name: string;
  rating: number;
}

export interface Team {
  id: string;
  players: Player[];
  averageRating: number;
  totalRating: number;
}

export enum TEAM_TYPE {
  TEAM_A = "Team A",
  TEAM_B = "Team B"
}

export type Teams = {
  [TEAM_TYPE.TEAM_A]: Team;
  [TEAM_TYPE.TEAM_B]: Team;
}; 