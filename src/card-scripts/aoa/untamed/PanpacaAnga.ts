import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {toTheRight} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Creatures to the right of Panpaca, Anga in the battleline get +2 power.
    //TODO add toTheRight in Util
    power: () => 5,
    staticEffect: (state, config) => {
        toTheRight(state, config.thisCard as Creature)
            .forEach(x => (x as Creature).tokens.power += 2)
    }
}

cardScripts.scripts.set("panpaca-anga", cardScript)