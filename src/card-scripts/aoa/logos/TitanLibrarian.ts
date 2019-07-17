import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
//TODO At the end of your turn, if Titan Librarian is not on a flank, archive a card.

}

cardScripts.scripts.set("titan-librarian", cardScript)