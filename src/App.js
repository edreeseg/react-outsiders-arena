import React, { Component } from 'react';
import './App.css';
import DisplayBar from './components/DisplayBar/DisplayBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authed: false,
    };
  }
  render() {
    return (
      <div className='app'>
        <DisplayBar auth={this.state.authed} />
      </div>
    );
  }
}

export default App;
