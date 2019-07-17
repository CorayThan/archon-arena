import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  11,
	taunt: () =>  true,
//TODO Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Chuff Ape enters play stunned.Fight/Reap: You may sacrifice another friendly creature. If you do, fully heal Chuff Ape.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("chuff-ape", cardScript)