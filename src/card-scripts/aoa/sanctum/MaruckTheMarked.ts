import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { captureAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After Maruck the Marked prevents damage with its armor, capture 1A for each damage just prevented.
    power: () => 5,
    armor: () => 1,
    //TODO onDamaged action
    // onDamaged: (state, config) => {
    //     const armor = (config.thisCard as Creature).tokens.armor
    //     const armorDamage = damageIncoming >= armor ? armor : damageIncoming
    //     if (armorDamage>0) captureAmber(state, armorDamage)
    // }
}

cardScripts.scripts.set("maruck-the-marked", cardScript)