import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enableUse, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Reap: Use a friendly non-Sanctum creature.
    power: () => 3,
    reap: {
        validTargets: (state) => friendlyCreatures(state)
            .filter(creature => (creature as Creature).backingCard.house !== House.Sanctum),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO make useCreature in Utils
            enableUse(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("commander-remiel", cardScript)