import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { getNeighbors, giveElusive } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Deploy. (This creature can enter play anywhere in your battleline.)
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Lamindra’s neighbors gain elusive.
    power: () => 1,
    elusive: () => true,
    deploy: () => true,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        giveElusive(getNeighbors(state, config.thisCard as Creature))
    }
}
cardScripts.scripts.set("lamindra", cardScript)