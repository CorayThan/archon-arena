import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Reap: Trigger the reap effect of another creature in play as if you controlled that creature. (That creature does not exhaust.)
    power: () => 2,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("replicator", cardScript)