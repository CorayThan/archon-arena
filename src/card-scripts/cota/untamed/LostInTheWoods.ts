import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, putInDeck} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        //TODO if will allow any four creatures not 2 from each side, which is wrong
        validTargets: allCreatures,
        numberOfTargets: () => 4,
        perform: (state, config) => {
            //TODO make putInDeck in ScriptUtil
            config.targets.forEach(target => putInDeck(target as Creature))
        }
    }
}

cardScripts.scripts.set("lost-in-the-woods", cardScript)