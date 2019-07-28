import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, giveTaunt, isFlank } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // While Gub is not on a flank, it gets +5 power and gains taunt.
    power: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (isFlank(state, config.thisCard as Creature)) {
            giveTaunt([config.thisCard as Creature])
            alterPower([config.thisCard as Creature], 5)
        }
    }
}
cardScripts.scripts.set("gub", cardScript)