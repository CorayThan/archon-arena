import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	elusive: () =>  true,
//TODO Elusive.You may use Mack the Knife as if it belonged to the active house.Action: Deal 1<D> to a creature. If this damage destroys that creature, gain 1<A>.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("mack-the-knife", cardScript)