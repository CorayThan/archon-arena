import { Artifact } from "../shared/gamestate/Artifact"
import { CardInGame } from "../shared/gamestate/CardInGame"
import { Creature } from "../shared/gamestate/Creature"
import { GameState, PlayerState } from "../shared/gamestate/GameState"
import CardType from "./CardType"

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

export const getCardType = (state: GameState, cardId: string) => {
    const playerStates = [
        state.playerOneState,
        state.playerTwoState,
    ]
    for (let i = 0; i < playerStates.length; i++) {
        const playerState = playerStates[i]
        if (playerState.creatures.find((card: Creature) => card.id === cardId))
            return CardType.CREATURE
        if (playerState.artifacts.find((card: Artifact) => card.id === cardId))
            return CardType.ARTIFACT
        if (playerState.hand.find((card: CardInGame) => card.id === cardId))
            return CardType.HAND
        if (playerState.discard.find((card: CardInGame) => card.id === cardId))
            return CardType.DISCARD
        if (playerState.purged.find((card: CardInGame) => card.id === cardId))
            return CardType.PURGED
        if (playerState.library.find((card: CardInGame) => card.id === cardId))
            return CardType.LIBRARY
        if (playerState.archives.find((card: CardInGame) => card.id === cardId))
            return CardType.ARCHIVE
        for (let j = 0; j < playerState.creatures.length; j++) {
            const creature: Creature = playerState.creatures[i]
            const upgrade = creature.upgrades.find((c: CardInGame) => {
                return c.id === cardId
            })

            if (upgrade) {
                return CardType.UPGRADE
            }
        }
    }

    throw new Error(`Card Type for card ${cardId} not found`)
}

export const getPlayerById = (id: string, state: GameState) => {
    return state.playerOneState.player.id === id ? state.playerOneState : state.playerTwoState
}

export const getCardOwner = (cardId: string, state: GameState) => {
    let card: Artifact | Creature | CardInGame | undefined = state.playerOneState.creatures.find((card: Creature) => {
        return card.id === cardId
    })
    card = card || state.playerOneState.artifacts.find((card: Artifact) => {
        return card.id === cardId
    })
    card = card || state.playerOneState.hand.find((card: CardInGame) => {
        return card.id === cardId
    })
    card = card || state.playerOneState.discard.find((card: CardInGame) => {
        return card.id === cardId
    })
    card = card || state.playerOneState.archives.find((card: CardInGame) => {
        return card.id === cardId
    })
    card = card || state.playerOneState.library.find((card: CardInGame) => {
        return card.id === cardId
    })
    for (let i = 0; i < state.playerOneState.creatures.length; i++) {
        const creature: Creature = state.playerOneState.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame) => {
            return c.id === cardId
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
    return player.creatures.find((card: Creature) => {
        return card.id === cardId
    })
}

export const getArtifactById = (player: PlayerState, cardId?: string) => {
    return player.artifacts.find((card: Artifact) => {
        return card.id === cardId
    })
}

export const getCardInHandById = (player: PlayerState, cardId?: string) => {
    return player.hand.find((card: CardInGame) => {
        return card.id === cardId
    })
}

export const getUpgradeById = (player: PlayerState, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame) => {
            return c.id === cardId
        })

        if (upgrade) {
            return upgrade
        }
    }
}

export const getCardInDiscardById = (player: PlayerState, cardId: string) => {
    return player.discard.find((card: CardInGame) => {
        return card.id === cardId
    })
}

export const getCardInDrawPileById = (player: PlayerState, cardId: string) => {
    return player.library.find((card: CardInGame) => {
        return card.id === cardId
    })
}

export const getCardInArchiveById = (player: PlayerState, cardId: string) => {
    return player.archives.find((card: CardInGame) => {
        return card.id === cardId
    })
}

export const removeCardById = (state: GameState, cardId: string) => {
    const cardType = getCardType(state, cardId)
    const owner = getCardOwner(cardId, state)
    const removalFunctions: { [key: string]: Function } = {
        creature: removeCreature,
        artifact: removeArtifact,
        upgrade: removeUpgrade,
        hand: removeCardFromHand,
    }
    return removalFunctions[cardType](owner, cardId)
}

export const removeCreature = (player: PlayerState, cardId: string) => {
    const card = player.creatures.find((card: Creature) => {
        return card.id === cardId
    })
    player.creatures = player.creatures.filter((c: Creature) => c !== card)
    return card
}

export const removeUpgrade = (player: PlayerState, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardInGame) => {
            return c.id === cardId
        })

        if (upgrade) {
            creature.upgrades = creature.upgrades.filter((u: CardInGame) => u !== upgrade)
            return upgrade
        }
    }
    throw new Error(`Could not remove upgrade ${cardId}`)
}

export const removeArtifact = (player: PlayerState, cardId: string) => {
    const card = player.artifacts.find((card: CardInGame) => {
        return card.id === cardId
    })
    player.artifacts = player.artifacts.filter((c: CardInGame) => c !== card)
    return card
}

export const removeCardFromHand = (player: PlayerState, cardId?: string) => {
    const card = player.hand.find((card: CardInGame) => {
        return card.id === cardId
    })
    if (!card)
        throw new Error(`Expected to find card ${cardId} in hand`)
    player.hand = player.hand.filter((c: CardInGame) => c !== card)
    return card
}
