import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { alterArmor } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gets +1 armor. Play: Fully heal this creature.
    amber: () => 1,
    staticEffect: (state, config) => {
        alterArmor(config.targets as Creature[], 1)
    },
    onPlay: {
        perform: (state, config) => {
            (config.targets[0] as Creature).tokens.damage = 0
        }
    }
}

cardScripts.scripts.set("seraphic-armor", cardScript)