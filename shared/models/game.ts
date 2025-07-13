import { PlayerSummary } from "./player";
import { Card } from "./card";

export interface GameState {
  phase: GamePhase;
  currentPlayerId: string;
  players: Record<string, PlayerSummary>;
  centerPile: Card[];
  discardPile: Card[];
  round: number;
}

export enum GamePhase {
  Setup = "setup",
  DealCards = "deal-cards",
  HideCards = "hide-cards",
  DrawCard = "draw-card",
  PassCard = "pass-card",
  ResolvePass = "resolve-pass",
  Voting = "voting",
  End = "end",
}
