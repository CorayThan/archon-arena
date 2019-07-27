import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature cannot be used unless its controller has discarded a card this turn.
    amber: () => 1,
    staticEffect: () => {
        //TODO cannot be used unless player discards
    }
}

cardScripts.scripts.set("earthbind", cardScript)