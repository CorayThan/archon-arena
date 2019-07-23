import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
// import { friendlyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // You cannot play creatures.  
    // After an enemy creature is destroyed fighting Grommid, your opponent loses 1<A>.
    power: () => 10,
    staticEffect: (state, config) => {
        //TODO cannotplaycreatures
        //friendlyPlayer(state, config.thisCard).cannotPlayCreatures
    },
    //TODO this might work, probably not
    fight: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const target = config.targets[0] as Creature
            if (target.tokens.damage >= (target.tokens.power + target.power)) {
                modifyAmber(inactivePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("grommid", cardScript)