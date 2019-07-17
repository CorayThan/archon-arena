import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Redistribute the A on friendly creatures among friendly creatures. Then, redistribute the A on enemy creatures among enemy creatures.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("equalize", cardScript)