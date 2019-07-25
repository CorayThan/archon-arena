import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enableFighting, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            enableFighting(friendlyCreatures(state))
        }
    }
}

cardScripts.scripts.set("follow-the-leader", cardScript)
