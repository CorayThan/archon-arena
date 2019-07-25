import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Storm Crawler only deals 1D when fighting. After an enemy creature reaps, stun it.
    power: () => 6,
    armor: () => 1,
    //TODO fight does 1 damage
    onEnemyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures([config.triggerCard] as Creature[])
        }
    }
}

cardScripts.scripts.set("storm-crawler", cardScript)