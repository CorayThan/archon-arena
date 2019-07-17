import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, putInHand} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        perform: (state, config) => {
            config.targets.forEach(target => putInHand(target as Creature))
        }
    }
}

cardScripts.scripts.set("natures-call", cardScript)