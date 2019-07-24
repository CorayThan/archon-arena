import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { friendlyCreatures } from "../../ScriptUtils"
import { enableFighting } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            friendlyCreatures(state)
                .forEach(creature => enableFighting(creature))
        }
    }
}

cardScripts.scripts.set("follow-the-leader", cardScript)
