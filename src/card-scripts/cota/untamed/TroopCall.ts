import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).discard
            .filter(x => (x as CardInGame).backingCard.traits.includes("Niffle")),
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("troop-call", cardScript)