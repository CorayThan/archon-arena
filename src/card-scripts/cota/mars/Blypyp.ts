import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Reap: The next Mars creature you play this turn enters play ready.
    power: () => 2,
    // reap: {
    //     perform: (state: GameState) => {
    //         TODO
    //     }
    // }
}

cardScripts.scripts.set("blypyp", cardScript)