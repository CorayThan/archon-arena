/* eslint-disable */
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const makeFiles = () => {
	const card_data = [...require('./341'), ...require('./435')];
	card_data.forEach(card => {
		const card_name = _.upperFirst(_.camelCase(card.card_title));
		const setPath = path.join(__dirname, `/${card.expansion === 341 ? 'cota' : 'aoa'}/`);

		if (!fs.existsSync(setPath)) fs.mkdirSync(setPath);

		const dir = setPath + card.house.toLowerCase();

		if (!fs.existsSync(dir)) fs.mkdirSync(dir);

		const destination = `${dir}/${card_name}.ts`;

		if (!fs.existsSync(path.join(__dirname, `/cota/${card.house.toLowerCase()}/${card_name}.ts`) || card.expansion === 341)) {
			fs.writeFile(destination, template(card), () => console.log(`${destination} has been written`));
		} else console.log(`${destination} Skipped!`);

	});
};

const template = (card) => {
	return `import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState  } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
	// ${card.card_text.replace('\r', ' ').replace('\r', ' ').replace('\r', ' ')}
${card.amber > 0 ? `\tamber: () =>  ${card.amber},\n` : ''}\
${card.power > 0 ? `\tpower: () =>  ${card.power},\n` : ''}\
${card.armor > 0 ? `\tarmor: () =>  ${card.armor},\n` : ''}\
${card.card_text.includes('Elusive') ? `\telusive: () =>  true,\n` : ''}\
${card.card_text.includes('Skirmish') ? `\tskirmish: () =>  true,\n` : ''}\
${card.card_text.includes('Poison') ? `\tpoison: () =>  true,\n` : ''}\
${card.card_text.includes('Hazardous') ? `\thazardous: () =>  0,\n` : ''}\
${card.card_text.includes('Alpha') ? `\talpha: () =>  true,\n` : ''}\
${card.card_text.includes('Omega') ? `\tomega: () =>  true,\n` : ''}\
${card.card_text.includes('Deploy') ? `\tdeploy: () =>  true,\n` : ''}\
${card.card_text.includes('Taunt') ? `\ttaunt: () =>  true,\n` : ''}\
${card.card_text.includes('Play') ? `\tonPlay: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add onPlay code here\n}\t},\n` : ''}\
${card.card_text.includes('Reap') ? `\treap: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add reap code here\n}\t},\n` : ''}\
${card.card_text.includes('Fight') ? `\tfight: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add fight code here\n}\t},\n` : ''}\
${card.card_text.includes('Before Fight') ? `\tbeforeFight: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add beforeFight code here\n}\t},\n` : ''}\
${card.card_text.includes('Destroyed') ? `\tdestroyed: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add destroyed code here\n}\t},\n` : ''}\
${card.card_text.includes('Action') ? `\taction: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add action code here\n}\t},\n` : ''}\
${card.card_text.includes('Omni') ? `\tomni: {\n\t\tperform: (state: GameState, config: CardActionConfig) => {
        //Add omni code here\n}\t},\n` : ''}\
}
cardScripts.scripts.set("${_.kebabCase(card.card_title)}", cardScript)`;
};

makeFiles();


