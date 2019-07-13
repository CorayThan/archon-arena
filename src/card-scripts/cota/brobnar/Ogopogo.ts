import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    fight: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const target = config.targets[0] as Creature
                dealDamage(target, 2)
            }
        },
        //if destroyed the creature... choose a target
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE]
        }]
    }
}

cardScripts.scripts.set("ogopogo", cardScript)