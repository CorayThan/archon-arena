import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { enemyCreatures } from "../../types/ScriptUtils"
import { onFlank } from "../../types/ScriptUtils"
import { dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        perform: (state) => {
            enemyCreatures(state)
            .filter(creature => onFlank(enemyCreatures(state), creature))
            .forEach(creature => dealDamage(creature, 2))
        }
    }
}

cardScripts.scripts.set("brammo", cardScript)