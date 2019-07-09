import { Event } from "./Event"
import { getCardInHandByID, getCardOwner } from "./StateUtils"
import Action from "./types/Action"

export const buildLogForAction = (action: Action, state: object): Action | undefined => {

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
                events[event] = () => {
                    action.message = `${action.type} has no message`
                    return action
                }
        })

    // @ts-ignore
    return events[action.type]()
}

