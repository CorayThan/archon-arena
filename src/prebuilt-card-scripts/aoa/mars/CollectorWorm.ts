import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Fight: Archive the creature Collector Worm fights. If that creature leaves your archives, put it in its owner’s hand instead.
    power: () => 2,
    armor: () => 5,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("collector-worm", cardScript)