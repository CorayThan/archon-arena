import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatures, friendlyCreatures, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If there are no friendly creatures in play, you may archive a card for each enemy creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (0 >= friendlyCreatures(state).length) {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).hand,
                    numberOfTargets: (state: GameState) => enemyCreatures(state).length,
                    perform: (state: GameState, config: CardActionConfig) => {
                        putInArchives(state, config.targets, true)
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("master-the-theory", cardScript)