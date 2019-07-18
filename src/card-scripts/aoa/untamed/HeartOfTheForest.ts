import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, inactivePlayerState} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each player cannot forge keys while they have more forged keys than their opponent.
    amber: () => 1,
    staticEffect: (state) => {
        if (activePlayerState(state).keys > inactivePlayerState(state).keys) {
            //TODO Cannot forge effect
        }
    }
}

cardScripts.scripts.set("heart-of-the-forest", cardScript)