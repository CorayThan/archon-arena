import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {activePlayerState} from "../../types/ScriptUtils";

const cardScript: CardScript = {
    onKeyForge: {
        perform: (state) => {
            activePlayerState(state).amber = 0
        }
    }
}

cardScripts.scripts.set("forgemaster-og", cardScript)