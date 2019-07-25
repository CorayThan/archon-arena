import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Action: Return an artifact to its owner's hand.
    action: {
        validTargets: allArtifacts,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets as CardInGame[])
        }
    }
}

cardScripts.scripts.set("whispering-reliquary", cardScript)