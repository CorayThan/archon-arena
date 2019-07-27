import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you choose Logos as your active house, place 1A from the common supply on [REDACTED]. When there are 4 or more A on [REDACTED], sacrifice it and forge a key at no cost.
}
cardScripts.scripts.set("redacted", cardScript)