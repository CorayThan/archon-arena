import {CardScript} from "../../types/CardScript"

const cardScript: CardScript = {
    power: () => 6,
    runAfterAnyAction: {
        perform: (state) => {
            //TODO if action; discarded a brobnar card
        }
    }
}

//cardScripts.scripts.set("rock-hurling-giant", cardScript)