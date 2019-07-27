import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Before Fight: Deal 2D to each neighbor of the creature Cowfyne fights.
    power: () => 5,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
    beforeFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add beforeFight code here
        }
    },
}
cardScripts.scripts.set("cowfyne", cardScript)