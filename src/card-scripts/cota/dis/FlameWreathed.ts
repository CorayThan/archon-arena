import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gets +2 power and gains hazardous 2. (Before this creature is attacked, deal 2<D> to the attacking enemy.)

}

cardScripts.scripts.set("flame-wreathed", cardScript)