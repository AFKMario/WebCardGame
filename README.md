# Web Card Game

This project is mostly for learning.

## API

| Event Name             | Who Sends       | Description                            |
| ---------------------- | --------------- | -------------------------------------- |
| `player:connect`       | Client ➡ Server | Player joins the game                  |
| `sync:state`           | Server ➡ Client | Full game state sync for one player    |
| `game:deal-card`       | Server ➡ Client | Deal card to player                    |
| `card:face-down`       | Client ➡ Server | Player marks a card face down          |
| `card:draw`            | Client ➡ Server | Player draws a card from center        |
| `card:pass`            | Client ➡ Server | Player declares and passes a card      |
| `card:accept`          | Client ➡ Server | Receiving player accepts a passed card |
| `card:reject`          | Client ➡ Server | Receiving player rejects a passed card |
| `card:flip`            | Server ➡ Client | Server reveals the passed card         |
| `vote:start`           | Server ➡ All    | Starts vote on passed card validity    |
| `vote:submit`          | Client ➡ Server | A player submits a vote (yes/no)       |
| `vote:result`          | Server ➡ All    | Broadcast result of the vote           |
| `game:next-turn`       | Server ➡ All    | Advance to the next turn               |
| `game:update`          | Server ➡ All    | Broadcast minimal game state update    |
| `error:invalid-action` | Server ➡ Client | Notifies client of an invalid action   |

## Game flow

Game Join
Host -> Start

Phase 1:
Server sends every player 1 card face up
Player is randomly chosen to start
Players individually press button to make card face down going in a circle clockwise from person who starts.

Phase 2:
Player whos turn it is must grab a card from the center
Player whos turn it is must press button to make card face down

Phase 3:
Player whos turn it is says name of old card and passes old card to next player

Phase 4:
Receiving player must choose "Accept" or "Reject"

- On Accept:
  - It is now the turn of the player that received the card
  - Go back to Phase 3
- On Reject:
  - Flip the card face up (Below actions will require voting or host to decide)
    - If the player said the incorrect name of the card, he will get -1 points and it will be his turn again
    - If the rejecter rejected the card after the correct name was said, then the rejecter gets -1 points and it will now be his turn
  - Go back to Phase 2
