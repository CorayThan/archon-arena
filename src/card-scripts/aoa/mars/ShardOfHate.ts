import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, friendlyArtifacts, getCardsWithTrait, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Stun an enemy creature for each friendly Shard.
    action: {
        validTargets: allCreatures,
        numberOfTargets: (state) => getCardsWithTrait(friendlyArtifacts(state), 'Shard').length,
        perform: (state, config) => {
            stunCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("shard-of-hate", cardScript)