import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Skirmish. 
    // (When you use this creature to fight, it is dealt no damage in return.)
    power: () => 3,
    elusive: () => true,
    skirmish: () => true,
}
cardScripts.scripts.set("knuckles-bolton", cardScript)