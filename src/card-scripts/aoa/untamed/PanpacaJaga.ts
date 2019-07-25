import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { giveSkirmish, toTheLeft } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Skirmish. Creatures to the left of Panpaca, Jaga in the battleline gain skirmish.
    power: () => 3,
    skirmish: () => true,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        giveSkirmish(toTheLeft(state, config.thisCard as Creature))
    }
}

cardScripts.scripts.set("panpaca-jaga", cardScript)