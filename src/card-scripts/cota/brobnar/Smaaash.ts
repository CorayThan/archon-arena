import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, stunCreature} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            stunCreature(config.targets[0] as Creature)
        }
    }
}

cardScripts.scripts.set("smaaash", cardScript)