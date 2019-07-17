import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	skirmish: () =>  true,
//TODO Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
Spyyyder gains poison while attacking an enemy flank creature.

}

cardScripts.scripts.set("spyyyder", cardScript)