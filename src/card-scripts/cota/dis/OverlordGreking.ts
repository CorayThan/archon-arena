import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  7,
//TODO After an enemy creature is destroyed fighting Overlord Greking, put that creature into play under your control.

}

cardScripts.scripts.set("overlord-greking", cardScript)