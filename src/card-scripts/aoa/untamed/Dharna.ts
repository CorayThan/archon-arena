import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Gain 1A for each damaged friendly creature.
    // Reap: Heal 2 damage from a friendly creature.
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },

}

cardScripts.scripts.set("dharna", cardScript)