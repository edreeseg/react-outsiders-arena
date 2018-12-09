import React from 'react';
import PropTypes from 'prop-types';
import './DisplayBar.css';

class DisplayBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameInput: '',
      avatarInput: '',
      opponentInput: '',
      authed: this.props.auth,
    };
  }
  handleChangeFor = (type) => (e) => {
    const key = type + 'Input';
    this.setState({
        [key]: e.target.value,
      });
  }
  sendConnectRequest = () => {
    const URL = {
      roren: 'localhost:8171',
      goon: 'localhost:8817',
      stage: '66.242.90.163:8171',
    };
    fetch(`http://${URL.roren}/api/player/`, {
      method: 'POST',
      body: JSON.stringify({ 
        displayName: this.state.nameInput || 'NPC', 
        avatarUrl: this.state.avatarInput || 'https://i.imgur.com/sdOs51i.jpg'
      })
    }).then(res => this.setState((prevState) => {
      return {
        nameInput: '',
        avatarInput: '',
        playerID: res.id,
        playerName: prevState.nameInput,
        avatar: prevState.avatarInput,
        authed: true,
      }
    }))
      .catch(err => { throw new Error(err) });
  }
  render(){
    return (  
      <section className="display-bar">
        <div className="session-info">
          <h3>Arena ID:</h3>
          <p>{this.state.arenaID || 'Unknown'}</p>
          <h3>Player ID:</h3>
          <p>{this.state.playerID || 'Unknown'}</p>
        </div>
        {this.state.authed ? (
          <div className="player-info">
            <img src={this.state.avatar} alt="User avatar" />
            <h2>{this.state.playerName}</h2>
          </div>
        ) : (
          <form className="create-player">
            <input type="text" placeholder="Display Name" value={this.state.nameInput} onChange={this.handleChangeFor('name')} />
            <input type="text" placeholder="Avatar URL" value={this.state.avatarInput} onChange={this.handleChangeFor('avatar')} />
            <button type="button" onClick={this.sendConnectRequest}>Submit</button>
          </form>
        )}
        <form className="find-battle">
          <input type="text" placeholder="Opponent's Name" value={this.state.opponentInput} onChange={this.handleChangeFor('opponent')} />
          <button type="submit">Find Battle</button>
        </form>
      </section>
    );
  }
}

DisplayBar.propTypes = {
  auth: PropTypes.bool,
};

export default DisplayBar;