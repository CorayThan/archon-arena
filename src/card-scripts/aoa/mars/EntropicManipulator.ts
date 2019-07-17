import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Choose a player. You may redistribute the damage on the creatures that player controls among that player’s creatures. (You may cause more damage to a creature than it has power.)
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("entropic-manipulator", cardScript)