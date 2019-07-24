import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 3,
    armor: () => 1,
    onEnemyReap: {
        perform: (state, config) => {
            stunCreatures([config.triggerCard] as Creature[])
        }
    }
}

cardScripts.scripts.set("zysysyx-shockworm", cardScript)