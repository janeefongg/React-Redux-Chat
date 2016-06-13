import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io();

export default class ChatUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {newName : ''};
    this.setUsername = this.setUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
  }


  setUsername (event) {
    // event.preventDefault();
    // this.setState({inputUsername: ''});
    console.log(event.target.value);
    this.setState({newName: event.target.value});
    console.log(this.state);
  }

  submitUsername (event) {
    event.preventDefault();
    var newName = this.state.newName;
    this.props.handleChangeName(newName);
    this.setState({newName: ''});
    // socket.emit('change:username', {newUsername: this.state.inputUsername});
    console.log('changed username?');
  }


  render() {
    return (
      <div>
        <h2>You are connected as: {this.props.username}!</h2>
        <p>To set a new username: </p>
        <form>
          <input onChange={this.setUsername} type="text" placeholder="Username"/>
          <input onClick={this.submitUsername} type="submit"/>
        </form>
      </div>
    )
  }
}
