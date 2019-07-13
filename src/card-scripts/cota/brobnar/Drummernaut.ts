import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { returnToHand } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedGiant = config.targets[0] as Creature
                returnToHand(targetedGiant)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true,
            //need to be able to filter to giants only
        }]
    },
    fight: {
    	//perhaps a way to not be forced to duplicate code three times?
    	perform: (state, config) => {
            
        }
    },
    reap: {
		perform: (state, config) => {
            
        }
    }
}

cardScripts.scripts.set("drummernaut", cardScript)