import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        (config.targets[0] as Creature).assault += 2
    }

}

cardScripts.scripts.set("way-of-the-bear", cardScript)