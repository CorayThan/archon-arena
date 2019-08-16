import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, friendlyArtifacts, friendlyCreatures, getCardsWithTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: A friendly creature captures 1A for each friendly Shard.
    action: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state: GameState) => getCardsWithTrait(friendlyArtifacts(state), 'Shard"').length,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets as Creature[]).forEach(x => captureAmber(state, x as Creature, 1))
        }
    }
}

cardScripts.scripts.set("shard-of-hope", cardScript)