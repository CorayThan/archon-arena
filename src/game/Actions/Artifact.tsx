import { Event } from "../Event"
import { log } from "../../Utils"
import {
    getCardOwner,
    getPlayerByName,
    getCreatureById,
    getArtifactById,
    getCardInHandById,
    removeCreature,
    removeArtifact,
    removeCardFromHand
} from "../StateUtils"
import { Creature } from "../../shared/gamestate/Creature"
import { Artifact } from "../../shared/gamestate/Artifact"
import { CardNotInPlay } from "../../shared/gamestate/CardNotInPlay"

export default {
    [Event.PlayArtifact]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const card = getCardInHandById(owner, action.cardId)
        if (!card)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const artifact: Artifact = {
            id: card.id,
            ready: false,
            faceup: true,
            cardsUnderneath: [],
            purgedByThis: [],
            tokens: {
                amber: 0,
            },
            ownerId: owner.id,
            backingCard: card.backingCard,
        }

        const player = getPlayerByName(action.playerName, state)
        player.artifacts.push(artifact)
        removeCardFromHand(owner, action.cardId)
    },
    [Event.UseArtifact]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact)
            throw new Error(`Card ${action.cardId} not found in hand`)
        artifact.ready = !artifact.ready
    },
    [Event.MoveArtifactToHand]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardNotInPlay = {
            id: artifact.id,
            ownerId: owner.id,
            backingCard: artifact.backingCard,
        }
        owner.hand.push(card)
        removeArtifact(owner, action.cardId)
    },
}
