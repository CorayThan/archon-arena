import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, friendlyFlankCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each friendly flank creature gets +2 power.
    staticEffect: (state: GameState) => {
        alterPower(friendlyFlankCreatures(state), 2)
    }
}

cardScripts.scripts.set("haedroths-wall", cardScript)