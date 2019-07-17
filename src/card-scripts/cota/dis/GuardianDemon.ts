import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
//TODO Play/Fight/Reap: Heal up to 2 damage from a creature. Deal that amount of damage to another creature.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("guardian-demon", cardScript)