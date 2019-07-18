import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Skirmish.
    // Creatures to the left of Panpaca,
    Jaga in the battleline gain skirmish.
    power
:
() => 3,
    skirmish
:
() => true,

}

cardScripts.scripts.set("panpaca-jaga", cardScript)