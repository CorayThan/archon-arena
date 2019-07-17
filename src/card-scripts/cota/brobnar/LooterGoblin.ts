import {CardScript} from "../../types/CardScript"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state) => {
            //create a static effect that gives 1 aember whenever an enemy creature is destroyed
        }
    }
}

//cardScripts.scripts.set("looter-goblin", cardScript)