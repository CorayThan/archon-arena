import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, allCreatures, destroyCards, modifyAmber} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Choose one: destroy each Dis creature, or gain 1<A>.
    onPlay: {
        //TODO text choice
        validTargets: () => ['Destroy all Dis', `Gain <A>`],
        numberOfTargets: () => 1,
        perform: (state, config) => {
            if (config.targets[0] as unknown === 'Destroy All Dis') {
                const targets = allCreatures(state)
                    .filter(x => (x as Creature).backingCard.house === House.Dis)
                destroyCards(state, targets as CardInGame[])
            } else modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("begone", cardScript)