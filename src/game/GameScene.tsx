import Phaser from 'phaser';
import Card from './Card';

import cardback from '../images/cardback.jpg'; // TODO load via HTTP request
import kelifiDragon from '../images/kelifi-dragon.jpg'; // TODO
import jargogle from '../images/jargogle.png';
import safePlace from '../images/safe-place.png';
import mantleOfTheZealot from '../images/mantle-of-the-zealot.png';
import key from '../images/forgedkey.png';
import stun from '../images/stun.png';
import aember from '../images/aember.png';
import armor from '../images/armor.png';
import damage from '../images/damage.png';
import power from '../images/power.png';

class GameScene extends Phaser.Scene {
  // @ts-ignore
  root: Phaser.GameObjects.Container;
  // @ts-ignore
  cardHoverImage: Phaser.GameObjects.Image;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('cardback', cardback);
    this.load.image('kelifi-dragon', kelifiDragon);
    this.load.image('jargogle', jargogle);
    this.load.image('safe-place', safePlace);
    this.load.image('mantle-of-the-zealot', mantleOfTheZealot);
    this.load.image('key-token', key);
    this.load.image('damage-token', damage);
    this.load.image('aember-token', aember);
    this.load.image('stun-token', stun);
    this.load.image('armor-token', armor);
    this.load.image('power-token', power);
  }

  create() {
    this.root = this.add.container(0, 0);
    this.render();

    this.input.mouse.disableContextMenu();
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on('up', () => {
      const state = this.data.get('state');
      state.players[0].creatures.forEach((c: { ready: boolean }) => c.ready = true);
      this.render();
    });
  }

  render() {
    const state = this.data.get('state');
    this.root.removeAll();

    const aemberImage = new Phaser.GameObjects.Image(this, 50, 1000, 'aember-token');
    aemberImage.setDisplaySize(40, 40);
    const aemberText = new Phaser.GameObjects.Text(this, 50, 1000, state.players[0].aember, {
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
      fontSize: '26px'
    });
    aemberText.setOrigin(0.5);
    this.root.add(aemberImage);
    this.root.add(aemberText);

    const keyImage = new Phaser.GameObjects.Image(this, 50, 950, 'key-token');
    keyImage.setDisplaySize(40, 40);
    const keysText = new Phaser.GameObjects.Text(this, 50, 950, `${state.players[0].keys}`, {
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
      fontSize: '26px'
    });
    keysText.setOrigin(0.5);
    this.root.add(keyImage);
    this.root.add(keysText);

    for (let i = 0; i < state.players[0].creatures.length; i++) {
      const creature = state.players[0].creatures[i];
      const card = new Card({
        scene: this,
        x: 100 + 140 * creature.position,
        y: 675,
        id: 'p0-creature-' + creature.position,
        front: creature.id,
        back: 'cardback',
        faceup: creature.faceup,
        ready: creature.ready,
        cardsUnderneath: creature.cardsUnderneath,
        upgrades: creature.upgrades,
        onClick: this.onClickCreature.bind(this),
        onMouseOver: this.onMouseOverCard.bind(this),
        onMouseOut: this.onMouseOutCard.bind(this),
      });
      Object.keys(creature.tokens)
        .forEach(token => {
          const tokenAmount = creature.tokens[token];
          card.addToken({
            type: token,
            amount: tokenAmount,
          });
        });
      this.root.add(card);
    }

    for (let i = 0; i < state.players[0].hand.length; i++) {
      const hand = state.players[0].hand[i];
      const card = new Card({
        scene: this,
        x: 160 + 90 * i,
        y: 950,
        id: 'p0-hand-' + i,
        front: hand.id,
        back: 'cardback',
        onClick: (e:any) => { console.log(e) },
        onMouseOver: this.onMouseOverCard.bind(this),
        onMouseOut: this.onMouseOutCard.bind(this),
      });
      this.root.add(card);
    }
  }

  onMouseOverCard(texture: string) {
    const width = 260;
    const height = width / .716612378
    const image = new Phaser.GameObjects.Image(this, width / 2 + 20, height / 2 + 20, texture);
    image.setDisplaySize(width, height);
    this.root.add(image);
    this.cardHoverImage = image;
  }

  onMouseOutCard(texture: string) {
    this.cardHoverImage.destroy();
  }

  onClickCreature(card: Card, e: any) {
    const state = this.data.get('state');
    const creature = state.players[0].creatures.find((c: { position: number }) => 'p0-creature-' + c.position === card.data.get('id'));
  
    if (e.event.which === 3 && e.event.shiftKey) {
      creature.tokens.damage -= 1;
      this.render();
      return;
    }

    if (e.event.which === 3) {
      creature.tokens.damage += 1;
      this.render();
      return;
    }

    if (!creature.ready) {
      return;
    }

    if (creature.tokens.stun) {
      creature.tokens.stun = 0;
      creature.ready = false;
      this.render();
      return;
    } else {
      state.players[0].aember += 1;
      creature.ready = false;
      this.render();
      return;
    }
  }
}

export default GameScene;
