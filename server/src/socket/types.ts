import { Events } from "../shared/models/events";
import {
  CardAcceptPayload,
  CardFaceDownPayload,
  CardFlipPayload,
  CardPassPayload,
  CardRejectPayload,
} from "../shared/payloads/card";
import {
  GameDealCard,
  GameUpdatePayload,
  SyncStatePayload,
} from "../shared/payloads/sync";
import {
  VoteResultPayload,
  VoteSubmitPayload,
} from "../shared/payloads/vote";
import { GenericResponse } from "../shared/responses/GenericResponse";

// --- Define what the client sends to the server
export interface ClientToServerEvents {
  [Events.PlayerConnect]: () => GenericResponse;
  [Events.CardAccept]: (payload: CardAcceptPayload) => GenericResponse;
  [Events.CardFaceDown]: (payload: CardFaceDownPayload) => GenericResponse;
  [Events.CardPass]: (payload: CardPassPayload) => GenericResponse;
  [Events.CardReject]: (payload: CardRejectPayload) => GenericResponse;
  [Events.VoteSubmit]: (payload: VoteSubmitPayload) => GenericResponse;
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
