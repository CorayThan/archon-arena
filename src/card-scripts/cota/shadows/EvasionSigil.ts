import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Before a creature fights, discard the top card of its controller's deck. If the discarded card is of the active house, exhaust that creature with no effect.

}

cardScripts.scripts.set("evasion-sigil", cardScript)