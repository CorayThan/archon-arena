import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
	armor: () =>  1,
//TODO After an enemy creature is destroyed fighting Francus, Francus captures 1<A>.

}

cardScripts.scripts.set("francus", cardScript)