import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time you use an artifact, gain 1<A>.
    power: () => 2,
}
cardScripts.scripts.set("veylan-analyst", cardScript)