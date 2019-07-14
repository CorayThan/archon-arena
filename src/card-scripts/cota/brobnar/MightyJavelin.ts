import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamage, destroyCard } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCard(config!.thisCard)
            dealDamage(config!.targets[0] as Creature, 4)
        }
    }
}

cardScripts.scripts.set("mighty-javelin", cardScript)