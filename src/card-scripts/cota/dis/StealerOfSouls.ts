import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
//TODO After an enemy creature is destroyed fighting Stealer of Souls, purge that creature and gain 1<A>.

}

cardScripts.scripts.set("stealer-of-souls", cardScript)