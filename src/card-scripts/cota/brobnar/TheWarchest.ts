import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, getNumberOfCreaturesDestroyedInAFight } from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        perform: (state: GameState) => {
            activePlayerState(state).amber += getNumberOfCreaturesDestroyedInAFight(state)
        }
    }
}

cardScripts.scripts.set("the-warchest", cardScript)
