import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
After a creature is played adjacent to Fila the Researcher, draw a card.

}

cardScripts.scripts.set("fila-the-researcher", cardScript)