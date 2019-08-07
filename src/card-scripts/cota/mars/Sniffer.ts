import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Action: For the remainder of the turn, each creature loses elusive.
    amber: () => 1,
    action: {
        perform: () => {
            //TODO make elusive a token that resets every round
            //allCreatures(state).forEach(x => x.tokens.elusive = false)
        }
    }
}

cardScripts.scripts.set("sniffer", cardScript)