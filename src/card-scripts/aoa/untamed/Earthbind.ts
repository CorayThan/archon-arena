import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature cannot be used unless its controller has discarded a card this turn.

}

cardScripts.scripts.set("earthbind", cardScript)