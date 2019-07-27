import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)Fight: Steal 1<A>.
    power: () => 2,
    skirmish: () => true,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("umbra", cardScript)