import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  7,
	taunt: () =>  true,
//TODO You must lose 3<A> in order to play Truebaru.  Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Destroyed: Gain 5<A>. 
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("truebaru", cardScript)