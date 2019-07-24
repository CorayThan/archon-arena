import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank, playTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  onPlay: {
    perform: (state, config) => {
      playTopCardOfDeck(state) // TODO: Finish this function in ScriptUtils
    }
  }
}

cardScripts.scripts.set("wild-wormhole", cardScript)
