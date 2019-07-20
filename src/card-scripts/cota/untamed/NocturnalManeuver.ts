import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, exhaustCard} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        perform: (state, config) => {
            config.targets.forEach(target => exhaustCard(target as Creature))
        }
    }
}

cardScripts.scripts.set("nocturnal-maneuver", cardScript)