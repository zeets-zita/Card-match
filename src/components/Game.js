import React from 'react'
import GameBoard from './GameBoard'
import Restart from './Restart'


let cardArray = 'cat, pagoda, fan, flower, gate, geisha, geta, sushi';
const arrCopy = cardArray.slice();

cardArray = arrCopy.toLowerCase().split(', ')

export class Game extends React.Component{
    constructor(props) {
		super(props);
		this.restart = this.restart.bind(this);
		this.resetTime = null;
		this.checkMatch = this.checkMatch.bind(this);
        this.state = this.initialState();
        
        this.cardAmount=this.cardAmount.bind(this)
    }

    initialState() {
        let cardLength=6;
		return {
            amount:cardLength,
			deck: this.shuffleDeck(cardLength),
			pairs: [],
            moves: 0,
			selected: [],
            endMsg:  '',
           
		};
    }

    clickHandler(cardId) {
        
        if(this.state.moves>1){
            this.refs.timer.handleStartClick()
        }

		if(this.state.selected.includes(cardId) || this.resetTime) {
			return;
		}
      
		if(this.state.selected.length >= 1) {
			this.resetTime = setTimeout(() => {
				this.checkMatch();
			}, 1000);
		}

		this.state.selected.push(cardId)


		this.setState({
			selected: this.state.selected
		})
    }

cardAmount(n){
    this.restart();

    this.setState({
        deck:this.shuffleDeck(n),
        amount:n
    })

   
}
checkMatch() {
    let moves = this.state.moves;
    let pairs = this.state.pairs;

    const matchSelected = this.state.selected.map((id) => {
        return this.state.deck[id];
    });

    if(matchSelected[0] === matchSelected[1]) {
        pairs = pairs.concat(this.state.selected);
    }

    this.setState({
        selected: [],
        moves,
        pairs
    });

    this.resetTime = null;
   
    if(this.state.pairs.length === this.state.amount*2) {
        this.setState({
            endMsg: 'You win'
        });
    }
}
    render () {

        const gameboard = <GameBoard 
                                     deck={this.state.deck} 
                                     clickHandler={this.clickHandler.bind(this)} 
                                     selected={this.state.selected}
                                     pairs={this.state.pairs} />
          return (
                <div className='container'>
                    <div className='endMsg'>{ this.state.endMsg }</div>

                        <a id='Rbutton' onClick={this.restart}
                           >Restart</a>
                           <Restart ref={instance => { this.child = instance; }}/>
                    <div className='score'>
                        <span>Score: {this.state.pairs.length / 2}</span>
                    </div>

                    {gameboard}
                </div>
            );
      }
   
    pickCards(n){
       
        const deck = [];
		let cardCopy = cardArray.slice();
        let i = 0;
        while (i < n) {
		    let j = 0;
			const randomNumber = this.randomNumber(cardCopy);
            const newCard = cardCopy.splice(randomNumber, 1)[0];

		    while (j < 2) {
                deck.push(newCard);
				j++;
            }
		i++;
        }
		return deck;
    }


    shuffleDeck(n) {
     
        let deck = this.pickCards(n);
    
        for(let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tempVal = deck[i];
          deck[i] = deck[j];
          deck[j] = tempVal;
        }
        return deck;
      }
      randomNumber(arr) {
		const ourArray = arr;
		const min = 0;
		const max = ourArray.length - 1;  
		return Math.floor(Math.random() * (max - min + 1)) + min;
    }

//restart button 

    restart() {
        this.child.handleResetClick();
        this.child.handleStartClick();
		this.setState(this.initialState());
	}
}
export default Game