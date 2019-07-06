import Creature from "./types/Creature"
import Artifact from "./types/Artifact"
import CardInHand from "./types/CardInHand"

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

export const getCreatureByID = (player: { name: string, creatures: Creature[] }, cardID: string) => {
    return player.creatures.find((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` === cardID
    })
}

export const getArtifactByID = (player: { name: string, artifacts: Artifact[] }, cardID: string) => {
    return player.artifacts.find((card: Artifact, i: number) => {
        return `${player.name}-artifact-${i}` === cardID
    })
}

export const getCardInHandByID = (player: { name: string, hand: CardInHand[] }, cardID: string) => {
    return player.hand.find((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` === cardID
    })
}

export const removeCreature = (player: { name: string, creatures: Creature[] }, cardID: string) => {
    player.creatures = player.creatures.filter((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` !== cardID
    })
}

export const removeArtifact = (player: { name: string, artifacts: Artifact[] }, cardID: string) => {
    player.artifacts = player.artifacts.filter((card: Artifact, i: number) => {
        return `${player.name}-artifact-${i}` !== cardID
    })
}

export const removeCardFromHand = (player: { name: string, hand: CardInHand[] }, cardID: string) => {
    player.hand = player.hand.filter((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` !== cardID
    })
}

