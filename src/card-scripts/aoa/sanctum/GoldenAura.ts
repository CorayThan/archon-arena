import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Choose a creature. Fully heal the chosen creature. For the remainder of the turn, the chosen creature is considered to be in house Sanctum and cannot be dealt damage.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("golden-aura", cardScript)