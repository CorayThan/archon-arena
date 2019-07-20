import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play/Fight/Reap: Deal 1<D> to each non-Horseman creature. 
    power: () => 5,
    onPlay: {
        perform: (state) => {
            dealDamage(allCreatures(state).filter(creature => (creature as Creature).traits.includes("Horseman")), 1)
        }
    },
    reap: {
        perform: (state) => {
            dealDamage(allCreatures(state).filter(creature => (creature as Creature).traits.includes("Horseman")), 1)
        }
    },
    fight: {
        perform: (state) => {
            dealDamage(allCreatures(state).filter(creature => (creature as Creature).traits.includes("Horseman")), 1)
        }
    },

}

cardScripts.scripts.set("horseman-of-pestilence", cardScript)