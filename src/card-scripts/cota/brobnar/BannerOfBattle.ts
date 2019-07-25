import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state: GameState) => {
        alterPower(friendlyCreatures(state), 1)
    }
}

cardScripts.scripts.set("banner-of-battle", cardScript)
