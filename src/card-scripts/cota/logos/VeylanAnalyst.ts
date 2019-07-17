import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Each time you use an artifact, gain 1<A>.

}

cardScripts.scripts.set("veylan-analyst", cardScript)