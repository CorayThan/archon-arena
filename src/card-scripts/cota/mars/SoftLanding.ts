import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // Play: The next creature or artifact you play this turn enters play ready.
    nextCardPlayed: {
        perform: (state, config) => {
            (config.triggerCard as Creature | Artifact).ready = true
        }
    }
}

cardScripts.scripts.set("soft-landing", cardScript)