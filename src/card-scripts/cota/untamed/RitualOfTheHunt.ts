import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCard, enableUse, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = friendlyCreatures(state)
                .filter(card => card.backingCard.house === House.Untamed)
            enableUse(targets)
            destroyCard(config.thisCard)
        }
    }
}

cardScripts.scripts.set("ritual-of-the-hunt", cardScript)