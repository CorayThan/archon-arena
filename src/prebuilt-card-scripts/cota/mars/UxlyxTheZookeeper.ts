import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Reap: Put an enemy creature into your archives. If that creature leaves your archives, it is put into its owner’s hand instead.
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("uxlyx-the-zookeeper", cardScript)