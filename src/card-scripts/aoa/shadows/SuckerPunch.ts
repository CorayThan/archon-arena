import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	alpha: () =>  true,
//TODO Alpha. (You can only play this card before doing anything else this step.)
Play: Deal 2D to an enemy creature.
If that creature is destroyed by this effect, archive Sucker Punch.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("sucker-punch", cardScript)