import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  7,
//TODO Ether Spider deals no damage when fighting.Each <A> that would be added to your opponent’s pool is captured by Ether Spider instead.

}

cardScripts.scripts.set("ether-spider", cardScript)