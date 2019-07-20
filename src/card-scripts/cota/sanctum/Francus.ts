import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {captureAmber} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Francus, Francus captures 1<A>.
    power: () => 6,
    armor: () => 1,
    //TODO make onDestroyedCreatureDuringFight trigger
    // onDestroyedCreatureDuringFight: {
    //     perform: (state, config) => {
    //         captureAmber(state, config.thisCard as Creature, 1 )
    //     }
    // }
}

cardScripts.scripts.set("francus", cardScript)