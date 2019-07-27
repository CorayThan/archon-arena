import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Stealer of Souls, purge that creature and gain 1<A>.
    power: () => 6,
    //TODO add targeted attacked creature

}
cardScripts.scripts.set("stealer-of-souls", cardScript)