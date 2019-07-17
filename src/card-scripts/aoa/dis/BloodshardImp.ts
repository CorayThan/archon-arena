import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO After a creature reaps, its controller must sacrifice it.

}

cardScripts.scripts.set("bloodshard-imp", cardScript)