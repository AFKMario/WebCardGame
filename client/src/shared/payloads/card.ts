import { Card } from "../models/card";

export interface CardPassPayload {
  cardId: string;
  declaredName: string;
}

export interface CardFaceDownPayload {
  cardId: string;
}

export interface VoteSubmitPayload {
  vote: 'yes' | 'no';
}
