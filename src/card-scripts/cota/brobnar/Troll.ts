import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {healCreature} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    power: () => 8,
    reap: {
        perform: (state, config) => {
            healCreature(config.thisCard as Creature, 3)
        }
    }
}

cardScripts.scripts.set("troll", cardScript)