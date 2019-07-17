import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	skirmish: () =>  true,
//TODO Skirmish.
Play: Your opponent gains 1A.
Destroyed: Steal 3A.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},
	{
		(state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("brend-the-fanatic", cardScript)