import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Skirmish. Creatures to the left of Panpaca, Jaga in the battleline gain skirmish.
    power: () => 3,
    skirmish: () => true,
    //TODO add toTheleft in Util, add skirmish to Creature
    power: () => 5,
    staticEffect: (state, config) => {
        allCreatures(state).filter(creature => toTheLeft(config.thisCard as Creature, creature as Creature))
            .forEach(creature => (creature as Creature).skirmish = true)
    }
}

cardScripts.scripts.set("panpaca-jaga", cardScript)