import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {enemyCreatures, friendlyCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Redistribute the A on friendly creatures among friendly creatures.
    // Then, redistribute the A on enemy creatures among enemy creatures.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state) => friendlyCreatures(state).reduce((a, b) => a + (b as Creature).tokens.amber, 0),
        uniqueTargets: () => false,
        perform: (state, config) => {
            friendlyCreatures(state).forEach(x => (x as Creature).tokens.amber = 0)
            config.targets.forEach(x => (x as Creature).tokens.amber += 1)

        }
    },
    //TODO Not sure this works, but it would be wicked sweet if it did
    // onPlay: {
    //     validTargets: enemyCreatures,
    //     numberOfTargets: (state) => enemyCreatures(state).reduce((a, b) => a + (b as Creature).tokens.amber, 0),
    //     uniqueTargets: () => false,
    //     perform: (state, config) => {
    //         enemyCreatures(state).forEach(x => (x as Creature).amber = 0)
    //         config.targets.forEach(x => (x as Creature).amber += 1)
    //     }
    // }
}

cardScripts.scripts.set("equalize", cardScript)