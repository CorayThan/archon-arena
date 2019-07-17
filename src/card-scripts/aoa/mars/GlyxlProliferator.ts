import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Reap: If Glyxl Proliferator is on a flank, archive a Mars card from your discard pile.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("glyxl-proliferator", cardScript)