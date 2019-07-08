import { shuffle } from "lodash"
import Creature from "./types/Creature"
import Artifact from "./types/Artifact"
import CardInHand from "./types/CardInHand"
import Upgrade from "./types/Upgrade"
import Player from "./types/Player"

export const getCardType = (cardID: string) => {
    if (cardID.indexOf("upgrade") !== -1)
        return "upgrade"
    return cardID.slice(cardID.indexOf("-") + 1, cardID.lastIndexOf("-"))
}

export const shuffleDeck = (player: Player) => {
    player.discardPile.forEach((card: CardInHand) => player.drawPile.push(card))
    player.discardPile = []
    player.drawPile = shuffle(player.drawPile)
}

export const getPlayerByName = (name: string, state: any) => {
    return state.players[0].name === name ? state.players[0] : state.players[1]
}

export const getCardOwner = (id: string, state: any) => {
    let card = state.players[0].creatures.find((card: Creature, i: number) => {
        return `${state.players[0].name}-creature-${i}` === id
    })
    card = card || state.players[0].artifacts.find((card: Artifact, i: number) => {
        return `${state.players[0].name}-artifact-${i}` === id
    })
    card = card || state.players[0].hand.find((card: CardInHand, i: number) => {
        return `${state.players[0].name}-card-in-hand-${i}` === id
    })

    if (card) {
        return state.players[0]
    } else {
        return state.players[1]
    }
}

export const getCreatureByID = (player: Player, cardID: string) => {
    return player.creatures.find((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` === cardID
    })
}

export const getArtifactByID = (player: Player, cardID: string) => {
    return player.artifacts.find((card: Artifact, i: number) => {
        return `${player.name}-artifact-${i}` === cardID
    })
}

export const getCardInHandByID = (player: Player, cardID: string) => {
    return player.hand.find((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` === cardID
    })
}

export const removeCardByID = (player: Player, cardID: string) => {
    const cardType = getCardType(cardID)
    const removalFunctions: { [key: string ] : Function } = {
        creature: removeCreature,
        artifact: removeArtifact,
        upgrade: removeUpgrade,
        "card-in-hand": removeCardFromHand,
    }
    const card = removalFunctions[cardType](player, cardID)
    return card
}

export const removeCreature = (player: Player, cardID: string) => {
    const card = player.creatures.find((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` === cardID
    })
    player.creatures = player.creatures.filter((c: Creature) => c !== card)
    return card
}

export const removeUpgrade = (player: Player, cardID: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: Upgrade, j: number) => {
            return `${player.name}-creature-${i}-upgrade-${j}` === cardID
        })

        if (upgrade) {
            creature.upgrades = creature.upgrades.filter((u: Upgrade) => u !== upgrade)
            return upgrade
        }
    }
    throw new Error(`Could not remove upgrade ${cardID}`)
}

export const removeArtifact = (player: Player, cardID: string) => {
    const card = player.artifacts.find((card: CardInHand, i: number) => {
        return `${player.name}-artifact-${i}` === cardID
    })
    player.artifacts = player.artifacts.filter((c: CardInHand) => c !== card)
    return card
}

export const removeCardFromHand = (player: Player, cardID: string) => {
    const card = player.hand.find((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` === cardID
    })
    player.hand = player.hand.filter((c: CardInHand) => c !== card)
    return card
}
