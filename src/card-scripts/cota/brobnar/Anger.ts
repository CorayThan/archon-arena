import { cardScripts } from "../../CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, readyCreature, fightUsingCreature } from "../../ScriptUtils"
import { GameState  } from "../../../shared/gamestate/GameState"
import { CardActionConfig  } from "../../types/CardScript"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targetedCreature = config.targets![0] as Creature
            readyCreature(targetedCreature)
            fightUsingCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("anger", cardScript)
