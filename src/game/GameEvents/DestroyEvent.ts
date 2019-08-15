import { Creature } from "../../shared/gamestate/Creature"
import { Trigger } from "../../card-scripts/types/CardScript"
import { Effect, EffectType } from "../../shared/GameEffect"
import { getCardOwner } from "../StateUtils"
import BaseGameEvent from "./BaseGameEvent"
import {
    getEffectsForEvent,
    promptForOrderOfEffects,
} from "./util"
import {
    activePlayerState,
    removeAndReturn,
} from "../../card-scripts/ScriptUtils"

class DestroyEvent extends BaseGameEvent {

    async triggerBeforeEvents() {
        let effectFn = () => {}
        const effects = getEffectsForEvent(this.state, this.card, Trigger.ON_CREATURE_DESTROYED)
        await promptForOrderOfEffects(effects)

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i]
            await effect()
        }

        removeAndReturn(this.state, this.card)
        activePlayerState(this.state).discard.push(this.card)
    }
}

export default DestroyEvent
