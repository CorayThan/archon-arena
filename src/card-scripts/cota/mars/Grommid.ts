import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  10,
//TODO You cannot play creatures.  After an enemy creature is destroyed fighting Grommid, your opponent loses 1<A>.

}

cardScripts.scripts.set("grommid", cardScript)