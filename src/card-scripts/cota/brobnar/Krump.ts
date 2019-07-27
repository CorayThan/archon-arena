import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    power: () => 6,
    onAnyFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO if destroyed target in a fight
        }
    }
}

cardScripts.scripts.set("krump", cardScript)
