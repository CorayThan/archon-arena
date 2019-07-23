import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allArtifacts, allCreatures, destroyCards, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Each Mars creature and each Robot creature is stunned. Each artifact is destroyed.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            destroyCards(state, allArtifacts(state))
            stunCreatures(allCreatures(state)
                .filter(x => {
                    (x as Creature).backingCard.house === House.Mars || (x as Creature).backingCard.traits.includes("Robot")
                }))
        }
    }
}

cardScripts.scripts.set("emp-blast", cardScript)