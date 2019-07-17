import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  2,
//TODO Each of Bulwark’s neighbors gets +2 armor.

}

cardScripts.scripts.set("bulwark", cardScript)