import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO At the end of your turn, your opponent loses 1<A>.

}

cardScripts.scripts.set("shaffles", cardScript)