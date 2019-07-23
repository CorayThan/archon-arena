import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
// import {destroyCard, enemyPlayer, inactivePlayerState} from "../../ScriptUtils"
// import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
//TODO OMG HOW!?!?!?
//     onPlay: {
//         validTargets: (state) => inactivePlayerState(state).discard.filter(x => x.backingCard.cardType === "Action"),
//         numberOfTargets: () => 1,
//         perform: (state, config) => {
//             config.thisCard = config.targets[o].backingCard
//         }
//     }
}
cardScripts.scripts.set("mimicry", cardScript)