import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    onAnyFight: {
        perform: (state, config) => {

        }
    },
    reap: {
        perform: (state, config) => {

        }
    }
}

cardScripts.scripts.set("project-zyx", cardScript)
