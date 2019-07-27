import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Zorg enters play stunned. Before Fight: Stun the creature Zorg fights and each of that creature’s neighbors.
    power: () => 7,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
    beforeFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add beforeFight code here
        }
    },
}
cardScripts.scripts.set("zorg", cardScript)