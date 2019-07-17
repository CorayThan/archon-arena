import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	skirmish: () =>  true,
//TODO Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
Roxador only deals 2D when fighting.
Fight: Stun the attacked creature.
	fight: {
		(state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("roxador", cardScript)