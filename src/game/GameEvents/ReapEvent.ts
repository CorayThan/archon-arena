import { Creature } from "../../shared/gamestate/Creature"
import { Trigger } from "../../card-scripts/types/CardScript"
import { Effect, EffectType } from "../../shared/GameEffect"
import { getCardOwner } from "../StateUtils"
import BaseGameEvent from "./BaseGameEvent"
import {
    prepareEffect,
    getEffectsForEvent,
    promptForOrderOfEffects,
} from "./util"

class ReapEvent extends BaseGameEvent {

    async resolve() {
        const owner = getCardOwner(this.card.id, this.state)
        owner.amber += 1
    }

    async triggerAfterEvents() {
        let effects: Function[] = []
        effects = effects.concat(getEffectsForEvent(this.state, this.card, Trigger.ON_REAP))
        effects = effects.concat(getEffectsForEvent(this.state, this.card, Trigger.ON_ANY_REAP))

        const reapEffect = prepareEffect(this.state, this.cardScript, this.card, this.card, Trigger.REAP)
        effects.unshift(reapEffect)

        await promptForOrderOfEffects(effects)

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i]
            await effect()
        }

        const creature = this.card as Creature
        creature.ready = false
    }
}

export default ReapEvent
