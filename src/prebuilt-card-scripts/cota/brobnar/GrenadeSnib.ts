import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Destroyed: Your opponent loses 2<A>.
    power: () => 2,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add destroyed code here
        }
    },
}
cardScripts.scripts.set("grenade-snib", cardScript)