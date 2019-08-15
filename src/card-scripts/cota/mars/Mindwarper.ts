import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) 
    // Action: Choose an enemy creature. It captures 1<A> from its own side.
    power: () => 2,
    elusive: () => true,
    action: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (inactivePlayerState(state).amber > 0) {
                (config.targets[0] as Creature).tokens.amber += 1
                modifyAmber(inactivePlayerState(state), -1)
            }
        }
    }
}

cardScripts.scripts.set("mindwarper", cardScript)