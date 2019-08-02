import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, checkHouse, healCreatures, stunCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    selectFromChoices: () => ['Heal 3 damage on a Mars Creature', "Stun Mars creature"],
    perform: (state: GameState, config0: CardActionConfig) => {
        return {
            validTargets: (state: GameState) => allCreatures(state).filter(x => checkHouse(x, House.Mars)),
            numberOfTargets: () => 1,
            perform: (state: GameState, config1: CardActionConfig) => {
                if (config0.selection === "Stun Mars creature") {
                    stunCreatures(config1.targets as Creature[])
                } else {
                    healCreatures(config1.targets as Creature[], 3)
                }
            }
        }
    }
}
const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) 
    // Fight/Reap: Heal 3 damage from a Mars creature or stun a Mars creature.
    power: () => 2,
    elusive: () => true,
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("ozmo-martianologist", cardScript)