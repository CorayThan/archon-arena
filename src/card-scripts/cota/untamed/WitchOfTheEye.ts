import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putInHand} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    power: () => 3,
    reap: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => putInHand(target as CardInGame))
        }
    },

}

cardScripts.scripts.set("witch-of-the-eye", cardScript)