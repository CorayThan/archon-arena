import Action from "../shared/Action"
import { Event } from "./Event"
import { getCardInHandById, getCardOwner } from "./StateUtils"

export const buildLogForAction = (action: Action, state: object): Action | undefined => {

    const events: { [key: string]: Function } = {
        [Event.PlayCreature]: () => {
            const owner = getCardOwner(action.cardId, state)
            const creature = getCardInHandById(owner, action.cardId)
            if (!creature) throw new Error("creature not found")
            if (!creature.backingCard) throw new Error("card data missing") // TODO make backingCard manditory
            action.message = `${owner.name} plays ${creature.backingCard.cardTitle} on ${action.side} flank`
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

