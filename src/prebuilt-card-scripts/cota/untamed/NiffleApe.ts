import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While Niffle Ape is attacking, ignore taunt and elusive.
    power: () => 3,
}
cardScripts.scripts.set("niffle-ape", cardScript)