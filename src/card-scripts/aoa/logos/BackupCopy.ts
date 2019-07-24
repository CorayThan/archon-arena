import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank, playTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  amber: () => 1,
  destroyed: {
    perform: (state, config) => {
      let player = activePlayerState(state) as PlayerState
      player.library.unshift(config!.thisCard)
    }
  }
}

cardScripts.scripts.set("backup-copy", cardScript)
