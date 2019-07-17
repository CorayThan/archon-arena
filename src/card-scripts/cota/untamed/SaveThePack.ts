import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, destroyCard} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        perform: (state, config) => {
            config.targets.forEach(target => {
                if ((target as Creature).damage > 0) destroyCard(target as Creature)
            })
        },
    },

}

cardScripts.scripts.set("save-the-pack", cardScript)