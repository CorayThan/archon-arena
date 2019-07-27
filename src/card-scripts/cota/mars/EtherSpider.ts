import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Ether Spider deals no damage when fighting.Each <A> that would be added to your opponent’s pool is captured by Ether Spider instead.
    power: () => 7,
//TODO
}

cardScripts.scripts.set("ether-spider", cardScript)