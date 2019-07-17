import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Action: Choose a creature. For the remainder of the turn, the chosen creature cannot be dealt damage.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("hallowed-shield", cardScript)