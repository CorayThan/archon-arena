import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  2,
//TODO Play: Stun a creature. Action: Return Lady Maxena to its owner’s hand.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("lady-maxena", cardScript)