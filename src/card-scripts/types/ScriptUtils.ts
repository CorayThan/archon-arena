import { remove } from "lodash"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { Creature } from "../../shared/gamestate/Creature"
import { Artifact } from "../../shared/gamestate/Artifact"
import { GameState, PlayerState } from "../../shared/gamestate/GameState"
import { CardActionConfig } from "CardScript"

export const activePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id === state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}

export const inactivePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id !== state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}

export const friendlyCreatures = (state: GameState): Creature[] => {
    return activePlayerState(state).creatures
}

export const enemyCreatures = (state: GameState): Creature[] => {
    return inactivePlayerState(state).creatures
}

export const allCreatures = (state: GameState): Creature[] => {
    return activePlayerState(state).creatures.concat(inactivePlayerState(state).creatures)

}

export const cardController = (state: GameState, cardId: string): PlayerState => {
    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(cardId) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(cardId) !== -1
        )
        return playerOneState
    else
        return state.playerTwoState
}

export const cardEnemy = (state: GameState, cardId: string): PlayerState => {    
    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(cardId) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(cardId) !== -1
        )
        return state.playerTwoState
    else
        return playerOneState
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

export const checkIfHasTargets = (config: CardActionConfig, numberOfTargets: number): boolean => {
    return config && config.targets && config.targets.length >= numberOfTargets
}

export const stunCreature = (creature: Creature) => {
    creature.tokens.stun = 1
}

export const destroyCard = (card: CardInGame) => {
    //TODO
}

export const readyCreature = (creature: Creature) => {
    creature.ready = true
}

export const fightUsingCreature = (creature: Creature) => {
    //TODO
}

export const putOnTopOfDeck = (card: CardInGame) => {
    //TODO
}

export const getNeighbors = (creatures: Creature[], creature: Creature): Creature[] => {
    var foundCreatures:Creature[]
    const index = creatures.findIndex(creat => creat.id === creature.id)
    if (index > 0 && index < creatures.length-1)
        foundCreatures = [creatures[index-1], creatures[index+1]]
    else if (index > 0)
        foundCreatures = [creatures[index-1]]
    else if (index < creatures.length-1)
        foundCreatures = [creatures[index+1]]
    else
        foundCreatures = []
    return foundCreatures
}

export const onFlank = (creatures: Creature[], creature: Creature): boolean => {
    const index = creatures.findIndex(creat => creat.id === creature.id)
    return index === 0 || index === creatures.length-1
}

export const dealDamage = (creature: Creature, damage: number) => {
    creature.tokens.damage += damage
}

export const dealDamageWithSplash = (state: GameState, creature: Creature, damage: number, splash: number) => {
    const neighbors = getNeighbors(enemyCreatures(state), creature).concat(getNeighbors(friendlyCreatures(state), creature))
    creature.tokens.damage += damage
    neighbors.forEach(neighbor => neighbor.tokens.damage += splash)
}

export const placeAmber = (creature: Creature, amber: number) => {
    creature.tokens.amber += amber
}

export const enableFighting = (creature: Creature) => {
    //TODO
}

export const getMostPowerful = (creatures: Creature[], amount: number): Creature[] => {
    creatures.sort((a, b) => a.power - b.power)
    return creatures.slice(amount)
}

export const returnToHand = (card: CardInGame) => {
    //TODO
}

export const gainChains = (state: PlayerState, amount:number) => {
    state.chains += amount
}

export const enemyCreatureDiedThisTurn = (state: GameState): boolean => {
    //TODO
}

export const discardTopCard = (state: GameState, activePlayer: boolean): CardInGame => {
    //TODO
}

export const captureAmber = (state: GameState, creature: Creature, amount: number) => {
    //I feel like cards should have a reference to their controller somehow...
    //TODO
}

export const mustFightIfAble = (creature: Creature) => {
    //I'm drawing a complete blank here
    //TODO
}