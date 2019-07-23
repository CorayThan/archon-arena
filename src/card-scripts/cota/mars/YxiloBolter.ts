import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Fight/Reap: Deal 2<D> to a creature. If this damage destroys that creature, purge it.
    // TODO
    power: () => 3,
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    }
}

cardScripts.scripts.set("yxilo-bolter", cardScript)