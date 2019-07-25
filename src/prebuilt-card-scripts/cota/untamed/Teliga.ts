import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time your opponent plays a creature, gain 1<A>.
    power: () => 3,
}
cardScripts.scripts.set("teliga", cardScript)