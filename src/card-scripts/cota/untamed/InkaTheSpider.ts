import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, stunCreature} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 1,
    poison: () => true,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            stunCreature(config.targets[0] as Creature)
        }
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            stunCreature(config.targets[0] as Creature)
        }
    }
}

cardScripts.scripts.set("inka-the-spider", cardScript)