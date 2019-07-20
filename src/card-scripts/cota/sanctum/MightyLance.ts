import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 3<D> to a creature and 3<D> to a neighbor of that creature.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 3)
            //TODO select which neighbor to damage
        }
    },

}

cardScripts.scripts.set("mighty-lance", cardScript)