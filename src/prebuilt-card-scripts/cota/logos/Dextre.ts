import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play: Capture 1<A>.Destroyed: Put Dextre on top of your deck.
    power: () => 3,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add destroyed code here
        }
    },
}
cardScripts.scripts.set("dextre", cardScript)