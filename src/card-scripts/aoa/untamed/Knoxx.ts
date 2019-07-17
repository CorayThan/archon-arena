import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Knoxx gets +3 power for each neighbor it has.

}

cardScripts.scripts.set("knoxx", cardScript)