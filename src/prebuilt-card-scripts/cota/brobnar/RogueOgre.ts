import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // At the end of your turn, if you played exactly one card this turn, Rogue Ogre heals 2 damage and captures 1<A>.
    power: () => 6,
}
cardScripts.scripts.set("rogue-ogre", cardScript)