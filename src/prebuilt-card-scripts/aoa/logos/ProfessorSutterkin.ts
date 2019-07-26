import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Reap: Draw a card for each friendly Logos creature.
    power: () => 2,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("professor-sutterkin", cardScript)