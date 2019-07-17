import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  9,
//TODO Shadow Self deals no damage when fighting.  Damage dealt to non-Specter neighbors is dealt to Shadow Self instead.

}

cardScripts.scripts.set("shadow-self", cardScript)