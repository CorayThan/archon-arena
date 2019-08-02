import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { exhaustCards, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature belongs to all houses. Play: Stun and exhaust this creature.
    //TODO make universal house selection house: () => 'Any',
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures([config.thisCard] as Creature[])
            exhaustCards([config.thisCard] as Creature[])
        }
    }
}
cardScripts.scripts.set("experimental-therapy", cardScript)