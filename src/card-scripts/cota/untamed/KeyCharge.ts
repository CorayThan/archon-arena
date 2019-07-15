import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            const player = activePlayerState(state)
            player.amber -= 1
            // TODO this will need to use a "key cost calculation" / "can forge" reusable function
            if (player.amber > 5) {
                player.amber -= 6
                player.keys++
            }
        }
    }
}

cardScripts.scripts.set("key-charge", cardScript)
