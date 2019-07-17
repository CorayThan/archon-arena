import Action from "../../shared/Action"
import { Artifact } from "../../shared/gamestate/Artifact"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState } from "../../shared/gamestate/GameState"
import { GameEvent } from "../GameEvent"
import { getArtifactById, getCardInHandById, getCardOwner, getPlayerById, removeArtifact, removeCardFromHand } from "../StateUtils"

export default {
    [GameEvent.PlayArtifact]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const card = getCardInHandById(owner, action.cardId!)
        if (!card)
            throw new Error(`Card ${action.cardId!} not found in hand`)

        const artifact: Artifact = {
            id: card.id,
            ready: false,
            faceup: true,
            cardsUnderneath: [],
            purgedByThis: [],
            tokens: {
                amber: 0,
            },
            ownerId: owner.player.id,
            backingCard: card.backingCard,
        }

        const player = getPlayerById(action.player!.id, state)
        player.artifacts.push(artifact)
        removeCardFromHand(owner, action.cardId)
    },
    [GameEvent.UseArtifact]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact)
            throw new Error(`Card ${action.cardId} not found in hand`)
        artifact.ready = !artifact.ready
    },
    [GameEvent.MoveArtifactToHand]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardInGame = {
            id: artifact.id,
            ownerId: owner.player.id,
            backingCard: artifact.backingCard,
        }
        owner.hand.push(card)
        removeArtifact(owner, action.cardId!)
    },
}
