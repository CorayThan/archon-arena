import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
	armor: () =>  1,
	taunt: () =>  true,
//TODO Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Fight/Reap: Swap Sanctum Guardian with another friendly creature in your battleline.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("sanctum-guardian", cardScript)