import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { alterPower, toTheRight } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Creatures to the right of Panpaca, Anga in the battleline get +2 power.
    //TODO add toTheRight in Util
    power: () => 5,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        alterPower(toTheRight(state, config.thisCard as Creature), 2)
    }
}

cardScripts.scripts.set("panpaca-anga", cardScript)