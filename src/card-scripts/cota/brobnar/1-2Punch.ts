import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, stunCreature, destroyCard } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                if(targetedCreature.tokens.stun > 0)
                    destroyCard(targetedCreature)
                else
                    stunCreature(targetedCreature)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: false
        }]
    }
}

cardScripts.scripts.set("1-2-punch", cardScript)