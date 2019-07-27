import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time you play an artifact, gain 1<A>.
    power: () => 3,
}
cardScripts.scripts.set("hayyel-the-merchant", cardScript)