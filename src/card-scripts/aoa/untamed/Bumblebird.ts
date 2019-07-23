import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Put two +1 power counters on each other friendly Untamed creature.
    power: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state) => {
            friendlyCreatures(state)
                .filter(creature => (creature as Creature).backingCard.house === House.Untamed)
                .forEach(creature => (creature as Creature).tokens.power += 2)
        }
    }
}

cardScripts.scripts.set("bumblebird", cardScript)