import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures } from "../../ScriptUtils"
import { onFlank } from "../../ScriptUtils"
import { dealDamage } from "../../ScriptUtils"

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
