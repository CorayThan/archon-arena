import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO Before Fight: Choose a creature. Gabos Longarms deals damage to that creature rather than the one it is fighting.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},
	beforeFight: {
		perform: (state, config) => {
        //Add beforeFight code here
}	},

}

cardScripts.scripts.set("gabos-longarms", cardScript)