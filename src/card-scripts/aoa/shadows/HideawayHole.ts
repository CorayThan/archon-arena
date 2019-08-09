import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, friendlyCreatures, giveElusive } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Hideaway Hole. Creatures you control gain elusive until the start of your next turn.
    amber: () => 1,
    omni: {
        validTargets: friendlyCreatures,
        perform: (state: GameState, config: CardActionConfig) => {
            giveElusive(friendlyCreatures(state))
            destroyCards(state, [config.thisCard])
        }
    },
    runAtStartOfNextTurn: {
        perform: (state: GameState) => {
            friendlyCreatures(state).forEach(x => {
                x.tokens.elusive = x.elusive ? 1 : 0
            })
        }
    }
}
cardScripts.scripts.set("hideaway-hole", cardScript)