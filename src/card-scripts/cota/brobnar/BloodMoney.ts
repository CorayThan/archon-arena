import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, placeAmber } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            const target = config.targets[0] as Creature
            placeAmber(target, 2)
        },        
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: false
        }]
    }
}

cardScripts.scripts.set("blood-money", cardScript)