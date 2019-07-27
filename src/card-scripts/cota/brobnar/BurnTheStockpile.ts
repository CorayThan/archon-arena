import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber >= 7)
                modifyAmber(inactivePlayerState(state), -4)
        }
    }
}

cardScripts.scripts.set("burn-the-stockpile", cardScript)
