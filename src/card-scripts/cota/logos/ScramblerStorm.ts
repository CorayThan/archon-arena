import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Your opponent cannot play action cards on their next turn.
    amber: () => 1,
    onPlay: {
        perform: () => {
            //TODO inactivePlayerState(state).playActions = false
        }
    }
}
cardScripts.scripts.set("scrambler-storm", cardScript)