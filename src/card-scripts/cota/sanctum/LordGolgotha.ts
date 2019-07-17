import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  2,
//TODO Before Fight: Deal 3<D> to each neighbor of the creature Lord Golgotha fights.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},
	beforeFight: {
		perform: (state, config) => {
        //Add beforeFight code here
}	},

}

cardScripts.scripts.set("lord-golgotha", cardScript)