import {CardScript} from "../../types/CardScript"

const cardScript: CardScript = {
    power: () => 6,
    fight: {
        perform: (state) => {
            //TODO if the fight target is destroyed by that fight.
        }
    }
}

///cardScripts.scripts.set("mugwump", cardScript)