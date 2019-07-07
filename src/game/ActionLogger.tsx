import { Event } from "./Event"
import Creature from "./types/Creature"
import Artifact from "./types/Artifact"
import CardInHand from "./types/CardInHand"
import {
  getCardOwner,
  getCreatureByID,
  getArtifactByID,
  getCardInHandByID,
  removeCreature,
  removeArtifact,
  removeCardFromHand
} from "./StateUtils"

export const buildLogForAction = (action: any, state: object) => {

    const events: { [key: string]: Function } = {
        [Event.PlayCreature]: () => {
            const owner = getCardOwner(action.cardID, state)
            const creature = getCardInHandByID(owner, action.cardID)
            if (!creature) throw new Error("creature not found")
            action.message = `${owner.name} plays ${creature.name} on ${action.side} flank`
            return action
        },
    }

    // Add placeholder function for unimplemented events
    Object.keys(Event)
        .forEach(event => {
            if (!events[event])
                events[event] = () => {}
        })

    return events[action.type]()
}

