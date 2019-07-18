import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // This creature cannot be used unless its controller has discarded a card this turn.
    amber: () => 1,

}

cardScripts.scripts.set("earthbind", cardScript)