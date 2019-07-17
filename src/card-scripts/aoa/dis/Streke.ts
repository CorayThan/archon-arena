import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
While Streke is not on a flank, your opponent refills their hand to 1 less card during their “draw cards” step.

}

cardScripts.scripts.set("streke", cardScript)