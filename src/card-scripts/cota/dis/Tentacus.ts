import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO Your opponent must pay you 1<A> in order to use an artifact.

}

cardScripts.scripts.set("tentacus", cardScript)