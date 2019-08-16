import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Knoxx gets +3 power for each neighbor it has.
    power: () => 3,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        const knoxx = config.thisCard as Creature
        alterPower([knoxx], 3 * getNeighbors(state, knoxx).length)
    }
}

cardScripts.scripts.set("knoxx", cardScript)