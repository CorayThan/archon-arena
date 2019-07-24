import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank, playTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  power: () => 2,
  onPlay: {
    perform: (state, config) => {
      let player = activePlayerState(state) as PlayerState
      let target = config!.targets![0] as CardInGame

      // Target should be the top card of the deck OR the top card of the discard pile
      putInArchives(state, target, true)
    }
  }
}

cardScripts.scripts.set("zyx-researcher", cardScript)
