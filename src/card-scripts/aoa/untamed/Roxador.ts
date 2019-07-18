import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
    // Roxador only deals 2D when fighting.
    Fight: Stun the attacked creature.
    power
:
() => 4,
    skirmish
:
() => true,
    fight
:
{
    (state, config) => {
        //Add fight code here
    }
}
,

}

cardScripts.scripts.set("roxador", cardScript)