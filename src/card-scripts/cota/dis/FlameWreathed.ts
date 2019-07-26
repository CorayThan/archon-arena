import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature gets +2 power and gains hazardous 2. (Before this creature is attacked, deal 2<D> to the attacking enemy.)
    amber: () => 1,
    power: () => 2,
    hazardous: () => 2
}
cardScripts.scripts.set("flame-wreathed", cardScript)