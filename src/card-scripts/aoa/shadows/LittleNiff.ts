import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Omega. Deploy. Elusive. After a neighbor of Little Niff is used to fight, steal 1A.
    power: () => 2,
    elusive: () => true,
    omega: () => true,
    deploy: () => true,
    //TODO
}
cardScripts.scripts.set("little-niff", cardScript)