import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Each time you play an artifact, gain 1<A>.

}

cardScripts.scripts.set("hayyel-the-merchant", cardScript)