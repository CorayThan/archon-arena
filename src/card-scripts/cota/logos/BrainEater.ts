import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // After a creature is destroyed fighting Brain Eater, draw a card.
    power: () => 6,
    //TODO get attackedCreature from somewhere
}
cardScripts.scripts.set("brain-eater", cardScript)