import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures } from "../../types/ScriptUtils"
import { enableFighting } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            friendlyCreatures(state)
            .forEach(creature => enableFighting(creature))
        }
    }
}

cardScripts.scripts.set("follow-the-leader", cardScript)