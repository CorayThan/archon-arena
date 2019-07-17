import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Omni: Sacrifice Sigil of Brotherhood. For the remainder of the turn, you may use friendly Sanctum creatures.
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("sigil-of-brotherhood", cardScript)