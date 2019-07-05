import { Event } from "./Event"
import { log } from "../Utils"

interface Creature {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    taunt: boolean,
    upgrades: object[],
    cardsUnderneath: object[],
    tokens: {
        [key: string]: number
    }
}

interface Artifact {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    cardsUnderneath: object[],
    tokens: {
        amber: number
    }
}

interface CardInHand {
    name: string,
    id: string,
}

const getCardOwner = (id: string, state: any) => {
    let card = state.players[0].creatures.find((card: Creature, i: number) => {
        return `${state.players[0].name}-creature-${i}` === id
    })
    card = card || state.players[0].artifacts.find((card: Artifact, i: number) => {
        return `${state.players[0].name}-artifact-${i}` === id
    })
    card = card || state.players[0].hand.find((card: CardInHand, i: number) => {
        return `${state.players[0].name}-card-in-hand-${i}` === id
    })

    if (card) {
        return state.players[0]
    } else {
        return state.players[1]
    }
}

const getCreatureByID = (player: { name: string, creatures: Creature[] }, cardID: string) => {
    return player.creatures.find((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` === cardID
    })
}

const getArtifactByID = (player: { name: string, artifacts: Artifact[] }, cardID: string) => {
    return player.artifacts.find((card: Artifact, i: number) => {
        return `${player.name}-artifact-${i}` === cardID
    })
}

const getCardInHandByID = (player: { name: string, hand: CardInHand[] }, cardID: string) => {
    return player.hand.find((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` === cardID
    })
}

const removeCreature = (player: { name: string, creatures: Creature[] }, cardID: string) => {
    player.creatures = player.creatures.filter((card: Creature, i: number) => {
        return `${player.name}-creature-${i}` !== cardID
    })
}

const removeArtifact = (player: { name: string, artifacts: Artifact[] }, cardID: string) => {
    player.artifacts = player.artifacts.filter((card: Artifact, i: number) => {
        return `${player.name}-artifact-${i}` !== cardID
    })
}

const removeCardFromHand = (player: { name: string, hand: CardInHand[] }, cardID: string) => {
    player.hand = player.hand.filter((card: CardInHand, i: number) => {
        return `${player.name}-card-in-hand-${i}` !== cardID
    })
}

export const exec = (event: any, state: any) => {

    const events = {
        [Event.PlayCreature]: () => {
            const owner = getCardOwner(event.cardID, state)
            const card = getCardInHandByID(owner, event.cardID)
            if (!card)
                throw new Error(`Card ${event.cardID} not found in hand`)

            const creature: Creature = {
                name: card.name,
                id: card.id,
                ready: false,
                faceup: true,
                taunt: false,
                upgrades: [],
                cardsUnderneath: [],
                tokens: {
                    armor: 0,
                    power: 0,
                    damage: 0,
                    amber: 0,
                    stun: 0
                }
            }

            if (event.side === "left") {
                owner.creatures.unshift(creature)
            } else {
                owner.creatures.push(creature)
            }

            removeCardFromHand(owner, event.cardID)
        },
        [Event.DiscardCreature]: () => {
            const owner = getCardOwner(event.cardID, state)
            removeCreature(owner, event.cardID)
        },
        [Event.MoveCreatureToHand]: () => {
            const owner = getCardOwner(event.cardID, state)
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)

            const card: CardInHand = {
                id: creature.id,
                name: creature.name,
            }
            owner.hand.push(card)
            removeCreature(owner, event.cardID)
        },
        [Event.AlterCreatureDamage]: () => {
            const owner = getCardOwner(event.cardID, state)
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)
            creature.tokens.damage += event.amount
        },
        [Event.CaptureAmber]: () => {
            const owner = getCardOwner(event.cardID, state)
            const opponent = state.players[0] === owner ? state.players[1] : state.players[0]
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)

            if ((event.amount > 0 && opponent.amber > 0) || (event.amount < 0 && creature.tokens.amber > 0)) {
                creature.tokens.amber += event.amount
                opponent.amber -= event.amount
            }
        },
        [Event.AlterCreaturePower]: () => {
            const owner = getCardOwner(event.cardID, state)
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)
            creature.tokens.power += event.amount
        },
        [Event.ToggleStun]: () => {
            const owner = getCardOwner(event.cardID, state)
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)
            creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
        },
        [Event.UseCreature]: () => {
            const owner = getCardOwner(event.cardID, state)
            const creature = getCreatureByID(owner, event.cardID)
            if (!creature)
                throw new Error(`Card ${event.cardID} not found in hand`)

            if (!creature.ready) {
                creature.ready = true
                return
            }

            if (creature.tokens.stun) {
                creature.tokens.stun = 0
                creature.ready = false
            } else {
                const owner = getCardOwner(event.cardID, state)
                owner.amber += 1
                creature.ready = false
            }
        },



        [Event.PlayArtifact]: () => {
            const owner = getCardOwner(event.cardID, state)
            const card = getCardInHandByID(owner, event.cardID)
            if (!card)
                throw new Error(`Card ${event.cardID} not found in hand`)

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
            removeCardFromHand(owner, event.cardID)
        },
        [Event.UseArtifact]: () => {},
        [Event.DiscardArtifact]: () => {
            const owner = getCardOwner(event.cardID, state)
            removeArtifact(owner, event.cardID)
        },
        [Event.MoveArtifactToHand]: () => {
            const owner = getCardOwner(event.cardID, state)
            const artifact = getArtifactByID(owner, event.cardID)
            if (!artifact)
                throw new Error(`Card ${event.cardID} not found in hand`)

            const card: CardInHand = {
                id: artifact.id,
                name: artifact.name,
            }
            owner.hand.push(card)
            removeArtifact(owner, event.cardID)
        },



        [Event.DiscardCard]: () => {
            const owner = getCardOwner(event.cardID, state)
            removeCardFromHand(owner, event.cardID)
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

    // @ts-ignore
    events[event.action]()
}
