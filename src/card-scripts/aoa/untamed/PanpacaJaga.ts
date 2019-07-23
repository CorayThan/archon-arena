import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { toTheLeft, giveSkirmish } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Skirmish. Creatures to the left of Panpaca, Jaga in the battleline gain skirmish.
    power: () => 3,
    skirmish: () => true,
    staticEffect: (state, config) => {
        giveSkirmish(toTheLeft(state, config.thisCard as Creature))
    }
}

cardScripts.scripts.set("panpaca-jaga", cardScript)