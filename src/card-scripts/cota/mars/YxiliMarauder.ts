import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Yxili Marauder gets +1 power for each <A> on it.Play: Capture 1<A> for each friendly ready Mars creature.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("yxili-marauder", cardScript)