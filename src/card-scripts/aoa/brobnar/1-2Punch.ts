import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { destroyCards, enemyCreatures, stunCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targetedCreature = config.targets as Creature[]
            if (targetedCreature[0].tokens.stun > 0) {
                destroyCards(state, targetedCreature)
            } else {
                stunCreatures(targetedCreature)
            }
        }
    }
}

cardScripts.scripts.set("1-2-punch", cardScript)
