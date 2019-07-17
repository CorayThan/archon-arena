import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  1,
//TODO Enemy creatures cannot reap.

}

cardScripts.scripts.set("barrister-joya", cardScript)