import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
//TODO While Titan Mechanic is on a flank, each key costs –1<A>.

}

cardScripts.scripts.set("titan-mechanic", cardScript)