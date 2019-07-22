import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {dealDamage, enemyCreatures} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 4)
        }
    }
}

cardScripts.scripts.set("mighty-tiger", cardScript)