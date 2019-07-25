import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // You must lose 3<A> in order to play Truebaru.  Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Destroyed: Gain 5<A>.
    power: () => 7,
    taunt: () => true,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add destroyed code here
        }
    },
}
cardScripts.scripts.set("truebaru", cardScript)