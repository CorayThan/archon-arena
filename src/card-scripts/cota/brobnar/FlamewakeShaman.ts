import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets , dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                dealDamage(targetedCreature, 2)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE]
        }]
    }
}

cardScripts.scripts.set("flamewake-shaman", cardScript)