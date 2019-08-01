import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, any <A> you would gain from reaping is stolen from your opponent instead.
    onPlay: {
        perform: () => {
            //TODO create effect
        }
    }
}
cardScripts.scripts.set("dimension-door", cardScript)