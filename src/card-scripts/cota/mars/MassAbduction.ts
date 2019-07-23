import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Put up to 3 damaged enemy creatures into your archives.
    // If any of these creatures leave your archives, they are put into their owner’s hand instead.
    amber: () => 1,
    onPlay: {
        validTargets: (state) => allCreatures(state)
            .filter(x => (x as Creature).tokens.damage > 0),
        upToTargets: () => true,
        perform: (state, config) => {
            putInArchives(state, config.targets, true)
        }
    }
}

cardScripts.scripts.set("mass-abduction", cardScript)