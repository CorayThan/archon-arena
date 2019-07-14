import { cardScripts } from "../../types/CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { enemyCreatures, placeAmber } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const target = config.targets[0] as Creature
            placeAmber(target, 2)
        }
    }
}

cardScripts.scripts.set("blood-money", cardScript)