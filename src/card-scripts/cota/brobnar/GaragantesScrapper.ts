import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { activePlayerState, checkIfHasTargets, dealDamage } from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    alpha: () => true,
    power: () => 3,
    onPlay: {
        perform: (state) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                dealDamage(targetedCreature, 3)
            }
        },
        targetOrder: [{
            //TODO need conditional targetting here, should only happen if active player has 3+ aember...
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: false
        }]
    }
}

cardScripts.scripts.set("garagantes-scrapper", cardScript)