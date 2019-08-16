import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, checkHouse, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Put two +1 power counters on each other friendly Untamed creature.
    power: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state: GameState) => {
            alterPower(friendlyCreatures(state)
                .filter(x => checkHouse(x, House.Untamed)), 2)
        }
    }
}

cardScripts.scripts.set("bumblebird", cardScript)