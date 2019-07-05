import { Event } from "./Event"
import { log } from "../Utils"

const getCreatureByID = (id: string, state: any) => {
    let creature = state.players[0].creatures.find((c: { position: number, id: string }) => {
        return `${state.players[0].name}-creature-${c.position}` === id
    })
    return creature || state.players[1].creatures.find((c: { position: number, id: string }) => {
        return `${state.players[1].name}-creature-${c.position}` === id
    })
}

const getCreatureOwner = (id: string, state: any) => {
    const creature = state.players[0].creatures.find((c: { position: number, id: string }) => {
        return `${state.players[0].name}-creature-${c.position}` === id
    })

    if (creature) {
        return state.players[0]
    } else {
        return state.players[1]
    }
}

export const exec = (event: any, state: any) => {

    const events = {
        [Event.AlterCreatureDamage]: () => {
            const creature = getCreatureByID(event.creature, state)
            creature.tokens.damage += event.amount
        },
        [Event.CaptureAmber]: () => {
            const owner = getCreatureOwner(event.creature, state)
            const opponent = state.players[0] === owner ? state.players[1] : state.players[0]
            const creature = getCreatureByID(event.creature, state)

            // Return captured amber. This could be a separate event.
            if (event.amount < 0 && creature.tokens.amber > 0) {
                creature.tokens.amber += event.amount
                opponent.amber -= event.amount
                return
            }

            if (event.amount > 0 && opponent.amber > 0) {
                creature.tokens.amber += event.amount
                opponent.amber -= event.amount
            }
        },
        [Event.AlterCreaturePower]: () => {
            const creature = getCreatureByID(event.creature, state)
            creature.tokens.power += event.amount
        },
        [Event.ToggleStun]: () => {
            const creature = getCreatureByID(event.creature, state)
            creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
        },
        [Event.UseCreature]: () => {
            const creature = getCreatureByID(event.creature, state)

            if (!creature.ready) {
                creature.ready = true
                return
            }

            if (creature.tokens.stun) {
                creature.tokens.stun = 0
                creature.ready = false
            } else {
                const owner = getCreatureOwner(event.creature, state)
                owner.amber += 1
                creature.ready = false
            }
        },
        [Event.EndTurn]: () => {
            const player = state.players.find((p: any) => p.name === state.activePlayer)
            player.creatures.forEach((c: any) => c.ready = true)

            const newActivePlayer = state.players[0] === player ? state.players[1].name : state.players[0].name
            state.activePlayer = newActivePlayer
        },
    }

    // @ts-ignore
    events[event.action]()
}
