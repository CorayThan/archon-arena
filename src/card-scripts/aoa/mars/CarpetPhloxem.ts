import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, dealDamage, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If there are no friendly creatures in play, deal 4D to each creature.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if (0 >= friendlyCreatures(state).length) {
                dealDamage(allCreatures(state), 4)
            }
        }
    }
}

cardScripts.scripts.set("carpet-phloxem", cardScript)