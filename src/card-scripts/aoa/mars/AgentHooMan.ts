import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, friendlyCreatures, stunCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Reap: Choose a friendly non-Mars creature and an enemy non-Mars creature. Stun the chosen creatures.
    power: () => 2,
    elusive: () => true,
    reap: {
        validTargets: (state: GameState) => friendlyCreatures(state).filter(x => x.backingCard.house !== House.Mars),
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                validTargets: (state: GameState) => enemyCreatures(state).filter(x => x.backingCard.house !== House.Mars),
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    stunCreatures((config0.targets as Creature[]).concat(config1.targets as Creature[]))
                }
            }
        }
    }
}

cardScripts.scripts.set("agent-hoo-man", cardScript)