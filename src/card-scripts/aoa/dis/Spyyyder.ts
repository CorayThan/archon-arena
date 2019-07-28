import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
    // Spyyyder gains poison while attacking an enemy flank creature.
    power: () => 2,
    skirmish: () => true,
    staticEffect: () => {
        //TODO get attckedcreature
        // const attackedCreature = Creature
        // if (isFlank(attackedCreature) {
        //     (config.thisCard as Creature).poison === true
        // }

    }
}
cardScripts.scripts.set("spyyyder", cardScript)