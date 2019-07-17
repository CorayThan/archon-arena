import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	skirmish: () =>  true,
//TODO Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
At the end of your turn, if you did not play any creatures this turn, gain 1A.

}

cardScripts.scripts.set("redlock", cardScript)