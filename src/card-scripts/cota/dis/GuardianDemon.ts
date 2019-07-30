import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, healCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    validTargets: allCreatures,
    numberOfTargets: () => 1,
    perform: (state: GameState, config0: CardActionConfig) => {
        const targetDamage = (config0.targets[0] as Creature).tokens.damage
        return {
            selectFromChoices: () => targetDamage >= 2 ? [0, 1, 2] : Array.from(Array(targetDamage + 1).keys()),
            perform: (state: GameState, config1: CardActionConfig) => {
                healCreatures(config0.targets as Creature[], +config1.selection)
                return {
                    validTargets: allCreatures,
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config2: CardActionConfig) => {
                        dealDamage(config2.targets as Creature[], +config1.selection)
                    }
                }
            }
        }
    }
}

const cardScript: CardScript = {
    // Play/Fight/Reap: Heal up to 2 damage from a creature. Deal that amount of damage to another creature.
    power: () => 4,
    onPlay: effect,
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("guardian-demon", cardScript)