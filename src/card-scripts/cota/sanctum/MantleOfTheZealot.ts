import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature gains, “You may use this creature as if it belonged to the active house.”
    //TODO add universal house
    staticEffect: (state, config) => {
        //(config.target[0] as Creature).backingCard.house = House
    }
}

cardScripts.scripts.set("mantle-of-the-zealot", cardScript)