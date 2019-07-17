import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Play: Capture 1<A>.Destroyed: Put Dextre on top of your deck.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("dextre", cardScript)