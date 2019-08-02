import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, enemyPlayer, friendlyCreatures, friendlyPlayer, } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (config!.thisCard) {
            enemyPlayer(state, config.thisCard).keyCost += friendlyCreatures(state)
                .filter(creature => creature.power >= 5).length
            friendlyPlayer(state, config.thisCard).keyCost += enemyCreatures(state)
                .filter(creature => creature.power >= 5).length
        }
    }
}

cardScripts.scripts.set("grump-buggy", cardScript)
