import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Choose a house. Your opponent cannot choose that house as their active house until Restringuntus leaves play.
    power: () => 1,
    onPlay: {
        selectFromChoices: () => Object.values(House),
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO inactivePlayer(state).houseChoice !== config.selection
        }
        //TODO add choice back in when card leaves play or turn on and off static effect
    }
}
cardScripts.scripts.set("restringuntus", cardScript)