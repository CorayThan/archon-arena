import Action from "../../shared/Action"
import { Artifact } from "../../shared/gamestate/Artifact"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState } from "../../shared/gamestate/GameState"
import { InputEvent } from "../InputEvent"
import { getArtifactById, getCardInHandById, getCardOwner, getPlayerById, removeArtifact, removeCardFromHand } from "../StateUtils"
import { cardScripts } from "../../card-scripts/CardScripts"
import ArtifactActionEvent from "../GameEvents/ArtifactActionEvent"

export default {
    [InputEvent.PlayArtifact]: (action: Action, state: GameState) => {
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
            house: card.backingCard.house,
            tokens: {
                amber: 0,
            },
            traits: card.backingCard.traits,
            ownerId: owner.player.id,
            backingCard: card.backingCard,
        }

        const player = getPlayerById(owner.player.id, state)
        player.artifacts.push(artifact)
        removeCardFromHand(owner, action.cardId)
    },
    [InputEvent.MoveArtifactToHand]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardInGame = {
            id: artifact.id,
            ownerId: owner.player.id,
            house: artifact.backingCard.house,
            backingCard: artifact.backingCard,
        }
        owner.hand.push(card)
        removeArtifact(owner, action.cardId!)
    },
    [InputEvent.UseArtifact]: async (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const artifact = getArtifactById(owner, action.cardId)
        if (!artifact!.ready) {
            artifact!.ready = true
            return
        }

        const cardScript = cardScripts.scripts.get(artifact!.backingCard.cardTitle.replace(/ /g, "-").toLowerCase())
        if (cardScript) {
            if (cardScript.action) {
                const event = new ArtifactActionEvent(state, artifact!)
                await event.perform()
            }
        }
    },
}
