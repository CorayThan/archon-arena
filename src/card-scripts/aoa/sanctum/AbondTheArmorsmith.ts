import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Other friendly creatures get +1 armor.
Action: For the remainder of the turn, other friendly creatures get +1 armor.
	action: {
		(state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("abond-the-armorsmith", cardScript)