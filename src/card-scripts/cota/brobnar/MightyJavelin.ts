import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {allCreatures, dealDamage, destroyCard} from "../../ScriptUtils"


const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCard(config.thisCard)
            dealDamage(config.targets[0] as Creature, 4)
        }
    }
}

cardScripts.scripts.set("mighty-javelin", cardScript)