import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, readyCreature, fightUsingCreature } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 3,
        uniqueTargets: () => true,
        perform: (state, config) => {
            if (config.targets!.length >= 1) {
                readyCreature(config.targets![0] as Creature)
                fightUsingCreature(config.targets![0] as Creature)
            }
            if (config.targets!.length >= 2) {
                readyCreature(config.targets![1] as Creature)
                fightUsingCreature(config.targets![1] as Creature)
            }
            if (config.targets!.length >= 3) {
                readyCreature(config.targets![2] as Creature)
                fightUsingCreature(config.targets![2] as Creature)
            }
        }
    }
}

cardScripts.scripts.set("relentless-assault", cardScript)
