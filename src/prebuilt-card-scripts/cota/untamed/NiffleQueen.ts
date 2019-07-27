import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each other friendly Beast creature gets +1 power.Each other friendly Niffle creature gets +1 power.
    power: () => 6,
}
cardScripts.scripts.set("niffle-queen", cardScript)