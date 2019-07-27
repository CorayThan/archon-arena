import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Before Fight: The creature Mindworm fights deals damage equal to its power to each of its neighbors.
    power: () => 1,
    elusive: () => true,
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
cardScripts.scripts.set("mindworm", cardScript)