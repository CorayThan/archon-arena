import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    // While Pitlord is in play you must choose Dis as your active house.
    amber: () => 2,
    power: () => 9,
    taunt: () => true,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        //TODO friendlyPlayer(state, config.thisCard).houseChoice === House.Dis
    }
}
cardScripts.scripts.set("pitlord", cardScript)