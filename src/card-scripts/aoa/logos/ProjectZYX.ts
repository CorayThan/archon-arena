import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  1,
//TODO Fight/Reap: You may play one of your archived cards as if it were in your hand and in the active house.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("project-z-y-x", cardScript)