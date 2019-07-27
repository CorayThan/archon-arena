import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Fight: Deal 2D to a creature and move it to either flank of its controller’s battleline.
    power: () => 4,
    armor: () => 2,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("yxlyx-stimrager", cardScript)