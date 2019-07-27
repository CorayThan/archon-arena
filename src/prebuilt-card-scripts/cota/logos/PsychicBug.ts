import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play/Reap: Look at your opponent’s hand.
    amber: () => 1,
    power: () => 2,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("psychic-bug", cardScript)