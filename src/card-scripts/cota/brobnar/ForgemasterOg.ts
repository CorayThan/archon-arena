import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    onKeyForge: {
        perform: (state: GameState) => {
            activePlayerState(state).amber = 0
        }
    }
}

cardScripts.scripts.set("forgemaster-og", cardScript)
