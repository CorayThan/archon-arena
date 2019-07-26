import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skip your “forge a key” step.You get all <A> spent by your opponent when forging keys.Action: Sacrifice The Sting.
    amber: () => 1,
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("the-sting", cardScript)