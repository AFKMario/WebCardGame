import { Events } from "../../../shared/models/events";
import {
  CardAcceptPayload,
  CardFaceDownPayload,
  CardFlipPayload,
  CardPassPayload,
  CardRejectPayload,
} from "../../../shared/payloads/card";
import {
  GameDealCard,
  GameUpdatePayload,
  SyncStatePayload,
} from "../../../shared/payloads/sync";
import {
  VoteResultPayload,
  VoteSubmitPayload,
} from "../../../shared/payloads/vote";

// --- Define what the client sends to the server
export interface ClientToServerEvents {
  [Events.PlayerConnect]: () => void;
  [Events.CardAccept]: (payload: CardAcceptPayload) => void;
  [Events.CardFaceDown]: (payload: CardFaceDownPayload) => void;
  [Events.CardPass]: (payload: CardPassPayload) => void;
  [Events.CardReject]: (payload: CardRejectPayload) => void;
  [Events.VoteSubmit]: (payload: VoteSubmitPayload) => void;
}

// --- Define what the server emits to the client
export interface ServerToClientEvents {
  [Events.SyncState]: (payload: SyncStatePayload) => void; // Replace 'any' with actual SyncStatePayload
  [Events.CardFlip]: (payload: CardFlipPayload) => void;
  [Events.VoteStart]: () => void;
  [Events.VoteResult]: (payload: VoteResultPayload) => void;
  [Events.GameDealCard]: (payload: GameDealCard) => void;
  [Events.GameUpdate]: (payload: GameUpdatePayload) => void;
}

// --- Optional: For scaling
interface InterServerEvents {
  ping: () => void;
}

// --- Data you store per socket
export interface SocketData {
  name: string;
  playerId: string;
}
