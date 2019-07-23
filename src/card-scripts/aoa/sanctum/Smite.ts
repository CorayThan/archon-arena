import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {
    fightUsingCreatures,
    friendlyCreatures,
    readyCreatures
} from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Ready and fight with a friendly creature. Deal 2D to the attacked creature’s neighbors.
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            readyCreatures(config.targets as Creature[])
            fightUsingCreatures(config.targets as Creature[])
            // TODO Get attacked Creature
            // const attackedCreature = '???????'
            // dealDamage(getNeighbors(enemyCreatures(state), attackedCreature as Creature), 2)
        }
    }
}

cardScripts.scripts.set("smite", cardScript)