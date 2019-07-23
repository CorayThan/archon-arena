import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        (config.targets[0] as Creature).assault += 2
    }

}

cardScripts.scripts.set("way-of-the-bear", cardScript)