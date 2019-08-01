import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, archiveTopCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Archive the top card of your deck.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            archiveTopCard(state, activePlayerState(state), true)
        }
    }
}
cardScripts.scripts.set("random-access-archives", cardScript)