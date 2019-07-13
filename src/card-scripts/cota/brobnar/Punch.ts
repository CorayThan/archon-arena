import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (config && config.targets && config.targets[0]) {
                const target = config.targets[0]
                // pseudo code
                // dealDamage(target, 3)
            }
        },
        targetOrder: [{
            types: [TargetType.CREATURE],
            areas: [TargetArea.BOARD],
            // friendly not passed because undefined means friendly or enemy
        }]
    }
}

cardScripts.scripts.set("punch", cardScript)