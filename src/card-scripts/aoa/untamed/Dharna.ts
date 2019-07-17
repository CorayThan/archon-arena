import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Play: Gain 1A for each damaged friendly creature.
Reap: Heal 2 damage from a friendly creature.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},
	{
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("dharna", cardScript)