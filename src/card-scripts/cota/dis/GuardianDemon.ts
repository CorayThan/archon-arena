import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, healCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play/Fight/Reap: Heal up to 2 damage from a creature. Deal that amount of damage to another creature.
    power: () => 4,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        validSecondaryTargets: allCreatures,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.targets[0] as Creature).tokens.damage >= 2) {
                dealDamage(config.secondaryTargets as Creature[], Math.min((config.targets[0] as Creature).tokens.damage, 2))
            }
            healCreatures(config.targets as Creature[], 2)
        }
    },
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        validSecondaryTargets: allCreatures,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.targets[0] as Creature).tokens.damage >= 2) {
                dealDamage(config.secondaryTargets as Creature[], Math.min((config.targets[0] as Creature).tokens.damage, 2))
            }
            healCreatures(config.targets as Creature[], 2)
        }
    },
    fight: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        validSecondaryTargets: allCreatures,
        numberOfSecondaryTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.targets[0] as Creature).tokens.damage >= 2) {
                dealDamage(config.secondaryTargets as Creature[], Math.min((config.targets[0] as Creature).tokens.damage, 2))
            }
            healCreatures(config.targets as Creature[], 2)
        }
    }
}
cardScripts.scripts.set("guardian-demon", cardScript)