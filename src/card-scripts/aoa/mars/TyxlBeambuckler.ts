import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  1,
//TODO Play: Deal 2D to a creature and move it to either flank of its controller’s battleline.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("tyxl-beambuckler", cardScript)