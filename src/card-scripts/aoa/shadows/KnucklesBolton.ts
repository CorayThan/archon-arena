import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	elusive: () =>  true,
	skirmish: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Skirmish. (When you use this creature to fight, it is dealt no damage in return.)

}

cardScripts.scripts.set("knuckles-bolton", cardScript)