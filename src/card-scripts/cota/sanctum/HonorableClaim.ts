import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, friendlyCreatures, getCardsWithTrait, inactivePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Each friendly Knight creature captures 1<A>.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const knights = getCardsWithTrait(friendlyCreatures(state), "Knight")
            return {
                validTargets: () => knights,
                numberOfTargets: (state: GameState) => inactivePlayerState(state).amber,
                perform: (state: GameState, config: CardActionConfig) => {
                    config.targets.forEach(x => captureAmber(state, x as Creature, 1))
                }
            }
        }
    }
}

cardScripts.scripts.set("honorable-claim", cardScript)