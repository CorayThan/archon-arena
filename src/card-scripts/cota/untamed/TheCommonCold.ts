import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage, destroyCards} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => allCreatures(state).filter(creature => (creature as Creature).backingCard.house === House.Mars),
        perform: (state, config) => {
            destroyCards(state, config.targets as Creature[])
            dealDamage(allCreatures(state), 1)
        }
    }
}

cardScripts.scripts.set("the-common-cold", cardScript)