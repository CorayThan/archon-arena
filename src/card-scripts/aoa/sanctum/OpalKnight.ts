import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, destroyCards} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Destroy each creature with even power.
    power: () => 5,
    onPlay: {
        perform: (state) => {
            const targets = allCreatures(state)
                .filter(x => ((x as Creature).power + (x as Creature).tokens.power) % 2 == 0)
            destroyCards(state, targets)
        }
    }
}

cardScripts.scripts.set("opal-knight", cardScript)