import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    power: () => 4,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        //TODO "During each turn in which Untamed is not your active house, you may play one Untamed card."
    }
}

cardScripts.scripts.set("witch-of-the-wilds", cardScript)