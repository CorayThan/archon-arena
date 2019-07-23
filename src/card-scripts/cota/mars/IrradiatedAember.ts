import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { dealDamage, enemyCreatures, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent has 6<A> or more, deal 3<D> to each enemy creature.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 6) dealDamage(enemyCreatures(state), 3)
        }
    }
}

cardScripts.scripts.set("irradiated-aember", cardScript)