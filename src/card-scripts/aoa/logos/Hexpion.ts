import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, archiveTopCard, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Destroyed: Archive Hexpion and the top card of your deck.
    power: () => 2,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            archiveTopCard(state, activePlayerState(state), true)
            putInArchives(state, [config.thisCard], true)
        }
    }
}
cardScripts.scripts.set("hexpion", cardScript)