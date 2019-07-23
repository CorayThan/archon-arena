import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enableFighting, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each friendly creature can be used as if they were in the active house, but can only fight.
    power: () => 5,
    onPlay: {
        perform: (state) => {
            enableFighting(friendlyCreatures(state))
        }
    }
}

cardScripts.scripts.set("horseman-of-war", cardScript)