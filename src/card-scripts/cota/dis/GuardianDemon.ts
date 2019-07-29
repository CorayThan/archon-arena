import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, healCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    validTargets: allCreatures,
    numberOfTargets: () => 1,
    perform: (state: GameState, config0: CardActionConfig) => {
        const damageHealed = Math.max((config0.targets[0] as Creature).tokens.damage, 2)
        healCreatures(config0.targets as Creature[], 2)
        return {
            validTargets: allCreatures,
            numberOfTargets: () => 1,
            perform: (state: GameState, config1: CardActionConfig) => {
                dealDamage(config1.targets as Creature[], damageHealed)
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