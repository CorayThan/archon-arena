import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state, config) => {
            const target = config!.targets![0]
            putInArchives(state, target, true)
        },
        validTargets: enemyCreatures
    }
}

cardScripts.scripts.set("uxlyx-the-zookeeper", cardScript)
