import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { GameState, GamePhase } from './shared/models/game.ts';
import { PlayerSummary } from './shared/models/player.ts';
import { Card } from './shared/models/card.ts';
import { Events } from './shared/models/events.ts';

const ENDPOINT = 'http://localhost:3000'; // Change if needed

interface ClientState {
  socket: Socket | null;
  playerId: string | null;
  game: GameState | null;
  hand: Card[];
  pendingCard?: Card;
  voteActive: boolean;
  voteResult?: string;
}

const App: React.FC = () => {
  const [client, setClient] = useState<ClientState>({
    socket: null,
    playerId: null,
    game: null,
    hand: [],
    voteActive: false,
  });
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [vote, setVote] = useState(null as 'yes' | 'no' | null);

  // Connect socket
  useEffect(() => {
    if (!client.socket) {
      const socket = io(ENDPOINT);
      setClient((c) => ({ ...c, socket }));
      socket.on(Events.SyncState, (game: GameState & { hand: Card[] }) => {
        setClient((c) => ({ ...c, game, hand: game.hand }));
      });
      socket.on(Events.GameUpdate, (game: GameState) => {
        setClient((c) => ({ ...c, game }));
      });
      socket.on(Events.GameDealCard, (card: Card) => {
        setClient((c) => ({ ...c, hand: [...c.hand, card] }));
      });
      socket.on(Events.CardFlip, (card: Card) => {
        // Could show animation or update UI
      });
      socket.on(Events.VoteStart, () => {
        setClient((c) => ({ ...c, voteActive: true }));
        setVote(null);
      });
      socket.on(Events.VoteResult, (result: string) => {
        setClient((c) => ({ ...c, voteActive: false, voteResult: result }));
      });
    }
  }, [client.socket]);

  // Join game
  const handleJoin = () => {
    if (client.socket && playerName) {
      client.socket.emit(Events.PlayerConnect, { name: playerName });
      setNameSubmitted(true);
    }
  };

  // Game actions
  const drawCard = () => client.socket?.emit('card:draw'); // No Events constant for this
  const faceDown = (cardId: string) => client.socket?.emit(Events.CardFaceDown, { cardId });
  const passCard = (cardId: string, declaredName: string) => client.socket?.emit(Events.CardPass, { cardId, declaredName });
  const acceptCard = () => client.socket?.emit(Events.CardAccept);
  const rejectCard = () => client.socket?.emit(Events.CardReject);
  const submitVote = (vote: 'yes' | 'no') => {
    setVote(vote);
    client.socket?.emit(Events.VoteSubmit, { vote });
  };

  // UI helpers
  const isMyTurn = () => client.game?.currentPlayerId === client.playerId;
  // const mySummary = client.game?.players[client.playerId || ''];

  // Render
  if (!nameSubmitted) {
    return (
      <div className="App">
        <h2>Enter your name to join:</h2>
        <input value={playerName} onChange={e => setPlayerName(e.target.value)} />
        <button onClick={handleJoin} disabled={!playerName}>Join</button>
      </div>
    );
  }
  if (!client.game) return <div>Waiting for game state...</div>;

  return (
    <div className="App">
      <h1>Web Card Game</h1>
      <div>Phase: {client.game.phase}</div>
      <div>Round: {client.game.round}</div>
      <div>Players:
        <ul>
          {(Object.values(client.game.players) as PlayerSummary[]).map((p) => (
            <li key={p.id}>{p.name} (Score: {p.score}) {p.id === client.game?.currentPlayerId && '← Turn'}</li>
          ))}
        </ul>
      </div>
      <div>Your hand:
        <ul>
          {client.hand.map(card => (
            <li key={card.id}>{card.faceUp ? card.name : '???'}
              {client.game?.phase === GamePhase.HideCards && (
                <button onClick={() => faceDown(card.id)}>Face Down</button>
              )}
              {client.game?.phase === GamePhase.PassCard && isMyTurn() && (
                <button onClick={() => passCard(card.id, card.name)}>Pass</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {client.game.phase === GamePhase.DrawCard && isMyTurn() && (
        <button onClick={drawCard}>Draw from Center</button>
      )}
      {client.game.phase === GamePhase.ResolvePass && (
        <div>
          <button onClick={acceptCard}>Accept</button>
          <button onClick={rejectCard}>Reject</button>
        </div>
      )}
      {client.voteActive && (
        <div>
          <h3>Vote: Was the card name correct?</h3>
          <button disabled={!!vote} onClick={() => submitVote('yes')}>Yes</button>
          <button disabled={!!vote} onClick={() => submitVote('no')}>No</button>
        </div>
      )}
      {client.voteResult && <div>Vote Result: {client.voteResult}</div>}
      <div>Center Pile: {client.game.centerPile.length} cards</div>
      <div>Discard Pile: {client.game.discardPile.length} cards</div>
    </div>
  );
};

export default App;
