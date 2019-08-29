import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, enableUse, friendlyArtifacts } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Scientifical Hack. For the remainder of the turn, you may use friendly artifacts as if they belonged to the active house.
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            enableUse(friendlyArtifacts(state))
            destroyCards(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("scientifical-hack", cardScript)