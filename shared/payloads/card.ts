export interface CardPassPayload {
  cardId: string;
}

export interface CardAcceptPayload {
  cardId: string;
}

export interface CardRejectPayload {
  cardId: string;
}

export interface CardFaceDownPayload {
  cardId: string;
}

export interface CardFlipPayload {
  cardId: string;
  face: "up" | "down";
}
