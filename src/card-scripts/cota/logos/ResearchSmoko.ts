import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, archiveTopCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Destroyed: Archive the top card of your deck.
    power: () => 2,
    destroyed: {
        perform: (state: GameState) => {
            archiveTopCard(state, activePlayerState(state), true)
        }
    }
}
cardScripts.scripts.set("research-smoko", cardScript)