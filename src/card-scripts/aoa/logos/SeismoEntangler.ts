import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Action: Choose a house. During your opponent’s next turn, creatures of the chosen house cannot be used to reap.
    action: {
        perform: () => {
            //TODO effect
        }
    }
}
cardScripts.scripts.set("seismo-entangler", cardScript)