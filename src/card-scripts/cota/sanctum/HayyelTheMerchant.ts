import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Each time you play an artifact, gain 1<A>.
    power: () => 3,
    //TODO trigger play artifact

    // onPlayArtifact: {
    //     perform: (state: GameState) => {
    //         modifyAmber(activePlayerState(state), 1)
    //     }
    // }
}

cardScripts.scripts.set("hayyel-the-merchant", cardScript)