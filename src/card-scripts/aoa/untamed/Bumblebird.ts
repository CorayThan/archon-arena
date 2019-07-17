import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	alpha: () =>  true,
//TODO Alpha. (You can only play this card before doing anything else this step.)
Play: Put two +1 power counters on each other friendly Untamed creature.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("bumblebird", cardScript)