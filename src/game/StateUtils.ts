import { Artifact } from "../shared/gamestate/Artifact"
import { CardInGame } from "../shared/gamestate/CardInGame"
import { Creature } from "../shared/gamestate/Creature"
import { GameState, PlayerState } from "../shared/gamestate/GameState"

export const discardCreatureUpgrades = (player: PlayerState, cardId?: string) => {
    const creature = getCreatureById(player, cardId)
    if (creature && creature.upgrades) {
        creature.upgrades.forEach((upgrade: CardInGame) => {
            player.discard.push(upgrade)
        })
        creature.upgrades = []
    }
}

export const discardCardsUnderneath = (player: PlayerState, cardId?: string) => {
    const creature = getCreatureById(player, cardId)
    const artifact = getArtifactById(player, cardId)
    const card = creature || artifact
    if (card && card.cardsUnderneath) {
        card.cardsUnderneath.forEach((cardUnderneath: CardInGame) => {
            player.discard.push(cardUnderneath)
        })
        card.cardsUnderneath = []
    }
}

export const getCardType = (cardId: string) => {
    if (cardId.indexOf("upgrade") !== -1)
        return "upgrade"
    return cardId.slice(cardId.indexOf("-") + 1, cardId.lastIndexOf("-"))
}

export const getPlayerById = (id: string, state: GameState) => {
    return state.playerOneState.player.id === id ? state.playerOneState : state.playerTwoState
}

export const getCardOwner = (cardId: string, state: GameState) => {
    let card: Artifact | Creature | CardInGame | undefined = state.playerOneState.creatures.find((card: Creature, i: number) => {
        return `${state.playerOneState.player.id}-creature-${i}` === cardId
    })
    card = card || state.playerOneState.artifacts.find((card: Artifact, i: number) => {
        return `${state.playerOneState.player.id}-artifact-${i}` === cardId
    })
    card = card || state.playerOneState.hand.find((card: CardInGame, i: number) => {
        return `${state.playerOneState.player.id}-card-in-hand-${i}` === cardId
    })
    card = card || state.playerOneState.discard.find((card: CardInGame, i: number) => {
        return `${state.playerOneState.player.id}-card-in-discard-${i}` === cardId
    })
    card = card || state.playerOneState.archives.find((card: CardInGame, i: number) => {
        return `${state.playerOneState.player.id}-card-in-archive-${i}` === cardId
    })
    card = card || state.playerOneState.library.find((card: CardInGame, i: number) => {
        return `${state.playerOneState.player.id}-card-in-draw-${i}` === cardId
    })
    for (let i = 0; i < state.playerOneState.creatures.length; i++) {
        const creature: Creature = state.playerOneState.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame, j: number) => {
            return `${state.playerOneState.player.id}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            card = upgrade
        }
    }

    if (card) {
        return state.playerOneState
    } else {
        return state.playerTwoState
    }
}

export const getCardById = (owner: PlayerState, cardId: string) => {
    const creature = getCreatureById(owner, cardId)
    if (creature) return creature

    const artifact = getArtifactById(owner, cardId)
    if (artifact) return artifact

    const cardInHand = getCardInHandById(owner, cardId)
    if (cardInHand) return cardInHand

    return getUpgradeById(owner, cardId)
}

export const getCreatureById = (player: PlayerState, cardId?: string) => {
    return player.creatures.find((card: Creature, i: number) => {
        return `${player.player.id}-creature-${i}` === cardId
    })
}

export const getArtifactById = (player: PlayerState, cardId?: string) => {
    return player.artifacts.find((card: Artifact, i: number) => {
        return `${player.player.id}-artifact-${i}` === cardId
    })
}

export const getCardInHandById = (player: PlayerState, cardId?: string) => {
    return player.hand.find((card: CardInGame, i: number) => {
        return `${player.player.id}-card-in-hand-${i}` === cardId
    })
}

export const getUpgradeById = (player: PlayerState, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame, j: number) => {
            return `${player.player.id}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            return upgrade
        }
    }
}

export const getCardInDiscardById = (player: PlayerState, cardId: string) => {
    return player.discard.find((c: CardInGame, i: number) => {
        return `${player.player.id}-card-in-discard-${i}` === cardId
    })
}

export const getCardInDrawPileById = (player: PlayerState, cardId: string) => {
    return player.library.find((c: CardInGame, i: number) => {
        return `${player.player.id}-card-in-draw-${i}` === cardId
    })
}

export const getCardInArchiveById = (player: PlayerState, cardId: string) => {
    return player.archives.find((c: CardInGame, i: number) => {
        return `${player.player.id}-card-in-archive-${i}` === cardId
    })
}

export const removeCardById = (player: PlayerState, cardId: string) => {
    const cardType = getCardType(cardId)
    const removalFunctions: { [key: string]: Function } = {
        creature: removeCreature,
        artifact: removeArtifact,
        upgrade: removeUpgrade,
        "card-in-hand": removeCardFromHand,
    }
    return removalFunctions[cardType](player, cardId)
}

export const removeCreature = (player: PlayerState, cardId: string) => {
    const card = player.creatures.find((card: Creature, i: number) => {
        return `${player.player.id}-creature-${i}` === cardId
    })
    player.creatures = player.creatures.filter((c: Creature) => c !== card)
    return card
}

export const removeUpgrade = (player: PlayerState, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame, j: number) => {
            return `${player.player.id}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            creature.upgrades = creature.upgrades.filter((u: CardInGame) => u !== upgrade)
            return upgrade
        }
    }
    throw new Error(`Could not remove upgrade ${cardId}`)
}

export const removeArtifact = (player: PlayerState, cardId: string) => {
    const card = player.artifacts.find((card: CardInGame, i: number) => {
        return `${player.player.id}-artifact-${i}` === cardId
    })
    player.artifacts = player.artifacts.filter((c: CardInGame) => c !== card)
    return card
}

export const removeCardFromHand = (player: PlayerState, cardId?: string) => {
    const card = player.hand.find((card: CardInGame, i: number) => {
        return `${player.player.id}-card-in-hand-${i}` === cardId
    })
    player.hand = player.hand.filter((c: CardInGame) => c !== card)
    return card
}
