import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	alpha: () =>  true,
//TODO Alpha. (You can only play this card before doing anything else this step.)
Play: Steal 1A for each friendly Thief creature.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("heist-night", cardScript)