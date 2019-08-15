import { PlayerState } from "../../shared/gamestate/GameState"
import { Trigger } from "../../card-scripts/types/CardScript"
import { Effect, EffectType } from "../../shared/GameEffect"
import BaseGameEvent from "./BaseGameEvent"
import {
    removeAndReturn
} from "../../card-scripts/ScriptUtils"
import {
    getCardOwner,
} from "../StateUtils"
import {
    prepareEffect,
    getEffectsForEvent,
    promptForOrderOfEffects,
} from "./util"

class PlayActionEvent extends BaseGameEvent {

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
        const owner: PlayerState = getCardOwner(this.card.id, this.state)
        removeAndReturn(this.state, this.card)
        owner.discard.push(this.card)
    }
}

export default PlayActionEvent
