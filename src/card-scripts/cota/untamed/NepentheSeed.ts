import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, destroyCard, putInHand} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    omni: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCard(config.thisCard)
            config.targets.forEach(target => putInHand(target as CardInGame))
        }
    }
}

cardScripts.scripts.set("nepenthe-seed", cardScript)