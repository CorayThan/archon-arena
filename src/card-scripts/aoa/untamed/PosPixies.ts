import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"

const cardScript: CardScript = {
    power: 1,
    elusive: true,
    onPlay: {
        perform: (state) => {
            // TODO check action log for stolen or captured aember, fix game state?
        }
    }
}

cardScripts.scripts.set("pos-pixies", cardScript)
