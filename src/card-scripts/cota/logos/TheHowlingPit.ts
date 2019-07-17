import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO During their “draw cards” step, each player refills their hand to 1 additional card.

}

cardScripts.scripts.set("the-howling-pit", cardScript)