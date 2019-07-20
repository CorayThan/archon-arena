import {CardScript} from "../../types/CardScript"
import {allCreatures, dealDamage} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"


const cardScript: CardScript = {
    power: () => 6,
    fight: {
        //TODO if destroyed the creature it fought... choose a target
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 2)
        }
    }
}

//cardScripts.scripts.set("ogopogo", cardScript)