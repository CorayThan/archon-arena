import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Each of Archimedes’s neighbors gains, “Destroyed: Archive this creature.”
    power: () => 2,
    elusive: () => true,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add destroyed code here
        }
    },
}
cardScripts.scripts.set("archimedes", cardScript)