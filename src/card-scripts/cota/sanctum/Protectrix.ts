import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO Reap: You may fully heal a creature. If you do, that creature cannot be dealt damage for the remainder of the turn.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("protectrix", cardScript)