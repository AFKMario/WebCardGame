import { Card } from "./card";

export interface Player {
  id: string; // socket ID or server-assigned
  name: string;
  hand: Card[];
  score: number;
  isConnected: boolean;
}

export interface PlayerSummary {
  id: string;
  name: string;
  handSize: number;
  score: number;
  isConnected: boolean;
}
