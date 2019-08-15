import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyArtifacts, getCardsWithTrait, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Gain 1A for each friendly Shard.
    action: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), getCardsWithTrait(friendlyArtifacts(state), "Shard").length)
        }
    }
}
cardScripts.scripts.set("shard-of-greed", cardScript)