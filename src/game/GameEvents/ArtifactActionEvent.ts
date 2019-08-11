import { Artifact } from "../../shared/gamestate/Artifact"
import { Trigger } from "../../card-scripts/types/CardScript"
import { Effect, EffectType } from "../../shared/GameEffect"
import BaseGameEvent from "./BaseGameEvent"
import {
    prepareEffect,
    getEffectsForEvent,
    promptForOrderOfEffects,
} from "./util"

export default class ArtifactActionEvent extends BaseGameEvent {

    async triggerAfterEvents() {
        const effects = [prepareEffect(this.state, this.cardScript, this.card, this.card, Trigger.ACTION)]
        await promptForOrderOfEffects(effects)

        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i]
            await effect()
        }

        const artifact = this.card as Artifact
        artifact.ready = false
    }
}

