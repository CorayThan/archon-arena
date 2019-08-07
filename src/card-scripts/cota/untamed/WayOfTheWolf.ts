import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature gains skirmish.  (When you use this creature to fight, it is dealt no damage in return.)
    amber: () => 1,
    skirmish: () => true
}

cardScripts.scripts.set("way-of-the-wolf", cardScript)