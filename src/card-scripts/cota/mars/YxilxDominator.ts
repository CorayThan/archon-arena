import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.) 
    // Yxilx Dominator enters play stunned.
    power: () => 9,
    armor: () => 1,
    taunt: () => true,
    onPlay: {
        perform: (state, config) => stunCreatures([config.thisCard] as Creature[])
    }

}

cardScripts.scripts.set("yxilx-dominator", cardScript)