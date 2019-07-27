import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { activePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Marmo Swarm gets +1 power for each A in your pool.
    power: () => 2,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        (config.thisCard as Creature).tokens.power += activePlayerState(state).amber
    }

}

cardScripts.scripts.set("marmo-swarm", cardScript)