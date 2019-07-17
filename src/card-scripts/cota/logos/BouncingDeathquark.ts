import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Destroy an enemy creature and a friendly creature. You may repeat this effect as many times as you like, as long as it is possible to repeat the entire effect.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("bouncing-deathquark", cardScript)