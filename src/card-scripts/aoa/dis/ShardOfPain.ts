import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, friendlyArtifacts, getCardsWithTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Deal 1D to an enemy creature for each friendly Shard.
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const shards = getCardsWithTrait(friendlyArtifacts(state), "Shard")
            dealDamage(config.targets as Creature[], shards.length)
        }
    }
}
cardScripts.scripts.set("shard-of-pain", cardScript)