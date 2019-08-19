import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {captureAmber, enemyCreatures, friendlyCreatures, inactivePlayerState} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => {
            return friendlyCreatures(state).length > enemyCreatures(state).length ? friendlyCreatures(state) : []
        },
        numberOfTargets: (state) => {
            return Math.min(
                friendlyCreatures(state).length - enemyCreatures(state).length,
                inactivePlayerState(state).amber)
        },
        perform: (state: GameState, config: CardActionConfig) => {
            config.targets.forEach(creature => captureAmber(state, creature as Creature, 1))
        }
    }
}

cardScripts.scripts.set("unguarded-camp", cardScript)
