import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, putOnTopOfDeck } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Capture 1<A>. Destroyed: Put Dextre on top of your deck.
    power: () => 3,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    },
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            putOnTopOfDeck(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("dextre", cardScript)