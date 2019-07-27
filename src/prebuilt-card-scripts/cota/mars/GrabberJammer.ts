import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your opponent’s keys cost +1<A>.Fight/Reap: Capture 1<A>.
    power: () => 4,
    armor: () => 1,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("grabber-jammer", cardScript)