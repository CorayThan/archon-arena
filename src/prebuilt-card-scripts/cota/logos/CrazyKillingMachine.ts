import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Action: Discard the top card of each player’s deck. For each of those cards, destroy a creature or artifact of that card’s house, if able. If 2 cards are not destroyed as a result of this, destroy Crazy Killing Machine.
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("crazy-killing-machine", cardScript)