import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO At the end of your turn, give each neighboring creature a +1 power counter.

}

cardScripts.scripts.set("grovekeeper", cardScript)