import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, enemyCreatures, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Swap the positions of two creatures in a battleline.
    amber: () => 1,
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            const firstTarget = config0.targets[0] as Creature
            const battleline = friendlyCreatures(state).some(x => x.id === firstTarget.id) ? friendlyCreatures(state) : enemyCreatures(state)
            return {
                validTargets: () => battleline.filter(x => x.id !== firstTarget.id),
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    const secondTarget = config1.targets[0] as Creature
                    const firstTargetIndex = battleline.findIndex(x => x.id === firstTarget.id)
                    const secondTargetIndex = battleline.findIndex(x => x.id === secondTarget.id)
                    const swap = battleline[secondTargetIndex]
                    battleline[secondTargetIndex] = battleline[firstTargetIndex]
                    battleline[firstTargetIndex] = swap
                }
            }
        }
    }
}
cardScripts.scripts.set("quantum-fingertrap", cardScript)