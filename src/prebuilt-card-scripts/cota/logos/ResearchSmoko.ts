import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Destroyed: Archive the top card of your deck.
    power: () => 2,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add destroyed code here
        }
    },
}
cardScripts.scripts.set("research-smoko", cardScript)