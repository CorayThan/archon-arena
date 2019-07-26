import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Before Fight: Choose a creature. Gabos Longarms deals damage to that creature rather than the one it is fighting.
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
cardScripts.scripts.set("gabos-longarms", cardScript)