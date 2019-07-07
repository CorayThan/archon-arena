import { Event } from "../Event"
import { log } from "../../Utils"
import {
  getCardOwner,
  getCreatureByID,
  getArtifactByID,
  getCardInHandByID,
  removeCreature,
  removeArtifact,
  removeCardFromHand
} from "../StateUtils"
import Creature from "../types/Creature"
import Artifact from "../types/Artifact"
import CardInHand from "../types/CardInHand"

export default {
    [Event.PlayArtifact]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const card = getCardInHandByID(owner, action.cardID)
        if (!card)
            throw new Error(`Card ${action.cardID} not found in hand`)

        const artifact: Artifact = {
            name: card.name,
            id: card.id,
            ready: false,
            faceup: true,
            cardsUnderneath: [],
            tokens: {
                amber: 0,
            }
        }

        owner.artifacts.push(artifact)
        removeCardFromHand(owner, action.cardID)
    },
    [Event.UseArtifact]: (action: any, state: any) => {},
    [Event.DiscardArtifact]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        removeArtifact(owner, action.cardID)
    },
    [Event.MoveArtifactToHand]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const artifact = getArtifactByID(owner, action.cardID)
        if (!artifact)
            throw new Error(`Card ${action.cardID} not found in hand`)

        const card: CardInHand = {
            id: artifact.id,
            name: artifact.name,
        }
        owner.hand.push(card)
        removeArtifact(owner, action.cardID)
    },
}
