import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, enemyCreatures, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy an enemy creature and a friendly creature. You may repeat this effect as many times as you like,
    // as long as it is possible to repeat the entire effect.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state: GameState, config0: CardActionConfig) => {
            if (0 >= config0.targets.length) return
            return {
                validTargets: friendlyCreatures,
                numberOfTargets: () => 1,
                upToTargets: () => true,
                perform: (state: GameState, config1: CardActionConfig) => {
                    if (0 >= config1.targets.length) return
                    destroyCards(state, config0.targets.concat(config1.targets))
                    if (friendlyCreatures(state).length > 0 && enemyCreatures(state).length > 0) {
                        return cardScript.onPlay
                    }
                }
            }
        }
    }
}

cardScripts.scripts.set("bouncing-deathquark", cardScript)