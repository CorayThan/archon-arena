import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, dealDamage, destroyCard, findCardById } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            destroyCard(findCardById(config.thisCardId))
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                dealDamage(targetedCreature, 4)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE]
        }]
    }
}

cardScripts.scripts.set("mighty-javelin", cardScript)