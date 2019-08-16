import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { stunCreatures } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
    // Roxador only deals 2D when fighting.
    // Fight: Stun the attacked creature.
    power: () => 4,
    skirmish: () => true,
    fightingDamageDealt: () => 2,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("roxador", cardScript)