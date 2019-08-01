import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.) Fight: Steal 1<A>.
    power: () => 2,
    skirmish: () => true,
    fight: {
        perform: (state: GameState) => {
            steal(state, 1)
        }
    }
}
cardScripts.scripts.set("batdrone", cardScript)