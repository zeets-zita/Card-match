import React  from 'react'




export class Restart extends React.Component {
constructor(props) {
  super(props);
  this.state = { 
    laps: [],
    lastClearedIncrementer: null
  };
  this.incrementer = null;

     this.handleStartClick()

  if(props.restarted){
      this.handleResetClick()
  }
}
  
handleStartClick() {
   
  this.incrementer = setInterval( () =>

   1000);
}

handleStopClick() {
  clearInterval(this.incrementer);
  this.setState({
    lastClearedIncrementer: this.incrementer
  });
}

handleResetClick() {
  clearInterval(this.incrementer);
  this.setState({
    laps: []
  });
}

handleLabClick() {
  this.setState({
    laps: this.state.laps.concat()
  })
}

render() {
  return (
    <div className="Restart"></div>
  );
}
}
export default Restart