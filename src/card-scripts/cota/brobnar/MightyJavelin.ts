import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, allCreatures, dealDamage, destroyCard } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        validTargets: allCreatures,
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            //TODO need to sacrifice the javelin even if there's no targets...
            destroyCard(config!.thisCard)
            const targetedCreature = config!.targets[0] as Creature
            dealDamage(targetedCreature, 4)
        }
    }
}

cardScripts.scripts.set("mighty-javelin", cardScript)