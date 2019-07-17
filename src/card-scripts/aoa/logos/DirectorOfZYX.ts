import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
At the start of your turn, archive the top card of your deck.

}

cardScripts.scripts.set("director-of-z-y-x", cardScript)