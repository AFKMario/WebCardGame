export const Events = {
  PlayerConnect: "player:connect",
  SyncState: "sync:state",
  CardPass: "card:pass",
  CardAccept: "card:accept",
  CardReject: "card:reject",
  CardFaceDown: "card:face-down",
  CardFlip: "card:flip",
  VoteStart: "vote:start",
  VoteSubmit: "vote:submit",
  VoteResult: "vote:result",
  GameDealCard: "game:deal-card",
  GameUpdate: "game:update",
  InvalidAction: "error:invalid-action",
} as const;

export type EventName = (typeof Events)[keyof typeof Events];
