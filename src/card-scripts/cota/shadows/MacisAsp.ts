import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	skirmish: () =>  true,
	poison: () =>  true,
//TODO Skirmish. (When you use this creature to fight, it is dealt no damage in return.)Poison. (Any damage dealt by this creature’s power during a fight destroys the damaged creature.)

}

cardScripts.scripts.set("macis-asp", cardScript)