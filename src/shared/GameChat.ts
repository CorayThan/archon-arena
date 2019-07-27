import { PlayerMessage } from "./PlayerMessage"

export interface GameChat {
    [playerId: string]: PlayerMessage[]
}
