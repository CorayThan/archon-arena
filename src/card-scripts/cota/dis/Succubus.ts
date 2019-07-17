import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO During their “draw cards” step, your opponent refills their hand to 1 less card.

}

cardScripts.scripts.set("succubus", cardScript)