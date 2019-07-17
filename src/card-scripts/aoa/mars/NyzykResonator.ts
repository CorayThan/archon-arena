import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	armor: () =>  1,
//TODO For each neighbor Nyzyk Resonator has, your opponent’s keys cost +2A.

}

cardScripts.scripts.set("nyzyk-resonator", cardScript)