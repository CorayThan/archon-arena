import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {fightUsingCreature, friendlyCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 2,
        perform: (state, config) => {
            config.targets.forEach(target => {
                (target as Creature).skirmish = true
                fightUsingCreature(target as Creature)
            })
        }
    }

}

cardScripts.scripts.set("scout", cardScript)