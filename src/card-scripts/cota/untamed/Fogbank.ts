import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
// import {enemyCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: () => {
            //TODO This isn't functional, but its an idea
            //enemyCreatures(state).forEach(creature => creature.enableFighting = false)
        }
    },

}

cardScripts.scripts.set("fogbank", cardScript)