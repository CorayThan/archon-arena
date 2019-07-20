import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, allCreatures, healCreatures, modifyAmber} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Heal 1 damage from each creature. Gain 1<A> for each creature healed this way.
    onPlay: {
        perform: (state) => {
            const healedCreatures = allCreatures(state)
                .filter(creature => (creature as Creature).tokens.damage > 0).length
            modifyAmber(activePlayerState(state), healedCreatures)
            healCreatures(allCreatures(state), 1)
        }
    }
}

cardScripts.scripts.set("cleansing-wave", cardScript)