import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	power: () =>  2,
//TODO Play: Draw 2 cards. Action: Shuffle Timetraveller into your deck.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("timetraveller", cardScript)