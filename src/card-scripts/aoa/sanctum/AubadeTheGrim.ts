import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  1,
//TODO Play: Capture 3A.
Reap: Discard 1A from Aubade the Grim.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},
	{
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("aubade-the-grim", cardScript)