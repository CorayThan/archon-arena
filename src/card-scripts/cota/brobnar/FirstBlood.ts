import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, dealDamage } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
	amber: () => 1,
	alpha: () => true,
    onPlay: {
        perform: (state, config) => {
        	if (checkIfHasTargets(config, 1)) {
                const targets = config.targets
                targets
                .forEach(card => dealDamage(card as Creature, 2))
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            //need to have a variable amount of targets
        }]
    }
}

cardScripts.scripts.set("first-blood", cardScript)