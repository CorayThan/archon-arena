import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: Put two +1 power counters on each other friendly Untamed creature.
    power: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("bumblebird", cardScript)