import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).discard.filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("regrowth", cardScript)