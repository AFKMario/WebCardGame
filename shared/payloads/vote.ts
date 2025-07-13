import { Player } from "../models/player";

export interface VoteSubmitPayload {
  vote: "yes" | "no";
}

export interface VoteResultPayload {
  passed: boolean;
  waitingOnPlayers: Player[];
  playerPenalizedId: string;
  newTurnPlayerId: string;
}
