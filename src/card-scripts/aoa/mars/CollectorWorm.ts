import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
//import { putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Fight: Archive the creature Collector Worm fights. If that creature leaves your archives, put it in its owner’s hand instead.
    power: () => 2,
    armor: () => 5,
    //TODO get creature from fight
    // fight: {
    //     perform: (state, config) => {
    //         putInArchives(state, creatureInFight(state) as Creature[], true)
    //     }
    // }
}

cardScripts.scripts.set("collector-worm", cardScript)