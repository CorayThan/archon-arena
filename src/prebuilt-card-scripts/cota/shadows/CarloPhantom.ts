import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. Skirmish.Each time you play an artifact, steal 1<A>.
    power: () => 1,
    elusive: () => true,
    skirmish: () => true,
}
cardScripts.scripts.set("carlo-phantom", cardScript)