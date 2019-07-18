import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Omega. (After you play this card,
    // end this step.)
    Play: Return a card from your discard pile to your hand.
    amber
:
() => 1,
    omega
:
() => true,
    onPlay
:
{
    (state, config) => {
        //Add onPlay code here
    }
}
,

}

cardScripts.scripts.set("gravid-cycle", cardScript)