import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Your opponent cannot use creatures to fight on their next turn.
    amber: () => 1,
    onPlay: {
        perform: () => {
            //TODO Add onPlay code here
        }
    }
}
cardScripts.scripts.set("foggify", cardScript)