import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, isFlank } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // While Titan Mechanic is on a flank, each key costs –1<A>.
    power: () => 6,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (isFlank(state, config.thisCard as Creature)) {
            allPlayerStates(state).forEach(playerState => playerState.keyCost -= 1)
        }
    }
}
cardScripts.scripts.set("titan-mechanic", cardScript)