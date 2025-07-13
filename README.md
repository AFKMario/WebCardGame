# Web Card Game

This project is mostly for learning.

## API

| Event Name             | Who Sends       | Description                            |
| ---------------------- | --------------- | -------------------------------------- |
| `player:connect`       | Client ➡ Server | Player joins the game                  |
| `sync:state`           | Server ➡ Client | Full game state sync for one player    |
| `card:accept`          | Client ➡ Server | Receiving player accepts a passed card |
| `card:draw`            | Client ➡ Server | Player draws a card from center        |
| `card:face-down`       | Client ➡ Server | Player marks a card face down          |
| `card:flip`            | Server ➡ All    | Server reveals the passed card         |
| `card:pass`            | Client ➡ Server | Player declares and passes a card      |
| `card:reject`          | Client ➡ Server | Receiving player rejects a passed card |
| `vote:result`          | Server ➡ All    | Broadcast result of the vote           |
| `vote:start`           | Server ➡ All    | Starts vote on passed card validity    |
| `vote:submit`          | Client ➡ Server | A player submits a vote (yes/no)       |
| `game:deal-card`       | Server ➡ Client | Deal card to player                    |
| `game:update`          | Server ➡ All    | Broadcast minimal game state update    |

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
