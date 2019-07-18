import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {dealDamage, enemyCreatures, onFlank} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Deal 2D to each enemy flank creature. Deal 1D to each enemy creature not on a flank.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            enemyCreatures(state).forEach(creature => {
                if (onFlank(enemyCreatures(state), creature)) dealDamage(creature, 2)
                else dealDamage(creature, 1)
            })
        }
    },

}

cardScripts.scripts.set("theyre-everywhere", cardScript)