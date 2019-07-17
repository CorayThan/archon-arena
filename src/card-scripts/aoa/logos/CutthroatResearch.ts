import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Steal 2A if your opponent has
8A or more.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("cutthroat-research", cardScript)