import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Marmo Swarm gets +1 power for each A in your pool.

}

cardScripts.scripts.set("marmo-swarm", cardScript)