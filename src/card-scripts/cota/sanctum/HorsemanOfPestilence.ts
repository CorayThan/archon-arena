import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, getCardsWithOutTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    perform: (state: GameState) => {
        dealDamage(getCardsWithOutTrait(allCreatures(state), "Horseman") as Creature[], 1)
    }
}

const cardScript: CardScript = {
    // Play/Fight/Reap: Deal 1<D> to each non-Horseman creature.
    power: () => 5,
    onPlay: effect,
    reap: effect,
    fight: effect
}

cardScripts.scripts.set("horseman-of-pestilence", cardScript)