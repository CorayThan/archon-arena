import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
//TODO While Gub is not on a flank, it gets +5 power and gains taunt.

}

cardScripts.scripts.set("gub", cardScript)