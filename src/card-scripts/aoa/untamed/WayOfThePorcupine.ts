import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gains Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)
    amber: () => 1,
    staticEffect: (state, config) => {
        (config.targets[0] as Creature).hazardous += 3
    }
}

cardScripts.scripts.set("way-of-the-porcupine", cardScript)