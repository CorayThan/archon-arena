import { remove, shuffle, slice, take } from "lodash"
import { CardInGame } from "../shared/gamestate/CardInGame"
import { Creature } from "../shared/gamestate/Creature"
import { Artifact } from "../shared/gamestate/Artifact"
import { GameState, PlayerState } from "../shared/gamestate/GameState"
import {IndividualScript} from "./types/CardScript";

export const activePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id === state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}

export const inactivePlayerState = (state: GameState): PlayerState => {
    return state.activePlayer.id !== state.playerOneState.player.id ? state.playerOneState : state.playerTwoState
}
export const otherPlayerState = (state: GameState, playerState: PlayerState): PlayerState => {
    return playerState.player.id === state.playerOneState.player.id ? state.playerTwoState : state.playerOneState
}

export const allPlayerStates = (state: GameState) => {
    return [state.playerOneState, state.playerTwoState]
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
    //TODO
    return []
}

export const enemyCards = (state: GameState): CardInGame[] => {
    return enemyCreatures(state).map(creature => creature as CardInGame)
        .concat(enemyArtifacts(state).map(artifact => artifact as CardInGame))
        .concat(enemyUpgrades(state))
}

export const friendlyPlayer = (state: GameState, card: CardInGame): PlayerState => {

    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(card.id) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(card.id) !== -1
    )
        return playerOneState
    else
        return state.playerTwoState
}

export const enemyPlayer = (state: GameState, card: CardInGame): PlayerState => {
    const playerOneState = state.playerOneState
    if (
        playerOneState.artifacts.map(artifact => artifact.id).indexOf(card.id) !== -1
        || playerOneState.creatures.map(creature => creature.id).indexOf(card.id) !== -1
    )
        return state.playerTwoState
    else return playerOneState
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

export const putInDeck = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        myState.library.push(toAdd)
        shuffle(myState.library)
    })
}

export const putInHand = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        myState.hand.push(toAdd)
    })
}

export const putOnTopOfDeck = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        myState.library.unshift(toAdd)
    })
}

export const putInArchives = (state: GameState, cards: CardInGame[], friendly: boolean) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = friendly ? activePlayerState(state) : inactivePlayerState(state)
        myState.archives.push(toAdd)
    })
}

export const purgeCards = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        myState.purged.push(toAdd)
    })
}

export const discardCards = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        myState.discard.push(toAdd)
    })
}

export const discardTopCard = (state: GameState, playerState: PlayerState): CardInGame | boolean => {
    if (0 >= playerState.library.length) return false
    const discardedCard = playerState.library[0]
    removeAndReturn(state, discardedCard)
    discardCards(state, [discardedCard])
    return discardedCard
}

export const destroyCard = (card: CardInGame): boolean => {
    //TODO, the return statement says whether the card was actually destroyed
    return true
}

export const destroyCards = (state: GameState, cards: CardInGame[]) => {
    cards.forEach(card => {
        const toAdd = removeAndReturn(state, card)
        const myState = card.ownerId === state.playerOneState.player.id ? activePlayerState(state) : inactivePlayerState(state)
        //TODO Check to see if card has destroyed effects then put in discard if is can
        myState.discard.push(toAdd)
    })
}

//TODO make theis function take (state: GameState, creature: Creature)
export const getNeighbors = (creatures: Creature[], creature: Creature): Creature[] => {
    let foundCreatures: Creature[]
    const index = creatures.findIndex(creat => creat.id === creature.id)
    if (index > 0 && index < creatures.length - 1)
        foundCreatures = [creatures[index - 1], creatures[index + 1]]
    else if (index > 0)
        foundCreatures = [creatures[index - 1]]
    else if (index < creatures.length - 1)
        foundCreatures = [creatures[index + 1]]
    else
        foundCreatures = []
    return foundCreatures
}

export const onFlank = (creatures: Creature[], creature: Creature): boolean => {
    const index = creatures.findIndex(x => x.id === creature.id)
    return index === 0 || index === creatures.length - 1
}

export const isFlank = (state: GameState, creature: Creature): boolean => {
    return allFlankCreatures(state).some(x => (x as Creature).id === creature.id)
}

export const friendlyFlankCreatures = (state: GameState): Creature[] => {
    const creatures = friendlyCreatures(state)
    if (creatures.length < 3) return creatures
    return creatures.slice(0, 1).slice(-1)
}

export const enemyFlankCreatures = (state: GameState): Creature[] => {
    const creatures = enemyCreatures(state)
    if (creatures.length < 3) return creatures
    return creatures.slice(0, 1).slice(-1)
}

export const allFlankCreatures = (state: GameState): Creature[] => {
    return friendlyFlankCreatures(state).concat(enemyFlankCreatures(state))
}

export const friendlyNonFlankCreatures = (state: GameState): Creature[] => {
    const creatures = friendlyCreatures(state)
    if (creatures.length < 3) return []
    return creatures.slice(1, creatures.length - 2)
}

export const enemyNonFlankCreatures = (state: GameState): Creature[] => {
    const creatures = enemyCreatures(state)
    if (creatures.length < 3) return creatures
    return creatures.slice(1, creatures.length - 2)
}

export const toTheRight = (state: GameState, creature: Creature): Creature[] => {
    const index = friendlyCreatures(state).findIndex(x => x.id === creature.id)
    return friendlyCreatures(state).slice(index)
}

export const toTheLeft = (state: GameState, creature: Creature): Creature[] => {
    const index = friendlyCreatures(state).findIndex(x => x.id === creature.id)
    return friendlyCreatures(state).slice(0, index)
}

export const allNonFlankCreatures = (state: GameState): Creature[] => {
    return friendlyNonFlankCreatures(state).concat(enemyNonFlankCreatures(state))
}

export const getMostPowerful = (creatures: Creature[]): Creature[] => {
    return creatures.sort((a, b) => a.power - b.power)
        .filter(creature => creature.power >= creatures[0].power)
}
export const getLeastPowerful = (creatures: Creature[]): Creature[] => {
    return creatures.sort((a, b) => b.power - a.power)
        .filter(creature => creatures[0].power <= creature.power)
}

export const enemyCreatureDiedThisTurn = (state: GameState): boolean => {
    //TODO
    return false
}

export const mustFightWhenUsedIfAble = (creature: Creature) => {
    //I'm drawing a complete blank here
    //TODO
}

export const getNumberOfCreaturesDestroyedInAFight = (state: GameState): number => {
    //TODO
    return 0
}

export const numberOfCardsPlayedThisTurn = (state: GameState): number => {
    //TODO
    return 0
}

export const cardsPlayedThisTurn = (state: GameState): CardInGame[] => {
    //TODO
    return [] as CardInGame[]
}

export const amountOfShards = (state: GameState): number => {
    return friendlyArtifacts(state)
        .filter(artifact => (artifact as Artifact).backingCard.traits.includes("Shard")).length
}

export const getCardsWithTrait = (cards: CardInGame[] | Creature[] | Artifact[], trait: string): Creature[] | Artifact[] | CardInGame[] => {
    return cards.filter(card => card.backingCard.traits.includes(trait))
}

export const drawHand = (playerState: PlayerState) => {
    const amount = playerState.handSize - playerState.hand.length
    if (0 >= amount) return
    drawCards(playerState, amount)
    playerState.chains--
}

export const drawCards = (playerState: PlayerState, amount: number) => {
    if (playerState.library.length < amount) {
        amount = amount - playerState.library.length
        playerState.hand.concat(playerState.library)
        playerState.library = shuffle(playerState.discard)
    }
    playerState.hand.concat(take(playerState.library, amount))
    playerState.library = slice(playerState.library, 0, amount - 1)
}

export const shuffleDeck = (playerState: PlayerState) => {
    shuffle(playerState.library)
}

export const revealCards = (state: GameState, cards: CardInGame[]) => {
    //TODO
}

export const playCards = (state: GameState, cards: CardInGame[]) => {
    //TODO
}

export const readyCreature = (creature: Creature) => {
    creature.ready = true
}

export const readyCreatures = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.ready = true)
}

export const useCreatures = (creatures: Creature[]) => {
//TODO
}

export const useArtifact = (artifacts: Artifact[]) => {
//TODO
}

export const fightUsingCreatures = (creatures: Creature[]) => {
    //TODO
}

export const fightUsingCreature = (creature: Creature) => {
    //TODO
}

export const healCreature = (creature: Creature, amount: number): number => {
    const actualChange = creature.tokens.damage - amount >= 0 ? amount : creature.tokens.damage
    creature.tokens.damage = creature.tokens.damage - actualChange
    return actualChange
}

export const healCreatures = (creatures: Creature[], amount: number) => {
    creatures.forEach(creature => {
        const actualChange = creature.tokens.damage - amount >= 0 ? amount : creature.tokens.damage
        creature.tokens.damage = creature.tokens.damage - actualChange
    })
}

export const exhaustCard = (card: Creature | Artifact) => {
    card.ready = false
}

export const dealDamage = (creatures: Creature[], damage: number) => {
    creatures.forEach(creature => {
        creature.tokens.armor = Math.max(0, creature.tokens.armor - damage)
        damage = Math.max(0, damage - creature.tokens.armor)
        creature.tokens.damage += damage
    })
}

export const dealDamageWithSplash = (state: GameState, creature: Creature, damage: number, splash: number) => {
    const neighbors = getNeighbors(enemyCreatures(state), creature).concat(getNeighbors(friendlyCreatures(state), creature))
    dealDamage([creature], damage)
    dealDamage(neighbors, splash)
}

export const totalPower = (creature: Creature): number => {
    return creature.power + creature.tokens.power
}

export const stunCreatures = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.tokens.stun = 1)
}

export const unStunCreatures = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.tokens.stun = 0)
}

export const alterArmor = (creatures: Creature[], amount: number) => {
    creatures.forEach(creature => {
        creature.armor += amount
        creature.tokens.armor += amount
    })
}

export const alterPower = (creatures: Creature[], amount: number) => {
    creatures.forEach(creature => creature.tokens.power += amount)
}

export const giveSkirmish = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.skirmish = true)
}

export const takeSkirmish = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.skirmish = false)
}

export const giveTaunt = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.taunt = true)
}

export const takeTaunt = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.taunt = false)
}

export const giveElusive = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.elusive = true)
}
export const giveDoom = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.tokens.doom += 1)
}

export const takeElusive = (creatures: Creature[]) => {
    creatures.forEach(creature => creature.elusive = false)
}

export const enableFighting = (creatures: Creature[]) => {
    //TODO
}

export const enableUse = (creatures: Creature[]) => {
    //TODO
}

export const gainChains = (playerState: PlayerState, amount: number) => {
    playerState.chains += amount
}

export const modifyAmber = (playerState: PlayerState, amount: number): number => {
    const actualChange = playerState.amber + amount >= 0 ? amount : playerState.amber
    playerState.amber = playerState.amber + actualChange
    return actualChange
}

export const placeAmber = (creature: Creature, amber: number) => {
    creature.tokens.amber += amber
}

export const steal = (state: GameState, amount: number): number => {
    if (amount > inactivePlayerState(state).amber) amount = inactivePlayerState(state).amber
    return modifyAmber(activePlayerState(state), modifyAmber(inactivePlayerState(state), amount))
}

export const captureAmber = (state: GameState, creature: Creature, amount: number) => {
    creature.tokens.amber += modifyAmber(enemyPlayer(state, creature), amount)
}

export const forgeKey = (playerState: PlayerState) => {
    if (playerState.amber >= playerState.keyCost) {
        playerState.keys += 1
        playerState.amber = playerState.amber - playerState.keyCost
    }
}

export const addFightAbility = (creature: Creature, fightAbility: IndividualScript) => {
    //TODO
}

export const addReapAbility = (creature: Creature, reapAbility: IndividualScript) => {
    //TODO
}
