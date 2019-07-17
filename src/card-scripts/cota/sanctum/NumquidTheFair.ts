import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Play: Destroy an enemy creature. Repeat this card’s effect if your opponent still controls more creatures than you.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("numquid-the-fair", cardScript)