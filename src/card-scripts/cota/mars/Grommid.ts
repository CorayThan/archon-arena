import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // You cannot play creatures.   
    // After an enemy creature is destroyed fighting Grommid, your opponent loses 1<A>.
    power: () => 10,
    staticEffect: () => {
        //TODO cannotplaycreatures
        //friendlyPlayer(state, config.thisCard).cannotPlayCreatures
    },
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(enemyPlayer(state, config.thisCard), -1)
        }
    }
}

cardScripts.scripts.set("grommid", cardScript)