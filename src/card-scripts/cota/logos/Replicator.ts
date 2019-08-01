import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Reap: Trigger the reap effect of another creature in play as if you controlled that creature. (That creature does not exhaust.)
    power: () => 2,
    reap: {
        perform: () => {
            //TODO Add reap code here
        }
    }
}
cardScripts.scripts.set("replicator", cardScript)