import React from 'react';
import Phaser from 'phaser';
import GameScene from './GameScene';
import './Game.css';

interface Props {
  state: object,
}

const config: Phaser.Types.Core.GameConfig = {
  parent: 'phaser',
  backgroundColor: '#eee',
  scene: [GameScene],
  width: window.innerWidth,
  height: window.innerHeight,
  input: {
    mouse: true,
  },
};

class Game extends React.Component<Props> {
  render() {
    return (
      <div id='phaser' className='Game-container'>
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { state } = this.props;
    console.log(state);
    const game = new Phaser.Game(config);
    game.events.once('ready', () => {
      const scene = game.scene.getScene('GameScene');
      scene.data.set('state', state);
    });
  }
}

export default Game;
