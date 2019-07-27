import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO
        }
    }
}

cardScripts.scripts.set("lifeweb", cardScript)