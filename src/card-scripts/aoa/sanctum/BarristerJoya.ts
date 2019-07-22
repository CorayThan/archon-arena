import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {inactivePlayerState} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Enemy creatures cannot reap.
    power: () => 5,
    armor: () => 1,
    staticEffect: (state) => {
        inactivePlayerState(state).creatures.forEach(x => {
            //TODO make Creature.canReap a thing
            //  (x as Creature).canReap = false
        })
    }

}

cardScripts.scripts.set("barrister-joya", cardScript)