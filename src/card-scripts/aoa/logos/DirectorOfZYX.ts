import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, archiveTopCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // At the start of your turn, archive the top card of your deck.
    power: () => 3,
    elusive: () => true,
    atStartOfYourTurn: {
        perform: (state: GameState) => {
            archiveTopCard(state, activePlayerState(state), true)
        }
    }
}
cardScripts.scripts.set("director-of-z-y-x", cardScript)