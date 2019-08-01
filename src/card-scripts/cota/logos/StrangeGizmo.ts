import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allArtifacts, allCreatures, destroyCards, friendlyPlayer } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // After you forge a key, destroy each creature and artifact.
    amber: () => 1,
    onNextKeyForge: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (friendlyPlayer(state, config.thisCard).player.id === activePlayerState(state).player.id) {
                const targets = (allCreatures(state) as CardInGame[]).concat(allArtifacts(state) as CardInGame[])
                destroyCards(state, targets)
            }
        }
    }
}
cardScripts.scripts.set("strange-gizmo", cardScript)