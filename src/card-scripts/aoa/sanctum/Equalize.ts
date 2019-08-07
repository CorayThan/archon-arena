import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Redistribute the A on friendly creatures among friendly creatures.
    // Then, redistribute the A on enemy creatures among enemy creatures.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state: GameState) => friendlyCreatures(state).reduce((a, b) => a + (b as Creature).tokens.amber, 0),
        uniqueTargets: () => false,
        perform: (state: GameState, config0: CardActionConfig) => {
            friendlyCreatures(state).forEach(x => (x as Creature).tokens.amber = 0)
            config0.targets.forEach(x => (x as Creature).tokens.amber += 1)
            return {
                validTargets: enemyCreatures,
                numberOfTargets: (state: GameState) => enemyCreatures(state).reduce((a, b) => a + (b as Creature).tokens.amber, 0),
                uniqueTargets: () => false,
                perform: (state: GameState, config1: CardActionConfig) => {
                    enemyCreatures(state).forEach(x => (x as Creature).tokens.amber = 0)
                    config1.targets.forEach(x => (x as Creature).tokens.amber += 1)
                }
            }

        }
    }
}

cardScripts.scripts.set("equalize", cardScript)