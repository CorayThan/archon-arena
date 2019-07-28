import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, readyCreatures, unStunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Ready a Mars creature or stun a non-Mars creature.
    amber: () => 1,
    onPlay: {
        selectFromChoices: () => ['Ready a Mars creature', 'Stun a non-Mars creature'],
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.selection === 'Ready a Mars creature') {
                unStunCreatures(config.targets as Creature[])
            } else {
                readyCreatures(config.targets as Creature[])
            }
        }
    }
}

cardScripts.scripts.set("squawker", cardScript)