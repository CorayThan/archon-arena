import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            (config.targets[0] as Creature).tokens.damage = 0
        }
    },
    taunt: () => true
}

cardScripts.scripts.set("yo-mama-mastery", cardScript)