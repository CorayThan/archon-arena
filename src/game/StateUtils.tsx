import { PlayerState as Player } from "../shared/gamestate/GameState"
import { Creature } from "../shared/gamestate/Creature"
import { Artifact } from "../shared/gamestate/Artifact"
import { CardNotInPlay } from "../shared/gamestate/CardNotInPlay"

export const discardCreatureUpgrades = (player: Player, cardId: string) => {
    const creature = getCreatureById(player, cardId)
    if (creature && creature.upgrades) {
          creature.upgrades.forEach((upgrade: CardNotInPlay) => {
              player.discard.push(upgrade)
          })
          creature.upgrades = []
    }
}

export const discardCardsUnderneath = (player: Player, cardId: string) => {
    const creature = getCreatureById(player, cardId)
    const artifact = getArtifactById(player, cardId)
    const card = creature || artifact
    if (card && card.cardsUnderneath) {
          card.cardsUnderneath.forEach((cardUnderneath: CardNotInPlay) => {
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

export const getPlayerByName = (name: string, state: any) => {
    return state.players[0].name === name ? state.players[0] : state.players[1]
}

export const getCardOwner = (cardId: string, state: any) => {
    let card = state.players[0].creatures.find((card: Creature, i: number) => {
        return `${state.players[0].name}-creature-${i}` === cardId
    })
    card = card || state.players[0].artifacts.find((card: Artifact, i: number) => {
        return `${state.players[0].name}-artifact-${i}` === cardId
    })
    card = card || state.players[0].hand.find((card: CardNotInPlay, i: number) => {
        return `${state.players[0].name}-card-in-hand-${i}` === cardId
    })
    card = card || state.players[0].discardPile.find((card: CardNotInPlay, i: number) => {
        return `${state.players[0].name}-card-in-discard-${i}` === cardId
    })
    card = card || state.players[0].archivePile.find((card: CardNotInPlay, i: number) => {
        return `${state.players[0].name}-card-in-archive-${i}` === cardId
    })
    card = card || state.players[0].drawPile.find((card: CardNotInPlay, i: number) => {
        return `${state.players[0].name}-card-in-draw-${i}` === cardId
    })
    for (let i = 0; i < state.players[0].creatures.length; i++) {
        const creature: Creature = state.players[0].creatures[i]
        const upgrade = creature.upgrades.find((c: CardNotInPlay, j: number) => {
            return `${state.players[0].name}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            card = upgrade
        }
    }

    if (card) {
        return state.players[0]
    } else {
        return state.players[1]
    }
}

export const getCardById = (owner: Player, cardId: string) => {
    const creature = getCreatureById(owner, cardId)
    if (creature) return creature

    const artifact = getArtifactById(owner, cardId)
    if (artifact) return artifact

    const cardInHand = getCardInHandById(owner, cardId)
    if (cardInHand) return cardInHand

    return getUpgradeById(owner, cardId)
}

export const getCreatureById = (player: Player, cardId: string) => {
    return player.creatures.find((card: Creature, i: number) => {
        return `${player.id}-creature-${i}` === cardId
    })
}

export const getArtifactById = (player: Player, cardId: string) => {
    return player.artifacts.find((card: Artifact, i: number) => {
        return `${player.id}-artifact-${i}` === cardId
    })
}

export const getCardInHandById = (player: Player, cardId: string) => {
    return player.hand.find((card: CardNotInPlay, i: number) => {
        return `${player.id}-card-in-hand-${i}` === cardId
    })
}

export const getUpgradeById = (player: Player, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardNotInPlay, j: number) => {
            return `${player.id}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            return upgrade
        }
    }
}

export const getCardInDiscardById = (player: Player, cardId: string) => {
    return player.discard.find((c: CardNotInPlay, i: number) => {
        return `${player.id}-card-in-discard-${i}` === cardId
    })
}

export const getCardInDrawPileById = (player: Player, cardId: string) => {
    return player.library.find((c: CardNotInPlay, i: number) => {
        return `${player.id}-card-in-draw-${i}` === cardId
    })
}

export const getCardInArchiveById = (player: Player, cardId: string) => {
    return player.archives.find((c: CardNotInPlay, i: number) => {
        return `${player.id}-card-in-archive-${i}` === cardId
    })
}

export const removeCardById = (player: Player, cardId: string) => {
    const cardType = getCardType(cardId)
    const removalFunctions: { [key: string ] : Function } = {
        creature: removeCreature,
        artifact: removeArtifact,
        upgrade: removeUpgrade,
        "card-in-hand": removeCardFromHand,
    }
    const card = removalFunctions[cardType](player, cardId)
    return card
}

export const removeCreature = (player: Player, cardId: string) => {
    const card = player.creatures.find((card: Creature, i: number) => {
        return `${player.id}-creature-${i}` === cardId
    })
    player.creatures = player.creatures.filter((c: Creature) => c !== card)
    return card
}

export const removeUpgrade = (player: Player, cardId: string) => {
    for (let i = 0; i < player.creatures.length; i++) {
        const creature: Creature = player.creatures[i]
        const upgrade = creature.upgrades.find((c: CardNotInPlay, j: number) => {
            return `${player.id}-creature-${i}-upgrade-${j}` === cardId
        })

        if (upgrade) {
            creature.upgrades = creature.upgrades.filter((u: CardNotInPlay) => u !== upgrade)
            return upgrade
        }
    }
    throw new Error(`Could not remove upgrade ${cardId}`)
}

export const removeArtifact = (player: Player, cardId: string) => {
    const card = player.artifacts.find((card: CardNotInPlay, i: number) => {
        return `${player.id}-artifact-${i}` === cardId
    })
    player.artifacts = player.artifacts.filter((c: CardNotInPlay) => c !== card)
    return card
}

export const removeCardFromHand = (player: Player, cardId: string) => {
    const card = player.hand.find((card: CardNotInPlay, i: number) => {
        return `${player.id}-card-in-hand-${i}` === cardId
    })
    player.hand = player.hand.filter((c: CardNotInPlay) => c !== card)
    return card
}
