import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Other friendly creatures get +1 armor. Action: For the remainder of the turn, other friendly creatures get +1 armor.
    power: () => 3,
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("abond-the-armorsmith", cardScript)