import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { putInArchives } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: 2,
    elusive: true,
    reap: {
        perform: (state, config) => {
            const targetId = config!.targets![0]
            putInArchives(state, targetId, true)
        },
        targetOrder: [{types: [TargetType.CREATURE], areas: [TargetArea.BOARD], friendly: false}]
    }
}

cardScripts.scripts.set("uxlyx-the-zookeeper", cardScript)
