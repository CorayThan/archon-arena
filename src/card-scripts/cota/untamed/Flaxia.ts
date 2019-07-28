import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatures, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            if (friendlyCreatures.length >= enemyCreatures.length) {
                activePlayerState(state).amber += 2
            }
        }
    }
}

cardScripts.scripts.set("flaxia", cardScript)