import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, destroyCards, getLeastPowerful} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play/Fight/Reap: Destroy the least powerful creature.
    power: () => 5,
    onPlay: {
        perform: (state) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    },
    reap: {
        perform: (state) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    },
    fight: {
        perform: (state) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    },

}

cardScripts.scripts.set("horseman-of-famine", cardScript)