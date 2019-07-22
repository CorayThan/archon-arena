import {remove} from "lodash"
import {CardInGame} from "../shared/gamestate/CardInGame"
import {Creature} from "../shared/gamestate/Creature"
import {Artifact} from "../shared/gamestate/Artifact"
import {GameState, PlayerState} from "../shared/gamestate/GameState"
import {getCardOwner} from "../game/StateUtils"

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
    return friendlyCreatures(state).concat(enemyCreatures(state))
}

export const friendlyArtifacts = (state: GameState): Artifact[] => {
    return activePlayerState(state).artifacts
}

export const enemyArtifacts = (state: GameState): Artifact[] => {
    return inactivePlayerState(state).artifacts
}

export const allArtifacts = (state: GameState): Artifact[] => {
    return friendlyArtifacts(state).concat(enemyArtifacts(state))
}

export const enemyUpgrades = (state: GameState): CardInGame[] => {
    return inactivePlayerState(state)
        .creatures.reduce((upgrades, creature: Creature) => {
            // @ts-ignore
            return upgrades.concat(creature.upgrades)
        }, [])
}

export const enemyCards = (state: GameState): CardInGame[] => {
    return enemyCreatures(state).map(creature => creature as CardInGame)
        .concat(enemyArtifacts(state).map(artifact => artifact as CardInGame))
        .concat(enemyUpgrades(state))
}

export const friendlyPlayerForCard = (state: GameState, card: CardInGame): PlayerState => {
    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(card.id) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(card.id) !== -1
        )
        return playerOneState
    else
        return state.playerTwoState
}

export const enemyPlayerForCard = (state: GameState, card: CardInGame): PlayerState => {
    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(card.id) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(card.id) !== -1
        )
        return state.playerTwoState
    else
        return playerOneState
}

export const removeAndReturn = (state: GameState, card: CardInGame): CardInGame => {
    const check = (cardToCheck: CardInGame) => cardToCheck.id === card.id
    const playerStates = [state.playerOneState, state.playerTwoState]
    for (let i = 0; i < playerStates.length; i++) {
        const playerState = playerStates[i];
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
    }
    throw new Error("Couldn't find card with id " + card.id)
}

export const putInArchives = (state: GameState, card: CardInGame, friendlyArchives: boolean) => {
    const toAdd = removeAndReturn(state, card)
    const myState = friendlyArchives ? activePlayerState(state) : inactivePlayerState(state)
    myState.archives.push(toAdd)
}

export const stunCreature = (creature: Creature) => {
    creature.tokens.stun = 1
}

export const destroyCard = (state: GameState, card: CardInGame): boolean => {
    const owner: PlayerState = friendlyPlayerForCard(state, card)
    removeAndReturn(state, card)
    owner.discard.push(card)

    //TODO, the return statement says whether the card was actually destroyed
    return true
}

export const readyCreature = (creature: Creature) => {
    creature.ready = true
}

export const fightUsingCreature = (creature: Creature) => {
    creature.ready = false
    //TODO
}

export const putOnTopOfDeck = (state: GameState, card: CardInGame) => {
    const owner = getCardOwner(card.id, state)
    removeAndReturn(state, card)
    owner.library.unshift(card)
}

export const getNeighbors = (creatures: Creature[], creature: Creature): Creature[] => {
    let foundCreatures:Creature[]
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

export const putInHand = (card: CardInGame) => {
    //TODO
}

export const gainChains = (state: PlayerState, amount:number) => {
    state.chains += amount
}

export const enemyCreatureDiedThisTurn = (state: GameState): boolean => {
    //TODO
    return false
}

export const discardTopCard = (state: GameState, activePlayer: boolean): CardInGame => {
    //TODO
    return state.playerOneState.creatures[0]
}

export const captureAmber = (state: GameState, creature: Creature, amount: number) => {
    creature.tokens.amber += modifyAmber(enemyPlayerForCard(state, creature), amount)
}

export const mustFightWhenUsedIfAble = (creature: Creature) => {
    //I'm drawing a complete blank here
    //TODO
}

export const getNumberOfCreaturesDestroyedInAFight = (state: GameState): number => {
    //TODO
    return 0
}

export const exhaustCard = (card: Creature | Artifact) => {
    card.ready = false
}

export const modifyAmber = (playerState: PlayerState, amount: number): number => {
    const actualChange = playerState.amber + amount >= 0 ? amount : playerState.amber
    playerState.amber = playerState.amber + actualChange
    return actualChange
}

export const shuffleDeck = (playerState: PlayerState) => {
    //TODO
}

export const numberOfCardsPlayedThisTurn = (state: GameState): number => {
    //TODO
    return 0
}

export const healCreature = (creature: Creature, amount:number): number => {
    const actualChange = creature.tokens.damage - amount >= 0 ? amount : creature.tokens.damage
    creature.tokens.damage = creature.tokens.damage - actualChange
    return actualChange
}

export const amountOfShards = (state: GameState): number => {
    return friendlyArtifacts(state)
        .filter(artifact => (artifact as Artifact).backingCard.traits.includes("Shard")).length
}

export const steal = (state: GameState, amount: number): number => {
    return modifyAmber(activePlayerState(state), modifyAmber(inactivePlayerState(state), amount))
}
