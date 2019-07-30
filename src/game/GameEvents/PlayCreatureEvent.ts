import { Creature } from "../../shared/gamestate/Creature"
import { cardScripts } from "../../card-scripts/CardScripts"
import { Trigger } from "../../card-scripts/types/CardScript"
import { Effect, EffectType } from "../../shared/GameEffect"
import BaseGameEvent from "./BaseGameEvent"
import {
    getCardOwner,
    getCardById,
    getPlayerById,
    removeCardFromHand,
} from "../StateUtils"
import {
    prepareEffect,
    getEffectsForEvent,
    promptForOrderOfEffects,
    promptForChoice,
    createCreatureFromCard,
} from "./util"

class PlayCreatureEvent extends BaseGameEvent {

    async resolve() {
        const owner = getCardOwner(this.card.id, this.state)
        const card = getCardById(owner, this.card.id)
        const creature = createCreatureFromCard(card!)

        const player = getPlayerById(owner.player.id, this.state)
        const side = await promptForChoice(this.state, "Choose a side", ["left", "right"])
        if (side === "left") {
            player.creatures.unshift(creature)
        } else {
            player.creatures.push(creature)
        }

        removeCardFromHand(owner, card!.id)
        this.card = creature
        this.cardScript = cardScripts.scripts.get(this.card.backingCard.cardTitle.replace(/ /g, "-").toLowerCase())
    }

    async triggerAfterEvents() {
        const effects = getEffectsForEvent(this.state, this.card, Trigger.CARD_PLAYED)
        const onPlayEffect = prepareEffect(this.state, this.cardScript, this.card, this.card, Trigger.ON_PLAY)
        effects.unshift(onPlayEffect)

        await promptForOrderOfEffects(effects)

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i]
            await effect()
        }
    }

    async finish() {
        const creature = this.card as Creature
        creature.ready = false
    }
}

export default PlayCreatureEvent
