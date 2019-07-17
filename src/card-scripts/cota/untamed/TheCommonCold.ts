import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage, destroyCard} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"
import {House} from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        perform: (state, config) => {
            config.targets.forEach(target => {
                const targetedCreature = target as Creature
                if (targetedCreature.backingCard.house === House.Mars) destroyCard(targetedCreature)
                else dealDamage(targetedCreature, 1)
            })
        }
    }
}

cardScripts.scripts.set("the-common-cold", cardScript)