import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    fight: {
        //TODO if destroyed the creature it fought... choose a target
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets[0] as Creature, 2)
        }
    }
}

cardScripts.scripts.set("ogopogo", cardScript)