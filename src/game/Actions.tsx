import { Event } from "./Event"
import { log } from "../Utils"
import {
  getCardOwner,
  getCreatureByID,
  getArtifactByID,
  getCardInHandByID,
  removeCreature,
  removeArtifact,
  removeCardFromHand
} from "./StateUtils"
import Creature from "./types/Creature"
import Artifact from "./types/Artifact"
import CardInHand from "./types/CardInHand"

import CreatureActions from "./Actions/Creature"
import ArtifactActions from "./Actions/Artifact"

export const exec = (action: any, state: any) => {

    const actionHandlers: { [key: string]: Function } = {

        [Event.PlayUpgrade]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeCardFromHand(owner, action.cardID)
        },
        [Event.DiscardCard]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeCardFromHand(owner, action.cardID)
        },
        [Event.ArchiveCard]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeCardFromHand(owner, action.cardID)
        },
        [Event.DrawCard]: () => {},
        [Event.EndTurn]: () => {
            const player = state.players.find((p: any) => p.name === state.activePlayer)
            player.creatures.forEach((c: any) => c.ready = true)
            player.artifacts.forEach((c: any) => c.ready = true)

            const newActivePlayer = state.players[0] === player ? state.players[1].name : state.players[0].name
            state.activePlayer = newActivePlayer
        },
    }

    Object.assign(actionHandlers, CreatureActions)
    Object.assign(actionHandlers, ArtifactActions)

    // Add placeholder function for unimplemented events
    Object.keys(Event)
        .forEach(event => {
            if (!actionHandlers[event])
                actionHandlers[event] = () => {}
        })

    actionHandlers[action.type](action, state)
}
