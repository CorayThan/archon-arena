import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures, enemyCreatures, mustFightWhenUsedIfAble } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    staticEffect: (state) => {
        friendlyCreatures(state).forEach(creature => mustFightWhenUsedIfAble(creature))
        enemyCreatures(state).forEach(creature => mustFightWhenUsedIfAble(creature))
    }
}

cardScripts.scripts.set("little-rapscal", cardScript)