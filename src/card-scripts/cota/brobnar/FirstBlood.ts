import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"
import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"
import {allCreatures, dealDamage, friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
	amber: () => 1,
	alpha: () => true,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: (state) => {
            return friendlyCreatures(state)
                .filter(creature => creature.backingCard.house === House.Brobnar)
                .length
        },
        perform: (state, config) => {
            config.targets.forEach(card => dealDamage(card as Creature, 2))
        }
    }
}

cardScripts.scripts.set("first-blood", cardScript)