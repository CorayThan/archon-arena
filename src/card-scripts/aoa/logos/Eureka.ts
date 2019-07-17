import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	alpha: () =>  true,
//TODO Alpha. 
Play: Gain 2A. Archive 2 random cards from your hand.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("eureka", cardScript)