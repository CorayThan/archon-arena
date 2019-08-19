import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, dealDamage, enemyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    alpha: () => true,
    power: () => 3,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: (state: GameState) => {
            return activePlayerState(state).amber < 3 ? 0 : 1
        },
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 3)
        }
    }
}

cardScripts.scripts.set("garagantes-scrapper", cardScript)
