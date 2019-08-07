import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Each undamaged creature captures 1<A> from its opponent.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => {
                return {
                    validTargets: () => playerState.creatures
                        .filter(x => 0 === x.tokens.damage),
                    numberOfTargets: () => playerState.amber,
                    perform: (state: GameState, config: CardActionConfig) => {
                        (config.targets as Creature[]).forEach(x => captureAmber(state, x, 1))
                    }
                }
            })
        }
    }
}

cardScripts.scripts.set("pandemonium", cardScript)