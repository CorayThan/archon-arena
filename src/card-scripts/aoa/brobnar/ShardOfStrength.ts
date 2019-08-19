import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    friendlyArtifacts,
    friendlyCreatures,
    getCardsWithTrait,
    putPowerCounters
} from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    action: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state: GameState) => {
            return getCardsWithTrait(friendlyArtifacts(state), "Shard").length
        },
        perform: (state: GameState, config: CardActionConfig) => {
            putPowerCounters(config.targets as Creature[], 1)
        }
    }
}
cardScripts.scripts.set("shard-of-pain", cardScript)