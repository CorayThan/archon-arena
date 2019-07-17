import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Omni: Sacrifice Hideaway Hole. Creatures you control gain elusive until the start of your next turn.
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("hideaway-hole", cardScript)