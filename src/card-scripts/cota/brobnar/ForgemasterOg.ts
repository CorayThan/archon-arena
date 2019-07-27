import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {activePlayerState} from "../../ScriptUtils";

const cardScript: CardScript = {
    onKeyForge: {
        perform: (state) => {
            activePlayerState(state).amber = 0
        }
    }
}

cardScripts.scripts.set("forgemaster-og", cardScript)
