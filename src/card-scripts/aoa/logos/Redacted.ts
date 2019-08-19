import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { Artifact } from "../../../shared/gamestate/Artifact"
import { activePlayerState, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After you choose Logos as your active house, place 1A from the common supply on [REDACTED].
    // When there are 4 or more A on [REDACTED], sacrifice it and forge a key at no cost.
    onHouseChoice: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (state.activeHouse === House.Logos) {
                (config.thisCard as Artifact).tokens.amber += 1
            }
            if ((config.thisCard as Artifact).tokens.amber >= 4) {
                activePlayerState(state).keys += 1
                destroyCards(state, [config.thisCard])
            }
        }
    }
}
cardScripts.scripts.set("redacted", cardScript)