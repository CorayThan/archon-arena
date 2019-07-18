import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {allCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Creatures to the right of Panpaca, Anga in the battleline get +2 power.
    //TODO add toTheRight in Util
    power: () => 5,
    staticEffect: (state, config) => {
        allCreatures(state).filter(creature => toTheRight(config.thisCard as Creature, creature as Creature))
            .forEach(creature => (creature as Creature).tokens.power += 2)
    }
}

cardScripts.scripts.set("panpaca-anga", cardScript)