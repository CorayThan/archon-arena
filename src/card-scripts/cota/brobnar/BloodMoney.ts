import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { enemyCreatures, placeAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            placeAmber(config.targets[0] as Creature, 2)
        }
    }
}

cardScripts.scripts.set("blood-money", cardScript)
