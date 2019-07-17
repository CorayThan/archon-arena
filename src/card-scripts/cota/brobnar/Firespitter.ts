import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {dealDamage, enemyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 1,
    beforeFight: {
        perform: (state) => {
            enemyCreatures(state).forEach(creature => dealDamage(creature, 1))
        }
    }
}

cardScripts.scripts.set("firespitter", cardScript)