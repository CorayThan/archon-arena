import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { enemyCreatures, stunCreature, destroyCard } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"
import { CardActionConfig } from "../../types/CardScript"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targetedCreature = config.targets![0] as Creature
            if (targetedCreature.tokens.stun > 0) {
                destroyCard(state, targetedCreature)
            } else {
                stunCreature(targetedCreature)
            }
        }
    }
}

cardScripts.scripts.set("1-2-punch", cardScript)
