import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: For the remainder of the turn, each creature loses elusive.
    amber: () => 1,
    action: {
        perform: (state) => {
            allCreatures(state).forEach(x => x.tokens.elusive = 0)
        }
    }
}

cardScripts.scripts.set("sniffer", cardScript)