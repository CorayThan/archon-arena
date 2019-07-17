import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Archive each friendly Knight creature in play.Omni: If you have played 7 or more Sanctum cards this turn, sacrifice Epic Quest and forge a key at no cost.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("epic-quest", cardScript)