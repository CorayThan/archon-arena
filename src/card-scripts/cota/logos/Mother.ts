import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO During your “draw cards” step, refill your hand to 1 additional card.

}

cardScripts.scripts.set("mother", cardScript)