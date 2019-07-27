import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        (config.targets![0] as Creature).power += 5
    }
}

cardScripts.scripts.set("blood-of-titans", cardScript)
