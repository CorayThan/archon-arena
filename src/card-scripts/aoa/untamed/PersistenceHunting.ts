import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
// import {House} from "../../../shared/keyforge/house/House"
// import {allCreatures, exhaustCard} from "../../ScriptUtils"
// import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a house. Exhaust each enemy creature of the chosen house.
    amber: () => 1,
    //TODO Text Selection
    // onPlay: {
    //     validTargets: Object.values(House),
    //     numberOfTargets: () => 1,
    //     perform: (state, config) => {
    //         const chosenHouse = config.targets[0] as House
    //         allCreatures(state).filter(creature => ((creature as Creature).backingCard.house === chosenHouse))
    //             .forEach(creature => exhaustCard(creature as Creature))
    //     }
    // }
}

cardScripts.scripts.set("persistence-hunting", cardScript)