import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    enemyCreatures,
    enemyFlankCreatures,
    enemyPlayer,
    friendlyPlayer,
    moveCreature
} from "../../ScriptUtils"

import { Creature } from "../../../shared/gamestate/Creature"

let controlCreature: Creature

const cardScript: CardScript = {
    // Play: Take control of an enemy flank creature until Harland Mindlock leaves play.
    power: () => 1,
    onPlay: {
        validTargets: enemyFlankCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            const index = enemyCreatures(state).findIndex(x => x.id === (config0.targets[0] as Creature).id)
            controlCreature = enemyCreatures(state)[index]
            moveCreature(state, activePlayerState(state), controlCreature)

        }
    },
    onLeavesPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const playerState = friendlyPlayer(state, config.thisCard)
            const index = playerState.creatures.findIndex(x => x.id === (controlCreature as Creature).id)
            controlCreature = playerState.creatures[index]
            moveCreature(state, enemyPlayer(state, config.thisCard), controlCreature)
        }
    }
}
cardScripts.scripts.set("harland-mindlock", cardScript)