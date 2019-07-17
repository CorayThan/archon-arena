import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
//TODO After a creature is destroyed fighting Brain Eater, draw a card.

}

cardScripts.scripts.set("brain-eater", cardScript)