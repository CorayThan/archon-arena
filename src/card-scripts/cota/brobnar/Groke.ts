import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    fight: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber > 0)
                inactivePlayerState(state).amber--
        }
    }
}

cardScripts.scripts.set("groke", cardScript)
