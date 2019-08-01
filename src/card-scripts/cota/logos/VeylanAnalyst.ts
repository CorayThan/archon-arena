import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each time you use an artifact, gain 1<A>.
    power: () => 2,
    onAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.triggerCard.backingCard.cardType === "Artifact" &&
                friendlyPlayer(state, config.triggerCard).player.id === activePlayerState(state).player.id) {
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("veylan-analyst", cardScript)