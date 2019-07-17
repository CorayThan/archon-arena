import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Until your next turn, enemy creatures’ text boxes are considered blank (except for traits).
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("shadow-of-dis", cardScript)