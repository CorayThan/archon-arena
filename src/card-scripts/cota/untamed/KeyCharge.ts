import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, forgeKey } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            activePlayerState(state).amber -= 1
            forgeKey(activePlayerState(state))
        }
    }
}

cardScripts.scripts.set("key-charge", cardScript)
