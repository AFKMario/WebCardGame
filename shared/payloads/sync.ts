import { GameState } from "../models/game";
import { Card } from "../models/card";

export interface SyncStatePayload {
  game: GameState;
  yourHand: Card[];
}

export interface GameDealCard {
  card: Card;
}

export interface GameUpdatePayload {
  game: Partial<GameState>;
}
