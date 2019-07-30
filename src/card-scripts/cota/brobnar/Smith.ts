import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, friendlyCreatures } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    amber: (state: GameState) => {
        return friendlyCreatures(state).length > enemyCreatures(state).length ? 3 : 1
    }
}

cardScripts.scripts.set("smith", cardScript)
