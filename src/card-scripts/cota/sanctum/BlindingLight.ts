import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
// import {House} from "../../../shared/keyforge/house/House"
// import {allCreatures, stunCreatures} from "../../ScriptUtils"
// import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a house. Stun each creature of that house.
    amber: () => 1,
    //TODO Text Selection
    // onPlay: {
    //     validTargets: Object.values(House),
    //     numberOfTargets: () => 1,
    //     perform: (state, config) => {
    //         const targets = allCreatures(state)
    //             .filter(x => (x as Creature).backingCard.house === config.targets[0] as unknown)
    //         stunCreatures(targets)
    //     }
    // }
}

cardScripts.scripts.set("blinding-light", cardScript)