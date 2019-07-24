import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, alterArmor } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Each other Martian creature gets +1 armor.
    power: () => 2,
    armor: () => 2,
    elusive: () => true,
    staticEffect: (state, config) => {
        const targets = allCreatures(state).filter(x => x.backingCard.traits.includes("Martian") && x.id !== config.thisCard.id)
        alterArmor(targets, 1)
    }
}

cardScripts.scripts.set("ixxyxli-fixfinger", cardScript)