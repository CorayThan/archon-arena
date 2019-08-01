import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Archive Mobius Scroll and up to 2 cards from your hand.
    action: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 2,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets.concat(config.thisCard), true)
        }
    }
}
cardScripts.scripts.set("mobius-scroll", cardScript)