import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, allArtifacts, destroyCard, modifyAmber} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Fight: Destroy an artifact. If that artifact had an Æmber bonus, you gain that much A.
    power: () => 4,
    fight: {
        validTargets: allArtifacts,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(card => {
                modifyAmber(activePlayerState(state), (card as CardInGame).backingCard.amber)
                destroyCard(card)
            })
        }
    }
}

cardScripts.scripts.set("rustgnawer", cardScript)