import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains, “After you play a Mars creature, ready this creature and for the remainder of the turn it belongs to house Mars.”
    staticEffect: (state: GameState, config: CardActionConfig) => {
        //TODO
    }
}

cardScripts.scripts.set("brain-stem-antenna", cardScript)