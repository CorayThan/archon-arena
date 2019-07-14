import { cardScripts } from "../../types/CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, friendlyCreatures, returnToHand } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    //TODO would be nice to not have to duplicate this three times over, without making a dedicated function in ScriptUtils for this...
    onPlay: {
        //TODO need config here to get reference to Naut himself
        validTargets: (state) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
            .filter(creature => creature.traits.includes("Giant") && creature.id !== config!.thisCard.id)

        },
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            returnToHand(targetedGiant)
        }
    },
    fight: {
        validTargets: (state) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
            .filter(creature => creature.traits.includes("Giant") && creature.id !== config!.thisCard.id)

        },
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            returnToHand(targetedGiant)
        }
    },
    reap: {
		
        validTargets: (state) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
            .filter(creature => creature.traits.includes("Giant") && creature.id !== config!.thisCard.id)

        },
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            returnToHand(targetedGiant)
        }
    }
}

cardScripts.scripts.set("drummernaut", cardScript)