import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, friendlyArtifacts, friendlyCreatures, getCardsWithTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: A friendly creature captures 1A for each friendly Shard.
    action: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.targets[0] as Creature, getCardsWithTrait(friendlyArtifacts(state), 'Shard"').length)
        }
    }
}

cardScripts.scripts.set("shard-of-hope", cardScript)