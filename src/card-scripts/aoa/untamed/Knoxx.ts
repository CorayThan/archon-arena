import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Knoxx gets +3 power for each neighbor it has.
    power: () => 3,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        (config.thisCard as Creature).tokens.power += 3 * getNeighbors(friendlyCreatures(state), config.thisCard as Creature).length
    }
}

cardScripts.scripts.set("knoxx", cardScript)