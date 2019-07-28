import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Until your next turn, enemy creatures’ text boxes are considered blank (except for traits).
    amber: () => 1,
    onPlay: {
        perform: () => {
            //TODO  WTF?!?!?!?
        }
    }
}
cardScripts.scripts.set("shadow-of-dis", cardScript)