import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber >= 7)
                modifyAmber(inactivePlayerState(state), -2)
        }
    }
}

cardScripts.scripts.set("lomir-flamefist", cardScript)
