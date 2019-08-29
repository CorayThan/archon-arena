import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {activePlayerState, getNumberOfCreaturesDestroyedInAFight, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), getNumberOfCreaturesDestroyedInAFight(state))
        }
    }
}

cardScripts.scripts.set("the-warchest", cardScript)
