import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. Play: Put a card from your hand facedown under Jargogle. Destroyed: If it is your turn, play the card under Jargogle; otherwise, archive that card.
    power: () => 2,
    elusive: () => true,
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
cardScripts.scripts.set("jargogle", cardScript)