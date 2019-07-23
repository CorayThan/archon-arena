import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { friendlyCreatures, unStunCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Unstun each friendly creature.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            unStunCreatures(friendlyCreatures(state))
        }
    }
}

cardScripts.scripts.set("clear-mind", cardScript)