import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	deploy: () =>  true,
//TODO Deploy. (This creature can enter play anywhere in your battleline.)
Play/Fight/Reap: You may ready and fight with a neighboring creature.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},
	{
		(state, config) => {
        //Add reap code here
}	},
	{
		(state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("the-grey-rider", cardScript)