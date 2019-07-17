import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
	omega: () =>  true,
//TODO Omega. (After you play this card, end this step.)
Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Your creatures enter play ready.

}

cardScripts.scripts.set("duskwitch", cardScript)