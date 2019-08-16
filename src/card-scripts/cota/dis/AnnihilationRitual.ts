import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { purgeCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // When a creature would enter a discard pile from play, it is purged instead.
    //TODO make this only trigger when a creature is leaving play and going to discard
    amber: () => 1,
    onLeavesPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.triggerCard.backingCard.cardType === "Creature") {
                purgeCards(state, [config.triggerCard])
            }
        }
    }
}
cardScripts.scripts.set("annihilation-ritual", cardScript)