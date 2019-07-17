import {CardScript} from "../../types/CardScript"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    runAfterAnyAction: {
        perform: (state) => {
            //TODO if action; enemy creature enetering board
        }
    }
}

//cardScripts.scripts.set("pingle-who-annoys", cardScript)