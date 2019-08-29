import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards, friendlyArtifacts, getCardsWithTrait } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Draw a card for each friendly Shard.
    action: {
        perform: (state: GameState) => {
            const targets = getCardsWithTrait(friendlyArtifacts(state), "Shard")
            drawCards(activePlayerState(state), targets.length)
        }
    }
}
cardScripts.scripts.set("shard-of-knowledge", cardScript)