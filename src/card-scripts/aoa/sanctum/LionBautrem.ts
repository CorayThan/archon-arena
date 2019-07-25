import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, friendlyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Deploy. (This creature can enter play anywhere in your battleline.) “Lion” Bautrem’s neighbors get +2 power.
    power: () => 4,
    armor: () => 1,
    deploy: () => true,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        alterPower(getNeighbors(friendlyCreatures(state), config.thisCard as Creature), 2)
    }

}

cardScripts.scripts.set("lion-bautrem", cardScript)