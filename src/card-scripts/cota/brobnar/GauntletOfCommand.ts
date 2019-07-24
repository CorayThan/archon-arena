import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, readyCreature, fightUsingCreature } from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
    	perform: (state, config) => {
            const targetedCreature = config.targets![0] as Creature
            readyCreature(targetedCreature)
            fightUsingCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("gauntlet-of-command", cardScript)
