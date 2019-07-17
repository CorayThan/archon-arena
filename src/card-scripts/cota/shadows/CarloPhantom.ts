import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
	skirmish: () =>  true,
//TODO Elusive. Skirmish.Each time you play an artifact, steal 1<A>.

}

cardScripts.scripts.set("carlo-phantom", cardScript)