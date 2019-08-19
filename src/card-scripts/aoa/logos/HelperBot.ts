import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: You may play one non-Logos card this turn.
    power: () => 1,
    onPlay: {
        perform: () => {
            //TODO effect
        }
    }
}
cardScripts.scripts.set("helper-bot", cardScript)