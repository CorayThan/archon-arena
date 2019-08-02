import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: If an opponent forges a key on their next turn, they must give you their remaining <A>.
    amber: () => 1,
    onPlay: {
        perform: () => {
            //TODO
        }
    }
}
cardScripts.scripts.set("interdimensional-graft", cardScript)