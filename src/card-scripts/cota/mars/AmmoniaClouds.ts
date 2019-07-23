import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, dealDamage } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Deal 3<D> to each creature.
    onPlay: {
        perform: (state) => {
            dealDamage(allCreatures(state), 3)
        }
    }
}

cardScripts.scripts.set("ammonia-clouds", cardScript)