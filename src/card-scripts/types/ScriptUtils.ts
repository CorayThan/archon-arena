import { remove } from "lodash"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { Creature } from "../../shared/gamestate/Creature"
import { GameState, PlayerState } from "../../shared/gamestate/GameState"

export const activePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id === state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}

export const inactivePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id !== state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}

export const friendlyCreatures = (state: GameState): Creature[] => {
    return activePlayerState(state).creatures
}

export const removeAndReturn = (state: GameState, card: CardInGame): CardInGame => {
    const check = (cardToCheck: CardInGame) => cardToCheck.id === card.id
    const playerStates = [state.playerOneState, state.playerTwoState]
    playerStates.forEach((playerState) => {
        let removed: CardInGame[] = remove(playerState.creatures, check)
        if (removed.length > 0) {
            return removed[0]
        }
        removed = remove(playerState.artifacts, check)
        if (removed.length > 0) {
            return removed[0]
        }
        removed = remove(playerState.archives, check)
        if (removed.length > 0) {
            return removed[0]
        }
        removed = remove(playerState.discard, check)
        if (removed.length > 0) {
            return removed[0]
        }
        removed = remove(playerState.hand, check)
        if (removed.length > 0) {
            return removed[0]
        }
        removed = remove(playerState.library, check)
        if (removed.length > 0) {
            return removed[0]
        }   
    })
    throw new Error("Couldn't find card with id " + card.id)
}

export const putInArchives = (state: GameState, card: CardInGame, friendlyArchives: boolean) => {
    const toAdd = removeAndReturn(state, card)
    const myState = friendlyArchives ? activePlayerState(state) : inactivePlayerState(state)
    myState.archives.push(toAdd)
}
