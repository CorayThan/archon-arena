import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	alpha: () =>  true,
//TODO Alpha. (You can only play this card before doing anything else this step.)
Play: Each player gains A equal to
the A in their pool.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("binate-rupture", cardScript)