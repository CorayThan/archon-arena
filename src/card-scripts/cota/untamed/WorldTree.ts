import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putOnTopOfDeck} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    action: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => putOnTopOfDeck(target as CardInGame))
        }
    },

}

cardScripts.scripts.set("world-tree", cardScript)