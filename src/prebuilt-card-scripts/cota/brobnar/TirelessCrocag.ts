import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Tireless Crocag cannot reap.You may use Tireless Crocag as if it belonged to the active house.If your opponent has no creatures in play, destroy Tireless Crocag.
    power: () => 7,
}
cardScripts.scripts.set("tireless-crocag", cardScript)