import Action from "../shared/Action"
import { GameState } from "../shared/gamestate/GameState"
import { AEvent } from "./AEvent"
import { getCardInHandById, getCardOwner } from "./StateUtils"

export const buildLogForAction = (action: Action, state: GameState): Action | undefined => {

    const events: { [key: string]: Function } = {
        [AEvent.PlayCreature]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCardInHandById(owner, action.cardId!)
            if (!creature) throw new Error("creature not found")
            action.message = `${owner.player.id} plays ${creature.backingCard.cardTitle} on ${action.side} flank`
            return action
        },
    }

    // Add placeholder function for unimplemented events
    Object.keys(AEvent)
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

