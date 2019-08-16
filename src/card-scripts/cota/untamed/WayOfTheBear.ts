import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature gains assault 2. (Before this creature attacks, deal 2<D> to the attacked enemy.)
    amber: () => 1,
    assault: () => 2
}

cardScripts.scripts.set("way-of-the-bear", cardScript)