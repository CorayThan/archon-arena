import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, enemyCreatures, activePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (friendlyCreatures(state).length > enemyCreatures(state).length)
                activePlayerState(state).amber += 2
        }
    }
}

cardScripts.scripts.set("smith", cardScript)