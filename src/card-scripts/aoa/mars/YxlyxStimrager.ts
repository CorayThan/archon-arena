import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  2,
//TODO Fight: Deal 2D to a creature and move it to either flank of its controller’s battleline.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("yxlyx-stimrager", cardScript)