import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Put an enemy creature into your archives for each key your opponent has forged. If any of these creatures leave your archives, they are put into their owner’s hand instead.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("sample-collection", cardScript)