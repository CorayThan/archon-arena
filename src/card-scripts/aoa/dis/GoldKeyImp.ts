import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Players cannot forge their third key.
    power: () => 2,
    elusive: () => true,
    onPlay: {
        perform: () => {
            //TODO add a interrupt check while forging keys  something like Player.canForge = boolean
        }
    }
}
cardScripts.scripts.set("gold-key-imp", cardScript)