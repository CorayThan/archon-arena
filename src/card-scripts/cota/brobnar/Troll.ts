import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {healCreature} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 8,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            healCreature(config.thisCard as Creature, 3)
        }
    }
}

cardScripts.scripts.set("troll", cardScript)
