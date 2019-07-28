import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Omni: Reveal a Mars creature from your hand. If you do, archive it.
    omni: {
        validTargets: (state: GameState) => activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            revealCards(state, config.targets)
            putInArchives(state, config.targets, true)
        }
    }
}

cardScripts.scripts.set("incubation-chamber", cardScript)