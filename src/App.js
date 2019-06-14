import React from 'react';
import Game from './components/Game'
import './main.css'
import {Popover, OverlayTrigger, Button} from 'react-bootstrap'


//Help popover property
const popover = (
  <Popover id="popover-basic">
    Flip a card to find its match, when all the cards are matched.
    You Win.
  </Popover>
);

const Help = () => (
  <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    <Button id='buttonHelp' variant="success">How to play:</Button>
  </OverlayTrigger>
);


class App extends React.Component {

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Memory Game</h1>
          <div className='help'>
          <Help />
          </div>
        <Game />
      </div>
    );
  }
}

export default App;
